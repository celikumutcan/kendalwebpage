"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useLightTemperature } from "@/lib/LightTemperatureProvider";
import { getAssetPath } from "@/lib/basePath";
import { useInView } from "@/lib/useInView";

const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const LOCATIONS = [
  { id: "turkey", lat: 39.9, lon: 32.8 },
  { id: "azerbaijan", lat: 40.4, lon: 49.9 },
  { id: "georgia", lat: 41.7, lon: 44.8 },
  { id: "moldova", lat: 47.0, lon: 28.8 },
  { id: "romania", lat: 44.4, lon: 26.1 },
  { id: "bulgaria", lat: 42.7, lon: 23.3 },
  { id: "albania", lat: 41.3, lon: 19.8 },
  { id: "malta", lat: 35.9, lon: 14.5 },
  { id: "iraq", lat: 33.3, lon: 44.4 },
  { id: "germany", lat: 51.1, lon: 10.4 },
  { id: "uk", lat: 53.4, lon: -2.9 },
  { id: "usa", lat: 37.0, lon: -95.7 },
  { id: "china", lat: 35.8, lon: 104.1 },
  { id: "russia", lat: 61.5, lon: 105.3 },
  { id: "brazil", lat: -14.2, lon: -51.9 },
  { id: "australia", lat: -25.2, lon: 133.7 },
  { id: "south-africa", lat: -30.5, lon: 22.9 },
  { id: "egypt", lat: 26.8, lon: 30.8 },
  { id: "japan", lat: 36.2, lon: 138.2 },
  { id: "france", lat: 46.2, lon: 2.2 },
  { id: "uae", lat: 23.4, lon: 53.8 },
  { id: "canada", lat: 56.1, lon: -106.3 },
  { id: "india", lat: 20.5, lon: 78.9 },
  { id: "italy", lat: 41.9, lon: 12.5 },
  { id: "spain", lat: 40.4, lon: -3.7 },
  { id: "greece", lat: 37.9, lon: 23.7 },
  { id: "saudi-arabia", lat: 23.8, lon: 45.0 },
  { id: "south-korea", lat: 35.9, lon: 127.7 },
  { id: "mexico", lat: 23.6, lon: -102.5 },
  { id: "argentina", lat: -38.4, lon: -63.6 },
  { id: "morocco", lat: 31.7, lon: -7.0 },
  { id: "nigeria", lat: 9.0, lon: 8.6 },
  { id: "kenya", lat: -1.2, lon: 36.8 },
  { id: "indonesia", lat: -0.7, lon: 113.9 },
  { id: "thailand", lat: 15.8, lon: 100.9 },
  { id: "vietnam", lat: 14.0, lon: 108.2 },
  { id: "philippines", lat: 12.8, lon: 121.7 },
  { id: "malaysia", lat: 4.2, lon: 109.9 },
  { id: "poland", lat: 51.9, lon: 19.1 },
  { id: "netherlands", lat: 52.1, lon: 5.2 },
  { id: "sweden", lat: 60.1, lon: 18.6 },
  { id: "kazakhstan", lat: 48.0, lon: 68.0 }
];

const ARCS = LOCATIONS.slice(1).map(loc => {
  const start = latLongToVector3(LOCATIONS[0].lat, LOCATIONS[0].lon, 2.05);
  const end = latLongToVector3(loc.lat, loc.lon, 2.05);
  const mid = start.clone().lerp(end, 0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(2.05 + dist * 0.3);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  return curve.getPoints(50);
});

// Three.js'in yerleşik LineDashedMaterial'ı animasyonlu dash-offset desteklemiyor
// (meshline/drei'nin sağladığı özellik); aynı "akan çizgi" görselini drei'siz
// elde etmek için küçük bir custom shader kullanılıyor.
const arcDashShader = {
  vertexShader: `
    attribute float lineDistance;
    varying float vLineDistance;
    void main() {
      vLineDistance = lineDistance;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uDashSize;
    uniform float uGapSize;
    uniform float uDashOffset;
    varying float vLineDistance;

    void main() {
      float period = uDashSize + uGapSize;
      float m = mod(vLineDistance - uDashOffset, period);
      if (m > uDashSize) discard;
      gl_FragColor = vec4(uColor, uOpacity);
    }
  `,
};

const AnimatedArcs = ({ arcs, color }: { arcs: THREE.Vector3[][], color: THREE.Color }) => {
  const arcLines = useMemo(
    () =>
      arcs.map((points) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uColor: { value: new THREE.Color() },
            uOpacity: { value: 0.8 },
            uDashSize: { value: 0.5 },
            uGapSize: { value: 0.5 },
            uDashOffset: { value: 0 },
          },
          vertexShader: arcDashShader.vertexShader,
          fragmentShader: arcDashShader.fragmentShader,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const line = new THREE.Line(geometry, material);
        line.computeLineDistances();
        return line;
      }),
    [arcs]
  );

  useFrame((state, delta) => {
    arcLines.forEach((line) => {
      const material = line.material as THREE.ShaderMaterial;
      material.uniforms.uDashOffset.value -= delta;
      material.uniforms.uColor.value.copy(color);
    });
  });

  return (
    <>
      {arcLines.map((line, idx) => (
        <primitive key={`arc-${idx}`} object={line} />
      ))}
    </>
  );
};

