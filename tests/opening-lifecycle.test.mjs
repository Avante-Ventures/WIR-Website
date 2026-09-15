import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

// Run the real component effect against browser/media doubles, without launching
// another browser or downloading assets. React rendering is irrelevant to these lifecycle cases.
const { outputFiles } = await build({
  entryPoints: ['src/home-opening.jsx'], bundle: true, write: false, format: 'esm', platform: 'node',
  define: {'import.meta.env.DEV':'false'},
  plugins: [{name:'lifecycle-doubles',setup(b){
    b.onResolve({filter:/^react$/},()=>({path:'react',namespace:'double'}));
    b.onLoad({filter:/.*/,namespace:'double'},()=>({contents:'export default globalThis.__react; export const {useState,useRef,useEffect}=globalThis.__react;'}));
    b.onLoad({filter:/\.css$/},()=>({contents:'',loader:'js'}));
  }}],
});
let serial=0;
async function setup({seen=false,reduced=false,reject=false,slow=false}={}) {
  const media = new EventTarget(); media.matches=reduced;
  const doc = new EventTarget(); doc.hidden=false; doc.documentElement={lang:'pt-BR'};
  globalThis.document=doc;
  globalThis.window={matchMedia:q=>q.includes('reduced')?media:{matches:false}};
  const storage=new Map(seen?[['wir-scale-film-v1','seen']]:[]);
  globalThis.sessionStorage={getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)};
  let observer;
  globalThis.IntersectionObserver=class {
    constructor(cb){this.cb=cb;observer=this;} observe(){} disconnect(){this.disconnected=true;}
    show(v){this.cb([{isIntersecting:v}]);}
  };
  const video=new EventTarget();
  Object.assign(video,{paused:true,currentTime:0,readyState:0,src:null,error:null,dataset:{},plays:0,loads:0});
  video.getAttribute=()=>video.src;
  video.removeAttribute=()=>{video.src=null;};
  video.load=()=>{video.loads++;};
  video.pause=()=>{video.paused=true;video.dispatchEvent(new Event('pause'));};
  video.play=()=>{
    video.plays++;
    if(reject) return Promise.reject(new Error('Autoplay blocked'));
    video.paused=false;
    if(!slow){video.readyState=4;video.dispatchEvent(new Event('playing'));}
    return Promise.resolve();
  };
  const refs=[{current:{}},{current:video},{current:null}],states=[];
  let refIndex=0,effect;
  globalThis.__react={createElement:()=>null,useRef:()=>refs[refIndex++],useState:initial=>{
    const i=states.length;states.push(initial);return [initial,v=>{states[i]=v;}];
  },useEffect:fn=>{effect=fn;}};
  const mod=await import('data:text/javascript;base64,'+Buffer.from(outputFiles[0].text+'\n// case '+serial++).toString('base64'));
  mod.Opening({go(){}});
  const cleanup=effect();
  const settle=async()=>{await Promise.resolve();await Promise.resolve();};
  return {video,doc,media,observer,states,controls:refs[2].current,cleanup,settle,storage};
}

test('first visit plays once, pauses for visibility, resumes, ends, and tears down',async()=>{
  const x=await setup(); x.observer.show(true); await x.settle();
  assert.equal(x.states[0],'film'); assert.equal(x.video.muted,true); assert.equal(x.storage.get('wir-scale-film-v1'),'seen');
  x.observer.show(false); assert.equal(x.video.paused,true);
  x.observer.show(true); await x.settle(); assert.equal(x.video.paused,false);
  x.doc.hidden=true;x.doc.dispatchEvent(new Event('visibilitychange'));assert.equal(x.video.paused,true);
  x.doc.hidden=false;x.doc.dispatchEvent(new Event('visibilitychange'));await x.settle();assert.equal(x.video.paused,false);
  x.video.currentTime=8;x.video.paused=true;x.video.dispatchEvent(new Event('ended'));assert.equal(x.states[0],'ended');
  const count=x.video.plays;x.observer.show(false);x.observer.show(true);assert.equal(x.video.plays,count);
  x.controls.replay();await x.settle();assert.equal(x.video.currentTime,0);assert.equal(x.states[0],'film');
  x.cleanup();assert.equal(x.video.src,null);assert.equal(x.video.paused,true);assert.equal(x.observer.disconnected,true);
});
test('explicit pause stays paused after leaving and returning',async()=>{
  const x=await setup();x.observer.show(true);await x.settle();x.controls.toggle();
  x.observer.show(false);x.observer.show(true);await x.settle();assert.equal(x.video.paused,true);
  x.controls.toggle();await x.settle();assert.equal(x.video.paused,false);x.cleanup();
});
test('return visits and reduced motion avoid downloading until an explicit play',async()=>{
  for(const option of [{seen:true},{reduced:true}]){
    const x=await setup(option);x.observer.show(true);assert.equal(x.video.src,null);assert.equal(x.states[0],'poster');
    x.controls.toggle();await x.settle();assert.equal(x.states[0],'film');x.cleanup();
  }
});
test('slow loading keeps the poster and does not mark the session seen',async()=>{
  const x=await setup({slow:true});x.observer.show(true);await x.settle();
  assert.equal(x.states[0],'poster');assert.equal(x.storage.has('wir-scale-film-v1'),false);
  x.video.readyState=4;x.video.dispatchEvent(new Event('playing'));assert.equal(x.states[0],'film');x.cleanup();
});
test('blocked playback and a media error restore the complete final poster',async()=>{
  const blocked=await setup({reject:true});blocked.observer.show(true);await blocked.settle();
  assert.equal(blocked.states[0],'poster');assert.equal(blocked.states[1],2);blocked.cleanup();
  const x=await setup();x.observer.show(true);await x.settle();x.video.dispatchEvent(new Event('error'));
  x.video.currentTime=0;x.video.dispatchEvent(new Event('timeupdate'));
  assert.equal(x.states[0],'poster');assert.equal(x.states[1],2);assert.equal(x.video.paused,true);x.cleanup();
});
test('changing to reduced motion stops an active intro',async()=>{
  const x=await setup();x.observer.show(true);await x.settle();x.media.matches=true;x.media.dispatchEvent(new Event('change'));
  assert.equal(x.states[0],'poster');assert.equal(x.video.paused,true);x.cleanup();
});
