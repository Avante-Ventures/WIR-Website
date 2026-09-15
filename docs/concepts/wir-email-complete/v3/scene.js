import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {clamp,ramp,poseAt,modulePosition,components} from './model.js';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const lerp=THREE.MathUtils.lerp;
export function createExperienceScene(host,{kind='journey',onSelect=()=>{},onReady=()=>{},onFailure=()=>{}}={}){
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});}catch(e){onFailure(e);return null}
renderer.setClearColor('#090e28',1);renderer.setPixelRatio(Math.min(devicePixelRatio,1.35));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#030615');scene.fog=new THREE.FogExp2('#090e28',.018);
const camera=new THREE.PerspectiveCamera(kind==='machine'?37:42,1,.1,120);camera.position.set(11,8,22);
const pmrem=new THREE.PMREMGenerator(renderer), room=new RoomEnvironment();const env=pmrem.fromScene(room,.03);scene.environment=env.texture;scene.environmentIntensity=.55;room.dispose();pmrem.dispose();
scene.add(new THREE.HemisphereLight('#b7c8ff','#100a28',.9));
const key=new THREE.DirectionalLight('#ddd8ff',2);key.position.set(-3,8,6);scene.add(key);
const rim=new THREE.DirectionalLight('#8e80ff',2.2);rim.position.set(5,3,-4);scene.add(rim);
const warm=new THREE.PointLight('#ffad66',5,25);warm.position.set(6,4,3);scene.add(warm);
const cool=new THREE.PointLight('#566eff',6,25);cool.position.set(-6,4,2);scene.add(cool);
const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));const bloom=new UnrealBloomPass(new THREE.Vector2(640,400),.42,.45,.9);composer.addPass(bloom);composer.addPass(new OutputPass());
const floor=new THREE.Mesh(new THREE.PlaneGeometry(180,180),new THREE.MeshStandardMaterial({color:'#091128',roughness:.7,metalness:.2}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.45;scene.add(floor);
const grid=new THREE.GridHelper(55,40,'#24344e','#1b2942');grid.position.y=-1.44;grid.material.transparent=true;grid.material.opacity=.3;scene.add(grid);
const metal=new THREE.MeshStandardMaterial({color:'#27345b',metalness:.82,roughness:.26});
const glass=(c='#a19cff',opacity=.27)=>new THREE.MeshPhysicalMaterial({color:c,metalness:.18,roughness:.17,transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide,clearcoat:1,envMapIntensity:.7});
const glow=(c,intensity=.8)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:intensity,roughness:.25,metalness:.5});
function box(parent,size,pos,mat,r=.055){const m=new THREE.Mesh(new RoundedBoxGeometry(...size,2,r),mat);m.position.set(...pos);parent.add(m);return m}
function pipe(parent,points,color='#b2a0ff',radius=.012,opacity=1){const curve=new THREE.CatmullRomCurve3(points.map(p=>Array.isArray(p)?V(...p):p));const mat=glow(color,1.7);mat.transparent=opacity<1;mat.opacity=opacity;const m=new THREE.Mesh(new THREE.TubeGeometry(curve,32,radius,5,false),mat);parent.add(m);return {curve,mesh:m}}
function label(text,width=1.2,color='#cbc7ff'){const c=document.createElement('canvas');c.width=512;c.height=96;const x=c.getContext('2d');x.clearRect(0,0,512,96);x.font='400 34px monospace';x.textAlign='center';x.fillStyle=color;x.fillText(text,256,58);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false}));s.scale.set(width,width*96/512,1);return s}
function outline(parent,w,h,z,color){return pipe(parent,[[-w/2,-h/2,z],[-w/2,h/2,z],[w/2,h/2,z],[w/2,-h/2,z],[-w/2,-h/2,z]],color,.009,.8)}
const emailFaceGeo=new RoundedBoxGeometry(1.25,.85,.075,2,.065), emailMat=glass('#7279bf',.24), emailLineMat=new THREE.LineBasicMaterial({color:'#b5b3ff',transparent:true,opacity:.85});
const emailLineGeo=new THREE.BufferGeometry().setFromPoints([V(-.53,.29,.053),V(0,-.03,.068),V(.53,.29,.053),V(.53,-.29,.053),V(-.53,-.29,.053),V(-.53,.29,.053)]);
function email(highlight=false){const g=new THREE.Group();g.add(new THREE.Mesh(emailFaceGeo,highlight?glass('#b8a3ed',.4):emailMat));g.add(new THREE.Line(emailLineGeo,highlight?new THREE.LineBasicMaterial({color:'#ffd19b'}):emailLineMat));const shape=new THREE.Shape();shape.moveTo(-.55,0);shape.lineTo(.55,0);shape.lineTo(0,-.35);shape.closePath();const flap=new THREE.Mesh(new THREE.ShapeGeometry(shape),glass(highlight?'#ffcea1':'#aaa4ff',.24));flap.position.set(0,.3,.06);g.add(flap);g.userData.flap=flap;return g}
const machine=new THREE.Group();scene.add(machine);const modules=[],spinners=[],scanner=[];
for(let i=0;i<6;i++){
 const g=new THREE.Group(),color=components[i].color,accent=glow(color,.8);machine.add(g);g.userData.index=i;
 const base=box(g,[1.44,.16,1.55],[0,-.9,0],metal);box(g,[1.27,.02,1.4],[0,-.807,0],glass(color,.16),.02);
 const lip=box(g,[1.16,.035,.018],[0,-.78,.71],accent,.005);
 const title=label('0'+(i+1),.5,color);title.position.set(0,-1.15,.9);g.add(title);
 if(i===0){
  box(g,[1.15,1.5,.16],[0,0,-.1],glass(color,.24));outline(g,1.16,1.5,.02,color);for(let j=0;j<3;j++){const e=email();e.scale.setScalar(.48);e.position.set(0,-.45+j*.38,.35-j*.12);g.add(e)}
 }else if(i===1){
  for(let j=0;j<3;j++)box(g,[1.04,1.26,.04],[0,0,-.28+j*.28],glass(color,.24));
  const beam=box(g,[1.09,.025,.78],[0,.3,0],glow(color,2.1),.005);scanner.push(beam);
  for(let j=0;j<5;j++)box(g,[.54-(j%2)*.15,.055,.025],[-.07,.35-j*.17,.35],glow(color,.5),.008);
 }else if(i===2){
  for(let j=0;j<4;j++){const disc=new THREE.Mesh(new THREE.CylinderGeometry(.47,.47,.13,40),j===1?glass(color,.65):metal);disc.position.y=-.5+j*.3;g.add(disc);const ring=new THREE.Mesh(new THREE.TorusGeometry(.46,.013,6,40),accent);ring.rotation.x=Math.PI/2;ring.position.y=disc.position.y+.075;g.add(ring)}
  for(let j=0;j<3;j++){const node=box(g,[.12,.12,.12],[Math.cos(j*2.1)*.66,.05,Math.sin(j*2.1)*.66],accent,.025);pipe(g,[[0,.05,0],[node.position.x,.05,node.position.z]],color,.008,.5)}
 }else if(i===3){
  const cage=new THREE.Group();g.add(cage);for(let j=0;j<3;j++){const torus=new THREE.Mesh(new THREE.TorusGeometry(.55,.023,7,6),accent);torus.rotation.set(j*.67,j*.83,Math.PI/6);cage.add(torus)}const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.36),glass(color,.7));cage.add(gem);spinners.push({obj:cage,speed:.16});
 }else if(i===4){
  const dial=new THREE.Group();g.add(dial);for(let j=0;j<3;j++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.32+j*.13,.028,8,48),j===1?accent:metal);ring.rotation.x=.7+j*.2;dial.add(ring)}box(g,[.16,.65,.12],[0,.15,0],accent,.03);spinners.push({obj:dial,speed:-.12});
 }else{
  const e=email(true);e.scale.setScalar(.6);e.position.set(0,.35,0);g.add(e);for(let j=0;j<3;j++){const x=(j-1)*.5;pipe(g,[[0,.05,0],[0,-.15,0],[x,-.4,.15],[x,-.61,.37]],j===1?'#ffbf78':color,.021);box(g,[.24,.13,.24],[x,-.61,.37],j===1?glow('#ffbf78',1.8):glass(color,.5),.04)}
 }
 const halo=new THREE.Mesh(new THREE.TorusGeometry(.89,.016,6,64),glow(color,1.8));halo.rotation.x=Math.PI/2;halo.position.y=-.91;g.add(halo);g.userData.halo=halo;g.userData.accent=accent;modules.push(g);
}
const connections=new THREE.Group();machine.add(connections);
for(let i=0;i<5;i++){const a=modulePosition(i,1),b=modulePosition(i+1,1);pipe(connections,[[a[0]+.72,-.86,0],[(a[0]+b[0])/2,-.86,.22],[b[0]-.72,-.86,0]],components[i].color,.012,.5)}
const storyLinks=new THREE.Group();machine.add(storyLinks);const storyNodes=[[-2.65,-.6,-1.55],[0,-.6,-1.55],[2.65,-.6,-1.55],[2.65,-.6,1.55],[0,-.6,1.55],[-2.65,-.6,1.55]];for(let i=0;i<5;i++){const a=storyNodes[i],b=storyNodes[i+1];pipe(storyLinks,[a,[(a[0]+b[0])/2,-.62,(a[2]+b[2])/2],b],components[i].color,.012,.5)}storyLinks.visible=kind==='journey';
const routes=new THREE.Group();scene.add(routes);const routingPaths=[];
for(let j=0;j<3;j++){
 const col=j===1?'#ffba6c':j===0?'#a1a0ff':'#777dec';const end=[9.8,-.12+(j-1)*1.05,(j-1)*1.8];
 const p=pipe(routes,[[-2.65,-.2,1.55],[1.5,-.7,2.8+(j-1)*.2],[6.7,end[1],end[2]],end],col,.018,.72);routingPaths.push(p.curve);
 const plaque=box(routes,[1.45,.66,.08],end,glass(col,.3));const txt=label(j===1?'REVISÃO HUMANA':j===0?'COTAÇÃO':'RECUSA',1.45,col);txt.position.set(end[0],end[1]+.64,end[2]);routes.add(txt);
 const symbol=label(j===1?'↗':j===0?'✓':'—',.5,col);symbol.position.set(end[0],end[1],end[2]+.1);routes.add(symbol);
}
const lead=email(true);scene.add(lead);const leadGlow=new THREE.PointLight('#ffbd82',7,7);lead.add(leadGlow);leadGlow.position.z=1;
const dataGroup=new THREE.Group();scene.add(dataGroup);const tokens=[];
['RAMO','OPERAÇÃO','CORRETOR','CONTEXTO','COBERTURA'].forEach((word,i)=>{const g=new THREE.Group();const b=box(g,[1.5,.52,.12],[0,0,0],glass(i===0?'#ffc483':'#b9afff',.45));const t=label(word,1.27,i===0?'#ffe2b8':'#d8d3ff');t.position.set(0,0,.1);g.add(t);dataGroup.add(g);tokens.push(g)});
const cloud=new THREE.Group();scene.add(cloud);const emails=[];for(let i=0;i<42;i++){const e=email();const seed=(i*13.713)%10;e.userData.seed=seed;e.userData.i=i;e.scale.setScalar(.28+(i%5)*.12);e.rotation.set((i%5-.2)*.12,(i%7-3)*.13,(i%3-1)*.16);cloud.add(e);emails.push(e)}
const particles=[];const moving=new THREE.Group();scene.add(moving);for(let i=0;i<9;i++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),glow(i%3===1?'#ffbd78':'#aca9ff',3));moving.add(dot);particles.push(dot)}
const dustGeo=new THREE.BufferGeometry();const dustPoints=[];for(let i=0;i<110;i++)dustPoints.push(Math.sin(i*43.43)*25,Math.cos(i*17.41)*9,Math.sin(i*2.13)*20);dustGeo.setAttribute('position',new THREE.Float32BufferAttribute(dustPoints,3));scene.add(new THREE.Points(dustGeo,new THREE.PointsMaterial({color:'#8a8eaf',size:.018,transparent:true,opacity:.45})));
const controls=kind==='machine'?new OrbitControls(camera,renderer.domElement):null;
if(controls){controls.enableDamping=true;controls.dampingFactor=.09;controls.enableZoom=false;controls.enablePan=false;controls.minPolarAngle=.45;controls.maxPolarAngle=1.45;controls.target.set(0,-.15,0);controls.rotateSpeed=.55}
const state={progress:0,explode:1,selected:0,overview:true,visible:false,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches};let stopped=false,frame=0,time=0,previous=0,lastDraw=0,width=1,height=1,orbiting=false,cameraGoal=null,actualProgress=0;
if(controls){controls.addEventListener('start',()=>{orbiting=true;cameraGoal=null});controls.addEventListener('end',()=>orbiting=false)}
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);renderer.domElement.addEventListener('pointerup',e=>{if(kind!=='machine'||!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hits=ray.intersectObjects(modules,true);if(hits.length){let o=hits[0].object;while(o.parent&&o.userData.index===undefined)o=o.parent;if(o.userData.index!==undefined)onSelect(o.userData.index)}});
function resize(){const r=host.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);camera.aspect=width/height;if(kind==='journey'&&width>760)camera.setViewOffset(width,height,-width*.21,0,width,height);else camera.clearViewOffset();camera.updateProjectionMatrix();renderer.setSize(width,height,false);composer.setSize(width,height);if(kind==='machine'&&state.overview){const k=Math.max(1,1.3/camera.aspect);camera.position.set(5*k,4.5*k,13*k);controls.target.set(0,-.15,0);controls.update()}}
const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
const observer=new IntersectionObserver(entries=>{state.visible=entries[0].isIntersecting;if(state.visible){previous=performance.now();if(!frame)frame=requestAnimationFrame(tick)}},{rootMargin:'60px'});observer.observe(host);
function transformModel(dt){
 const p=state.reduced?state.progress:actualProgress=lerp(actualProgress,state.progress,Math.min(1,dt*3.8));const phase=p*6;
 modules.forEach((m,i)=>{const pos=kind==='journey'?[[-2.65,0,-1.55],[0,0,-1.55],[2.65,0,-1.55],[2.65,0,1.55],[0,0,1.55],[-2.65,0,1.55]][i]:modulePosition(i,state.explode);const intro=kind==='journey'?ramp(phase,2.3+i*.08,3.1+i*.08):1;m.position.lerp(V(pos[0],pos[1]-(1-intro)*2.5,pos[2]),state.reduced?1:Math.min(1,dt*6));m.scale.setScalar(Math.max(.001,intro));m.userData.halo.material.emissiveIntensity=(state.selected===i&&kind==='machine')?2.5:.65;m.userData.accent.emissiveIntensity=state.selected===i&&kind==='machine'?1.3:.5});
 connections.visible=false;
 if(kind==='machine'){cloud.visible=false;lead.visible=false;dataGroup.visible=false;routes.visible=false;moving.visible=false;machine.visible=true;floor.visible=false;grid.visible=false;
  if(cameraGoal&&!orbiting){camera.position.lerp(cameraGoal.position,Math.min(1,dt*3));controls.target.lerp(cameraGoal.target,Math.min(1,dt*3));if(camera.position.distanceTo(cameraGoal.position)<.03)cameraGoal=null}
 }else{
  const pose=poseAt(p),k=width<760?1.35:1;camera.position.set(...pose.camera.map(v=>v*k));camera.lookAt(...pose.target);machine.visible=phase>2.25;routes.visible=phase>3.6;routes.scale.setScalar(Math.max(.001,ramp(phase,3.65,4.2)));moving.visible=phase>3.5;floor.visible=false;grid.visible=false;
  const leadSize=phase<1?lerp(.45,2.15,ramp(phase,.2,1)):phase<2?2.15:lerp(2.15,.001,ramp(phase,2,2.8));lead.scale.setScalar(leadSize);lead.position.set(0,.7+Math.sin(time*.7)*.035,1.1);lead.rotation.set(.08,Math.sin(time*.25)*.1-.13,.08);lead.userData.flap.rotation.x=-ramp(phase,1.7,2.4)*1.65;
  dataGroup.visible=phase>1.65&&phase<3.3;tokens.forEach((g,i)=>{const t=ramp(phase,1.7+i*.04,2.4+i*.04);const a=i/5*Math.PI*2+.2;g.position.set(Math.cos(a)*2.35*t,.7+Math.sin(a)*1.4*t,Math.sin(a)*.6*t);g.scale.setScalar(Math.max(.001,t*(1-ramp(phase,2.8,3.3))));g.rotation.y=-.2+Math.sin(time*.5+i)*.06});
  cloud.visible=true;const ordered=ramp(phase,4.65,5.5),hide=ramp(phase,.65,1.5)*(1-ramp(phase,4.6,5.3));cloud.scale.setScalar(1-hide*.85);
  emails.forEach((e,i)=>{const seed=e.userData.seed,speed=state.reduced?0:time*.65;const xx=Math.sin(seed*14+i)*5.5,yy=Math.cos(seed*6+i)*2.5,zz=((i*1.17+speed)%22)-11;const x=lerp(xx,((i*.65+speed*1.8)%19)-10,ordered),lane=i%3;const y=lerp(yy,-.15+(lane-1)*1.1,ordered);const z=lerp(zz,(lane-1)*1.9,ordered);e.position.set(x,y,z);e.rotation.y=lerp(Math.sin(seed)*.5,-.15,ordered);e.rotation.z=lerp(Math.sin(i+time*.15)*.2,0,ordered);e.scale.setScalar((.28+(i%5)*.12)*(1-hide*.7));});
  particles.forEach((d,i)=>{d.position.copy(routingPaths[i%3].getPoint((((state.reduced?i*.11:time*.18+i*.13)%1+1)%1)));});
 }
 if(!state.reduced){spinners.forEach(s=>s.obj.rotation.y=time*s.speed);scanner.forEach(s=>s.position.y=Math.sin(time*1.5)*.55)}
}
function tick(now){frame=0;if(stopped||document.hidden||!state.visible)return;const dt=clamp((now-previous)/1000,0,.05);previous=now;time+=dt;if(now-lastDraw>30){transformModel(dt);controls?.update();composer.render();lastDraw=now;host.dataset.rendered='true';host.dataset.drawCalls=String(renderer.info.render.calls);host.dataset.progress=state.progress.toFixed(3)}frame=requestAnimationFrame(tick)}
function visibility(){if(!document.hidden&&state.visible&&!frame){previous=performance.now();frame=requestAnimationFrame(tick)}}document.addEventListener('visibilitychange',visibility);
const reduceQuery=matchMedia('(prefers-reduced-motion: reduce)');const changeReduce=()=>{state.reduced=reduceQuery.matches};reduceQuery.addEventListener('change',changeReduce);
function select(i,overview=false){state.selected=i;state.overview=overview;const k=Math.max(1,1.25/camera.aspect);const p=modulePosition(i,state.explode);cameraGoal=overview?{position:V(5*k,4.5*k,13*k),target:V(0,-.15,0)}:{position:V(p[0]+2.8*k,2.3*k,p[2]+4.7*k),target:V(p[0],0,p[2])};}
const onContextLost=e=>{e.preventDefault();onFailure(new Error('WebGL context lost'));stopped=true;cancelAnimationFrame(frame)};renderer.domElement.addEventListener('webglcontextlost',onContextLost);
transformModel(.05);composer.render();host.dataset.rendered='true';onReady();
return{setProgress:p=>{state.progress=clamp(p)},setExplode:v=>{state.explode=clamp(v);if(!state.overview)select(state.selected)},select,renderStill:()=>{transformModel(1);composer.render()},dispose:()=>{stopped=true;cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();controls?.dispose();composer.dispose();env.dispose();renderer.dispose();document.removeEventListener('visibilitychange',visibility);reduceQuery.removeEventListener('change',changeReduce);renderer.domElement.remove()}};
}
