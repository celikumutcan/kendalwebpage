(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,69835,e=>{"use strict";var r=e.i(43476),o=e.i(71645),l=e.i(75056),i=e.i(94800),a=e.i(90072),s=e.i(76122),t=e.i(13073);let u={uniforms:{uTime:{value:0},uScroll:{value:0},uColor:{value:new a.Color("#d8e4ff")}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      // Center coordinates
      vec2 uv = vUv - 0.5;
      float dist = length(uv);

      // Pulse effect based on time
      float pulse = sin(uTime * 2.0) * 0.05 + 0.95;
      
      // The radius of the light core expands based on scroll (aperture effect)
      // Base radius is small, grows huge on scroll
      float baseRadius = 0.02 * pulse;
      float radius = mix(baseRadius, 1.5, uScroll);
      
      // Glow calculation
      float glow = exp(-dist * (mix(40.0, 2.0, uScroll))) * 1.5;
      
      // Sharp core
      float core = smoothstep(radius, radius - 0.01, dist);

      vec3 finalColor = uColor * (core + glow);
      
      gl_FragColor = vec4(finalColor, min(core + glow, 1.0));
    }
  `},n=({scrollProgressRef:e})=>{let l=(0,o.useRef)(null),{getProgress:t}=(0,s.useLightTemperature)(),n=(0,o.useMemo)(()=>new a.Color("#d8e4ff"),[]),c=(0,o.useMemo)(()=>new a.Color("#ffb347"),[]),f=(0,o.useMemo)(()=>new a.Color,[]),m=(0,o.useRef)(0);(0,i.useFrame)((r,o)=>{if(l.current){m.current+=o;let r=e?.current??0;l.current.uniforms.uTime.value=m.current,l.current.uniforms.uScroll.value=a.MathUtils.lerp(l.current.uniforms.uScroll.value,r,.1),f.lerpColors(n,c,t()),l.current.uniforms.uColor.value.lerp(f,.1)}});let v=(0,o.useMemo)(()=>a.UniformsUtils.clone(u.uniforms),[]);return(0,r.jsxs)("mesh",{children:[(0,r.jsx)("planeGeometry",{args:[20,20]}),(0,r.jsx)("shaderMaterial",{ref:l,uniforms:v,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,transparent:!0,depthWrite:!1})]})};e.s(["LightCore",0,({scrollProgressRef:e})=>{let[o,i]=(0,t.useInView)();return(0,r.jsx)("div",{ref:o,className:"absolute inset-0 pointer-events-none z-0",children:(0,r.jsx)(l.Canvas,{camera:{position:[0,0,5],fov:75},gl:{alpha:!0,antialias:!0},frameloop:i?"always":"never",children:(0,r.jsx)(n,{scrollProgressRef:e})})})}])},81466,e=>{e.n(e.i(69835))}]);