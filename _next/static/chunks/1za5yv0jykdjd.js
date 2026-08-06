(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,39770,e=>{"use strict";let t,i;var n=e.i(43476),r=e.i(71645),a=e.i(75056),o=e.i(94800),s=e.i(90072),l=e.i(70950),l=l,d=l;let c=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function f(e,t){let i=(0,l.C)(e=>e.gl),n=(0,d.G)(s.TextureLoader,c(e)?Object.values(e):e);return(0,r.useLayoutEffect)(()=>{null==t||t(n)},[t]),(0,r.useEffect)(()=>{if("initTexture"in i){let e=[];Array.isArray(n)?e=n:n instanceof s.Texture?e=[n]:c(n)&&(e=Object.values(n)),e.forEach(e=>{e instanceof s.Texture&&i.initTexture(e)})}},[i,n]),(0,r.useMemo)(()=>{if(!c(e))return n;{let t={},i=0;for(let r in e)t[r]=n[i++];return t}},[e,n])}function u(){return(u=Object.assign.bind()).apply(null,arguments)}f.preload=e=>d.G.preload(s.TextureLoader,e),f.clear=e=>d.G.clear(s.TextureLoader,e);var l=l,p=s,h=s;let m=new h.Box3,v=new h.Vector3;class y extends h.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new h.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new h.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new h.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new h.InterleavedBufferAttribute(i,3,0)),this.setAttribute("instanceEnd",new h.InterleavedBufferAttribute(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new h.InstancedInterleavedBuffer(i,2*t,1);return this.setAttribute("instanceColorStart",new h.InterleavedBufferAttribute(n,t,0)),this.setAttribute("instanceColorEnd",new h.InterleavedBufferAttribute(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new h.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new h.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),m.setFromBufferAttribute(t),this.boundingBox.union(m))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new h.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)v.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(v)),v.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(v));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var g=s,x=e.i(8560);let S=parseInt(s.REVISION.replace(/\D+/g,""));class b extends g.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:g.UniformsUtils.clone(g.UniformsUtils.merge([x.UniformsLib.common,x.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new g.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${S>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let w=S>=125?"uv1":"uv2",E=new p.Vector4,A=new p.Vector3,_=new p.Vector3,L=new p.Vector4,U=new p.Vector4,M=new p.Vector4,z=new p.Vector3,B=new p.Matrix4,C=new p.Line3,O=new p.Vector3,j=new p.Box3,T=new p.Sphere,D=new p.Vector4;function P(e,t,n){return D.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),D.multiplyScalar(1/D.w),D.x=i/n.width,D.y=i/n.height,D.applyMatrix4(e.projectionMatrixInverse),D.multiplyScalar(1/D.w),Math.abs(Math.max(D.x,D.y))}class I extends p.Mesh{constructor(e=new y,t=new b({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,a=t.count;e<a;e++,r+=2)A.fromBufferAttribute(t,e),_.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+A.distanceTo(_);let r=new p.InstancedInterleavedBuffer(n,2,1);return e.setAttribute("instanceDistanceStart",new p.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new p.InterleavedBufferAttribute(r,1,1)),this}raycast(e,n){let r,a,o=this.material.worldUnits,s=e.camera;null!==s||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,c=this.geometry,f=this.material;if(i=f.linewidth+l,null===c.boundingSphere&&c.computeBoundingSphere(),T.copy(c.boundingSphere).applyMatrix4(d),o)r=.5*i;else{let e=Math.max(s.near,T.distanceToPoint(t.origin));r=P(s,e,f.resolution)}if(T.radius+=r,!1!==t.intersectsSphere(T)){if(null===c.boundingBox&&c.computeBoundingBox(),j.copy(c.boundingBox).applyMatrix4(d),o)a=.5*i;else{let e=Math.max(s.near,j.distanceToPoint(t.origin));a=P(s,e,f.resolution)}j.expandByScalar(a),!1!==t.intersectsBox(j)&&(o?function(e,n){let r=e.matrixWorld,a=e.geometry,o=a.attributes.instanceStart,s=a.attributes.instanceEnd,l=Math.min(a.instanceCount,o.count);for(let a=0;a<l;a++){C.start.fromBufferAttribute(o,a),C.end.fromBufferAttribute(s,a),C.applyMatrix4(r);let l=new p.Vector3,d=new p.Vector3;t.distanceSqToSegment(C.start,C.end,d,l),d.distanceTo(l)<.5*i&&n.push({point:d,pointOnLine:l,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:a,uv:null,[w]:null})}}(this,n):function(e,n,r){let a=n.projectionMatrix,o=e.material.resolution,s=e.matrixWorld,l=e.geometry,d=l.attributes.instanceStart,c=l.attributes.instanceEnd,f=Math.min(l.instanceCount,d.count),u=-n.near;t.at(1,M),M.w=1,M.applyMatrix4(n.matrixWorldInverse),M.applyMatrix4(a),M.multiplyScalar(1/M.w),M.x*=o.x/2,M.y*=o.y/2,M.z=0,z.copy(M),B.multiplyMatrices(n.matrixWorldInverse,s);for(let n=0;n<f;n++){if(L.fromBufferAttribute(d,n),U.fromBufferAttribute(c,n),L.w=1,U.w=1,L.applyMatrix4(B),U.applyMatrix4(B),L.z>u&&U.z>u)continue;if(L.z>u){let e=L.z-U.z,t=(L.z-u)/e;L.lerp(U,t)}else if(U.z>u){let e=U.z-L.z,t=(U.z-u)/e;U.lerp(L,t)}L.applyMatrix4(a),U.applyMatrix4(a),L.multiplyScalar(1/L.w),U.multiplyScalar(1/U.w),L.x*=o.x/2,L.y*=o.y/2,U.x*=o.x/2,U.y*=o.y/2,C.start.copy(L),C.start.z=0,C.end.copy(U),C.end.z=0;let l=C.closestPointToPointParameter(z,!0);C.at(l,O);let f=p.MathUtils.lerp(L.z,U.z,l),h=f>=-1&&f<=1,m=z.distanceTo(O)<.5*i;if(h&&m){C.start.fromBufferAttribute(d,n),C.end.fromBufferAttribute(c,n),C.start.applyMatrix4(s),C.end.applyMatrix4(s);let i=new p.Vector3,a=new p.Vector3;t.distanceSqToSegment(C.start,C.end,a,i),r.push({point:a,pointOnLine:i,distance:t.origin.distanceTo(a),object:e,face:null,faceIndex:n,uv:null,[w]:null})}}}(this,s,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(E),this.material.uniforms.resolution.value.set(E.z,E.w))}}class R extends y{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class V extends I{constructor(e=new R,t=new b({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let H=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:n,lineWidth:a,segments:o,dashed:d,...c},f){var p,h;let m=(0,l.C)(e=>e.size),v=r.useMemo(()=>o?new I:new V,[o]),[g]=r.useState(()=>new b),x=(null==i||null==(p=i[0])?void 0:p.length)===4?4:3,S=r.useMemo(()=>{let n=o?new y:new R,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Color?e.toArray():e);n.setColors(e.flat(),x)}return n},[e,o,i,x]);return r.useLayoutEffect(()=>{v.computeLineDistances()},[e,v]),r.useLayoutEffect(()=>{d?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[d,g]),r.useEffect(()=>()=>{S.dispose(),g.dispose()},[S]),r.createElement("primitive",u({object:v,ref:f},c),r.createElement("primitive",{object:S,attach:"geometry"}),r.createElement("primitive",u({object:g,attach:"material",color:t,vertexColors:!!i,resolution:[m.width,m.height],linewidth:null!=(h=null!=n?n:a)?h:1,dashed:d,transparent:4===x},c)))});var G=e.i(76122),N=e.i(57512),W=e.i(13073);let F=(e,t,i)=>{let n=Math.PI/180*(90-e),r=Math.PI/180*(t+180),a=-(i*Math.sin(n)*Math.cos(r)),o=i*Math.sin(n)*Math.sin(r),l=i*Math.cos(n);return new s.Vector3(a,l,o)},k=[{id:"turkey",lat:39.9,lon:32.8},{id:"azerbaijan",lat:40.4,lon:49.9},{id:"georgia",lat:41.7,lon:44.8},{id:"moldova",lat:47,lon:28.8},{id:"romania",lat:44.4,lon:26.1},{id:"bulgaria",lat:42.7,lon:23.3},{id:"albania",lat:41.3,lon:19.8},{id:"malta",lat:35.9,lon:14.5},{id:"iraq",lat:33.3,lon:44.4},{id:"germany",lat:51.1,lon:10.4},{id:"uk",lat:53.4,lon:-2.9},{id:"usa",lat:37,lon:-95.7},{id:"china",lat:35.8,lon:104.1},{id:"russia",lat:61.5,lon:105.3},{id:"brazil",lat:-14.2,lon:-51.9},{id:"australia",lat:-25.2,lon:133.7},{id:"south-africa",lat:-30.5,lon:22.9},{id:"egypt",lat:26.8,lon:30.8},{id:"japan",lat:36.2,lon:138.2},{id:"france",lat:46.2,lon:2.2},{id:"uae",lat:23.4,lon:53.8},{id:"canada",lat:56.1,lon:-106.3},{id:"india",lat:20.5,lon:78.9},{id:"italy",lat:41.9,lon:12.5},{id:"spain",lat:40.4,lon:-3.7},{id:"greece",lat:37.9,lon:23.7},{id:"saudi-arabia",lat:23.8,lon:45},{id:"south-korea",lat:35.9,lon:127.7},{id:"mexico",lat:23.6,lon:-102.5},{id:"argentina",lat:-38.4,lon:-63.6},{id:"morocco",lat:31.7,lon:-7},{id:"nigeria",lat:9,lon:8.6},{id:"kenya",lat:-1.2,lon:36.8},{id:"indonesia",lat:-.7,lon:113.9},{id:"thailand",lat:15.8,lon:100.9},{id:"vietnam",lat:14,lon:108.2},{id:"philippines",lat:12.8,lon:121.7},{id:"malaysia",lat:4.2,lon:109.9},{id:"poland",lat:51.9,lon:19.1},{id:"netherlands",lat:52.1,lon:5.2},{id:"sweden",lat:60.1,lon:18.6},{id:"kazakhstan",lat:48,lon:68}],q=k.slice(1).map(e=>{let t=F(k[0].lat,k[0].lon,2.05),i=F(e.lat,e.lon,2.05),n=t.clone().lerp(i,.5),r=t.distanceTo(i);return n.normalize().multiplyScalar(2.05+.3*r),new s.QuadraticBezierCurve3(t,n,i).getPoints(50)}),$=({arcs:e,color:t})=>{let i=(0,r.useRef)([]);return(0,o.useFrame)((e,n)=>{i.current.forEach(e=>{e?.material&&(e.material.dashOffset-=n,e.material.color&&e.material.color.copy(t))})}),(0,n.jsx)(n.Fragment,{children:e.map((e,r)=>(0,n.jsx)(H,{ref:e=>{e&&(i.current[r]=e)},points:e,color:t,lineWidth:2,transparent:!0,opacity:.8,dashed:!0,dashSize:.5,dashScale:2,dashOffset:0,blending:s.AdditiveBlending},`arc-${r}`))})},K=({scrollProgressRef:e})=>{let t=(0,r.useRef)(null),i=(0,r.useRef)(null),{getProgress:a}=(0,G.useLightTemperature)(),[l,d,c]=f([(0,N.getAssetPath)("/textures/earth-color.jpg"),(0,N.getAssetPath)("/textures/earth-topology.png"),(0,N.getAssetPath)("/textures/earth-water.png")]);(0,r.useMemo)(()=>{l&&(l.colorSpace=s.SRGBColorSpace)},[l]);let u=(0,r.useMemo)(()=>new s.Color("#9cb4d8"),[]),p=(0,r.useMemo)(()=>new s.Color("#e8b07d"),[]),h=(0,r.useMemo)(()=>new s.Color("#9cb4d8"),[]),m=(0,r.useRef)([]),v=(0,r.useRef)([]),y=(0,r.useRef)(0);return(0,o.useFrame)((n,r)=>{let o=a();h.lerpColors(u,p,.8*o+.1);let l=e?.current??1,d=s.MathUtils.lerp(.1,5.5,l);n.camera.position.z=s.MathUtils.lerp(n.camera.position.z,d,.1),t.current&&(y.current+=r,t.current.rotation.y=-2.1+.3*Math.sin(.4*y.current)),i.current&&i.current.color.copy(h),m.current.forEach((e,t)=>{e?.material&&0!==t&&e.material.color.copy(h)}),v.current.forEach((e,t)=>{if(e?.material&&0!==t){let t=e.material;t.color.copy(h),t.opacity=.3}})}),(0,n.jsxs)("group",{ref:t,rotation:[.4,-2.1,0],children:[(0,n.jsxs)("mesh",{children:[(0,n.jsx)("sphereGeometry",{args:[2,48,48]}),(0,n.jsx)("meshStandardMaterial",{map:l,bumpMap:d,bumpScale:.02,roughnessMap:c,roughness:.6,metalness:.15,side:s.DoubleSide})]}),(0,n.jsxs)("mesh",{children:[(0,n.jsx)("sphereGeometry",{args:[2.12,48,48]}),(0,n.jsx)("meshBasicMaterial",{ref:i,color:h,transparent:!0,opacity:.18,blending:s.AdditiveBlending,depthWrite:!1,side:s.BackSide})]}),(0,n.jsx)($,{arcs:q,color:h}),k.map((e,t)=>{let i=F(e.lat,e.lon,2.06),r=0===t,a=r?new s.Color("#E3000F"):h;return(0,n.jsxs)("group",{position:i,children:[(0,n.jsxs)("mesh",{ref:e=>{e&&(m.current[t]=e)},children:[(0,n.jsx)("sphereGeometry",{args:[r?.08:.04,12,12]}),(0,n.jsx)("meshBasicMaterial",{color:a})]}),(0,n.jsxs)("mesh",{ref:e=>{e&&(v.current[t]=e)},children:[(0,n.jsx)("sphereGeometry",{args:[r?.3:.15,12,12]}),(0,n.jsx)("meshBasicMaterial",{color:a,transparent:!0,opacity:r?.8:.3,blending:s.AdditiveBlending,depthWrite:!1})]})]},`pin-${t}`)})]})};e.s(["Globe",0,({scrollProgressRef:e})=>{let[t,i]=(0,W.useInView)();return(0,n.jsx)("div",{ref:t,className:"absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing",children:(0,n.jsxs)(a.Canvas,{camera:{position:[0,0,.1],fov:45},performance:{min:.5},dpr:[1,1.5],frameloop:i?"always":"never",children:[(0,n.jsx)("ambientLight",{intensity:.4}),(0,n.jsx)("directionalLight",{position:[5,3,5],intensity:3.5,color:"#ffffff"}),(0,n.jsx)("directionalLight",{position:[-5,-3,-5],intensity:1,color:"#b0c4de"}),(0,n.jsx)(r.Suspense,{fallback:null,children:(0,n.jsx)(K,{scrollProgressRef:e})})]})})}],39770)},30525,e=>{e.n(e.i(39770))}]);