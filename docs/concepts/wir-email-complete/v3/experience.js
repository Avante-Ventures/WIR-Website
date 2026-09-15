import {makeEmailStage,clamp,stepProgress} from './email-motion.js';
import {createExperienceScene} from './scene.js';
import {components} from './model.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let machine=null,selected=0;
const hero=makeEmailStage($('#hero-stage')),story=makeEmailStage($('#story-stage'));
const playback={progress:0,playing:false,last:0,frame:0,visited:false};
const beats=['Um pedido chega.','A informação se organiza.','Falta o valor da carga.','Uma resposta fica pronta.'];
function renderHero(p){
 playback.progress=clamp(p);hero.update(playback.progress);
 const beat=p<.35?0:p<.55?1:p<.76?2:3;
 $('#hero-beat').textContent=beats[beat];$('#hero-beat-number').textContent='0'+(beat+1);
 $('#film-progress').style.transform=`scaleX(${playback.progress})`;
}
function pause(){playback.playing=false;cancelAnimationFrame(playback.frame);playback.frame=0;$('#play-film').innerHTML=playback.progress>=1?'▷ <span>Rever</span>':'▷ <span>Continuar</span>';$('#play-film').setAttribute('aria-label',playback.progress>=1?'Repetir a introdução':'Continuar a introdução')}
function tick(now){if(!playback.playing)return;const dt=clamp((now-playback.last)/1000,0,.08);playback.last=now;renderHero(playback.progress+dt/12);if(playback.progress>=1){pause();return}playback.frame=requestAnimationFrame(tick)}
function play(restart=false){if(reduced.matches){renderHero(1);pause();return}if(restart||playback.progress>=1)renderHero(0);playback.playing=true;playback.last=performance.now();$('#play-film').innerHTML='Ⅱ <span>Pausar</span>';$('#play-film').setAttribute('aria-label','Pausar a introdução');cancelAnimationFrame(playback.frame);playback.frame=requestAnimationFrame(tick)}
$('#play-film').addEventListener('click',()=>playback.playing?pause():play());
$('#replay-film').addEventListener('click',()=>play(true));
const heroObserver=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting){pause();return}if(!playback.visited){playback.visited=true;if(reduced.matches){renderHero(1);pause()}else play()}},{threshold:.4});heroObserver.observe($('#hero-stage'));
renderHero(reduced.matches?1:0);
const captions=['O pedido e seu contexto, juntos.','Três informações. Uma solicitação organizada.','A pendência aparece antes de seguir.','Resposta preparada para revisão da equipe.'];
let storyCurrent=0,storyTarget=stepProgress[0],storyFrame=0,activeStep=-1;
function setStep(i){if(i===activeStep)return;activeStep=i;storyTarget=stepProgress[i];$$('[data-step]').forEach(b=>{if(Number(b.dataset.step)===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});$('#story-caption').textContent=captions[i];storyCurrent=storyTarget;story.update(storyTarget)}
$$('[data-step]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.step);setStep(i);$$('[data-story-step]')[i].scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'})}));
let scrollPending=false;
function followScroll(){scrollPending=false;const narrow=matchMedia('(max-width:760px)').matches;const anchor=narrow?$('.story-visual').getBoundingClientRect().bottom+90:innerHeight*.5;let nearest=0,distance=Infinity;$$('[data-story-step]').forEach((el,i)=>{const r=el.getBoundingClientRect();const d=Math.abs((narrow?r.top+90:r.top+r.height/2)-anchor);if(d<distance){distance=d;nearest=i}});setStep(nearest)}
function requestScroll(){if(!scrollPending){scrollPending=true;requestAnimationFrame(followScroll)}}
window.addEventListener('scroll',requestScroll,{passive:true});window.addEventListener('resize',requestScroll);setStep(0);
function selectComponent(i,moveCamera=true){selected=i;const c=components[i];$('#component-number').textContent='0'+(i+1);$('#component-category').textContent=c.category;$('#component-title').innerHTML=c.title;$('#component-description').textContent=c.description;for(const key of ['input','action','output','boundary'])$('#component-'+key).textContent=c[key];$$('[data-component]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.component)===i)));$('#next-component').innerHTML=i===5?'Voltar à entrada <span>↻</span>':'Próximo componente <span>→</span>';if(moveCamera)machine?.select(i);}
const machineObserver=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting||machine||!$('#technical-detail').open)return;try{machine=createExperienceScene($('#machine-scene'),{kind:'machine',onSelect:i=>selectComponent(i),onFailure:error=>{console.error('WIR components:',error);$('#machine-scene').innerHTML='<p style="padding:60px;color:#a7aac5;font-size:13px">O modelo 3D não está disponível. Selecione os seis componentes abaixo para explorar suas funções.</p>'}});machine?.setExplode(Number($('#explode-control').value));machineObserver.disconnect()}catch(error){console.error(error)}},{rootMargin:'200px'});machineObserver.observe($('#machine-scene'));
$$('[data-component]').forEach(b=>b.addEventListener('click',()=>selectComponent(Number(b.dataset.component))));$('#next-component').addEventListener('click',()=>selectComponent((selected+1)%6));$('#explode-control').addEventListener('input',e=>{machine?.setExplode(Number(e.target.value));$('#machine-state').textContent=Number(e.target.value)>.65?'Estrutura aberta':Number(e.target.value)<.25?'Estrutura reunida':'Separando componentes'});$('#machine-overview').addEventListener('click',()=>machine?.select(selected,true));
const dialog=$('#contact-dialog');$('#open-contact').addEventListener('click',()=>{pause();dialog.showModal()});$('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});$('#contact-form').addEventListener('submit',e=>{e.preventDefault();$('#contact-result').textContent='Conversa preparada. Esta é uma prévia local; nenhuma mensagem foi enviada.'});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
reduced.addEventListener('change',()=>{pause();if(reduced.matches){renderHero(1);cancelAnimationFrame(storyFrame);storyFrame=0;storyCurrent=storyTarget;story.update(storyTarget)}});
window.addEventListener('pagehide',()=>{pause();cancelAnimationFrame(storyFrame);hero.dispose();story.dispose();machine?.dispose();heroObserver.disconnect();machineObserver.disconnect()},{once:true});
window.wirPreview={getState:()=>({progress:playback.progress,playing:playback.playing,activeStep,technicalOpen:$('#technical-detail').open,selected})};