const GlobeScene = ({ scrollProgressRef }: { scrollProgressRef?: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const { getProgress } = useLightTemperature();

  const [earthTexture, bumpTexture, specularTexture] = useLoader(THREE.TextureLoader, [
    getAssetPath("/textures/earth-color.jpg"),
    getAssetPath("/textures/earth-topology.png"),
    getAssetPath("/textures/earth-water.png")
  ]);

  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [earthTexture]);

  const colorA = useMemo(() => new THREE.Color("#9cb4d8"), []);
  const colorB = useMemo(() => new THREE.Color("#e8b07d"), []);
  const targetColor = useMemo(() => new THREE.Color("#9cb4d8"), []);

  const pinRefs = useRef<THREE.Mesh[]>([]);
  const glowPinRefs = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    const p = getProgress();
    targetColor.lerpColors(colorA, colorB, p * 0.8 + 0.1);

    const currentProgress = scrollProgressRef?.current ?? 1;
    const targetZ = THREE.MathUtils.lerp(0.1, 5.5, currentProgress);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);

    if (groupRef.current) {
      timeRef.current += delta;
      const baseRotationY = -2.1;
      groupRef.current.rotation.y = baseRotationY + Math.sin(timeRef.current * 0.4) * 0.3;
    }

    if (glowRef.current) {
      glowRef.current.color.copy(targetColor);
    }

    pinRefs.current.forEach((mesh, i) => {
      if (mesh?.material && i !== 0) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.copy(targetColor);
      }
    });

    glowPinRefs.current.forEach((mesh, i) => {
      if (mesh?.material && i !== 0) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.copy(targetColor);
        mat.opacity = 0.3;
      }
    });
  });

  return (
    <group ref={groupRef} rotation={[0.4, -2.1, 0]}>
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.02}
          roughnessMap={specularTexture}
          roughness={0.6}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.12, 48, 48]} />
        <meshBasicMaterial
          ref={glowRef}
          color={targetColor}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      <AnimatedArcs arcs={ARCS} color={targetColor} />

      {LOCATIONS.map((loc, idx) => {
        const pos = latLongToVector3(loc.lat, loc.lon, 2.06);
        const isHQ = idx === 0;
        const pinColor = isHQ ? new THREE.Color("#E3000F") : targetColor;

        return (
          <group key={`pin-${idx}`} position={pos}>
            <mesh ref={el => { if (el) pinRefs.current[idx] = el; }}>
              <sphereGeometry args={[isHQ ? 0.08 : 0.04, 12, 12]} />
              <meshBasicMaterial color={pinColor} />
            </mesh>
            <mesh ref={el => { if (el) glowPinRefs.current[idx] = el; }}>
              <sphereGeometry args={[isHQ ? 0.3 : 0.15, 12, 12]} />
              <meshBasicMaterial
                color={pinColor}
                transparent
                opacity={isHQ ? 0.8 : 0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Pauses the WebGL render loop entirely when scrolled off-screen.
export const Globe = ({ scrollProgressRef }: { scrollProgressRef?: React.MutableRefObject<number> }) => {
  const [containerRef, isInView] = useInView<HTMLDivElement>();

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 45 }}
        performance={{ min: 0.5 }}
        dpr={[1, 1.5]}
        frameloop={isInView ? "always" : "never"}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={1.0} color="#b0c4de" />

        <Suspense fallback={null}>
          <GlobeScene scrollProgressRef={scrollProgressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};