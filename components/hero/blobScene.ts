/**
 * "The Idea" — a living, topographic WebGL form.
 * Plain three.js (no R3F) to keep the hero bundle small; loaded via dynamic
 * import only on capable devices. Exposes a tiny imperative API.
 */
import * as THREE from "three";

const noise = /* glsl */ `
// Ashima 3D simplex noise (MIT)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertex = /* glsl */ `
uniform float uTime;
uniform vec3 uPointer;   // pointer projected onto the blob, in object space
uniform float uPointerAmt;
uniform float uHeat;     // scroll-driven agitation 0..1
varying vec3 vNormal;
varying vec3 vPos;
varying float vNoise;
varying vec3 vView;
${noise}
float field(vec3 p){
  float t=uTime*0.18;
  float n=snoise(p*1.05+vec3(t,t*0.7,-t))*0.38;
  n+=snoise(p*2.4-vec3(t*1.3))*0.12*(1.0+uHeat*1.5);
  float d=distance(p,uPointer);
  n+=smoothstep(0.95,0.0,d)*0.32*uPointerAmt;   // cursor pulls the surface out
  return n;
}
void main(){
  vec3 p=position;
  float n=field(normalize(p));
  vec3 displaced=p+normal*n;
  // finite-difference normal
  vec3 tangent=normalize(cross(normal,vec3(0.0,1.0,0.001)));
  vec3 bitangent=normalize(cross(normal,tangent));
  float e=0.012;float R=length(p);
  vec3 ua=normalize(p+tangent*e*R);vec3 ub=normalize(p+bitangent*e*R);
  vec3 da=ua*R+ua*field(ua);vec3 db=ub*R+ub*field(ub);
  vec3 nn=normalize(cross(da-displaced,db-displaced));
  vNormal=normalize(normalMatrix*nn);
  vNoise=n;
  vPos=displaced;
  vec4 mv=modelViewMatrix*vec4(displaced,1.0);
  vView=normalize(-mv.xyz);
  gl_Position=projectionMatrix*mv;
}`;

const fragment = /* glsl */ `
uniform float uTime;
uniform vec3 uGreen;
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uLight;
uniform float uHeat;
varying vec3 vNormal;
varying vec3 vPos;
varying float vNoise;
varying vec3 vView;
void main(){
  vec3 n=normalize(vNormal);
  vec3 l=normalize(uLight);
  float diff=clamp(dot(n,l),0.0,1.0);
  float fres=pow(1.0-clamp(dot(n,vView),0.0,1.0),2.6);
  vec3 h=normalize(l+vView);
  float spec=pow(clamp(dot(n,h),0.0,1.0),48.0);

  // topographic contour lines — the "latent space" skin
  float height=vNoise*7.0+vPos.y*1.4+uTime*0.05;
  float band=abs(fract(height)-0.5);
  float line=1.0-smoothstep(0.0,0.045+0.02*uHeat,band);

  vec3 base=mix(uDeep,uMid,smoothstep(0.0,1.0,diff*0.9+vNoise*0.45));
  vec3 col=base;
  col+=uGreen*line*(0.25+0.75*diff);
  col+=uGreen*fres*0.85;
  col+=vec3(0.9,1.0,0.92)*spec*0.55;
  gl_FragColor=vec4(col,1.0);
}`;

export type BlobApi = {
  setPointer: (x: number, y: number) => void; // NDC -1..1
  setHeat: (v: number) => void;
  setActive: (on: boolean) => void;
  resize: () => void;
  dispose: () => void;
};

export function createBlobScene(canvas: HTMLCanvasElement, opts: { mobile: boolean }): BlobApi {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !opts.mobile, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.mobile ? 1.5 : 1.75));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  const geo = new THREE.IcosahedronGeometry(1.12, opts.mobile ? 48 : 96);
  const uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector3(0, 0, 2) },
    uPointerAmt: { value: 0 },
    uHeat: { value: 0 },
    uGreen: { value: new THREE.Color("#39c463") },
    uDeep: { value: new THREE.Color("#020603") },
    uMid: { value: new THREE.Color("#0f3d1d") },
    uLight: { value: new THREE.Vector3(-0.6, 0.9, 0.8) },
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // sparse orbiting "tokens"
  const count = opts.mobile ? 180 : 420;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 1.9 + Math.random() * 1.6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.cos(ph) * 0.6;
    pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x39c463, size: 0.025, transparent: true, opacity: 0.75, sizeAttenuation: true, depthWrite: false });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  const target = new THREE.Vector2(0, 0);
  const smooth = new THREE.Vector2(0, 0);
  const ray = new THREE.Raycaster();
  const sphere = new THREE.Sphere(new THREE.Vector3(), 1.3);
  const hit = new THREE.Vector3();
  let pointerAmtTarget = 0;
  let heat = 0;
  let active = true;
  let raf = 0;
  let last = performance.now();

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the form a consistent visual size across aspect ratios
    camera.position.z = w / h < 0.8 ? 8.4 : 6.2;
    // desktop: sit right of centre so the headline reads over open space
    const shift = w / h > 1.25 ? 0.95 : 0;
    mesh.position.x = shift;
    points.position.x = shift;
    sphere.center.set(shift, 0, 0);
    camera.updateProjectionMatrix();
  };
  resize();

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!active) return;
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    uniforms.uTime.value += dt;
    smooth.lerp(target, 0.06);
    mesh.rotation.y += dt * 0.12 + smooth.x * 0.01;
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, -smooth.y * 0.5, 0.05);
    points.rotation.y -= dt * 0.04;
    points.rotation.z = smooth.x * 0.12;

    ray.setFromCamera(smooth, camera);
    if (ray.ray.intersectSphere(sphere, hit)) {
      mesh.worldToLocal(hit.copy(hit));
      uniforms.uPointer.value.copy(hit.normalize());
      pointerAmtTarget = 1;
    } else pointerAmtTarget = 0;
    uniforms.uPointerAmt.value += (pointerAmtTarget - uniforms.uPointerAmt.value) * 0.06;
    uniforms.uHeat.value += (heat - uniforms.uHeat.value) * 0.08;
    const s = 1 + uniforms.uHeat.value * 0.35;
    mesh.scale.setScalar(s);
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(tick);

  return {
    setPointer: (x, y) => target.set(x, y),
    setHeat: (v) => (heat = v),
    setActive: (on) => {
      active = on;
      if (on) last = performance.now();
    },
    resize,
    dispose: () => {
      cancelAnimationFrame(raf);
      geo.dispose();
      mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    },
  };
}
