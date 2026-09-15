import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';

function fixture(html,url='http://localhost/insights/') {
  const {window,document}=parseHTML(html);
  // Browsers coerce innerHTML assignments to DOMString; LinkeDOM expects a string.
  const inner = Object.getOwnPropertyDescriptor(window.Element.prototype,'innerHTML');
  Object.defineProperty(window.Element.prototype,'innerHTML',{configurable:true,get:inner.get,set(value){inner.set.call(this,String(value));}});
  for(const select of document.querySelectorAll('select')) {
    Object.defineProperty(select,'options',{get:()=>select.querySelectorAll('option')});
    Object.defineProperty(select,'value',{get(){return this._value ?? this.querySelector('option')?.value ?? '';},set(v){this._value=v;}});
  }
  for(const canvas of document.querySelectorAll('canvas')) canvas.getContext=()=>({clearRect(){}});
  const location=new URL(url); const stored=new Map();
  const context=vm.createContext({document,window:null,location,URL,URLSearchParams,AbortSignal,console,
    localStorage:{getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v)},
    history:{replaceState:(_,__,v)=>{location.href=String(v);}},
    innerHeight:800,scrollY:0,addEventListener(){},requestAnimationFrame:f=>f(),setTimeout:()=>0,
    getComputedStyle:()=>({getPropertyValue:()=> '#7540AC'}),
  });context.window=context;
  return {context,document,window,location};
}
const tools=fs.readFileSync('public/article-tools.js','utf8');
test('Archive search ignores accents, combines category and query, and persists URL',()=>{
  const f=fixture(fs.readFileSync('public/insights/index.html','utf8'),'http://localhost/insights/?q=subscricao');
  vm.runInContext(tools,f.context);
  const cards=[...f.document.querySelectorAll('.ix-card,.ix-hero')];
  assert(cards.some(c=>!c.hidden)); assert(cards.some(c=>c.hidden));
  const input=f.document.querySelector('input'); input.value='zzzz-no-matches';input.dispatchEvent(new f.window.Event('input'));
  assert(cards.every(c=>c.hidden));assert.equal(f.document.querySelector('.ix-empty').hidden,false);
  assert.equal(f.location.searchParams.get('q'),'zzzz-no-matches');
  input.value='';const select=f.document.querySelector('select');select.value=cards[0].dataset.category;select.dispatchEvent(new f.window.Event('change'));
  assert(cards.filter(c=>!c.hidden).every(c=>c.dataset.category===select.value));
});
test('Article index uses real headings and anchors',()=>{
  const f=fixture('<html lang="en"><body><div class="blarticle__body"><h3>First topic</h3><h3>Second topic</h3></div></body></html>');
  f.document.querySelector('.blarticle__body').getBoundingClientRect=()=>({top:0,height:1200});
  vm.runInContext(tools,f.context);
  const links=[...f.document.querySelectorAll('.article-toc a')];
  assert.equal(links.length,2);assert.equal(links[1].textContent,'Second topic');assert(f.document.querySelector(links[1].getAttribute('href')));
});
const hasDashboard=fs.existsSync('../wir-susep-dashboard/index.html');
const dashboardHTML=hasDashboard ? fs.readFileSync('../wir-susep-dashboard/index.html','utf8') : '<script></script>';
const dashboardJS=[...dashboardHTML.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const data=hasDashboard ? JSON.parse(fs.readFileSync('../wir-susep-dashboard/data/data.json','utf8')) : null;
function dashboard(fetcher) {
  const f=fixture(dashboardHTML,'http://localhost/dashboard/?lang=es');
  class Chart {static defaults={plugins:{legend:{labels:{}},tooltip:{}},font:{}};constructor(el,options){this.data=options.data;this.options=options.options;}destroy(){}resize(){}}
  f.context.Chart=Chart;f.context.fetch=fetcher;
  vm.runInContext(dashboardJS,f.context);
  return f;
}
const flush=()=>new Promise(r=>setImmediate(r));
test('Dashboard can switch language while loading, then renders real data',{skip:!hasDashboard},async()=>{
  let resolve;const f=dashboard(()=>new Promise(r=>resolve=r));
  vm.runInContext("setLang('en')",f.context);
  assert.equal(f.document.documentElement.lang,'en');
  assert.equal(f.document.querySelector('#segPer button').disabled,true);
  resolve({ok:true,json:async()=>data});await flush();
  assert.equal(vm.runInContext('DATA_STATE',f.context),'ready');
  assert.equal(f.document.querySelector('#segPer button').disabled,false);
  assert.equal(f.document.querySelector('#data-status').hidden,true);
  assert(f.document.querySelector('#segTbody')?.children.length || f.document.querySelector('tbody')?.children.length);
  vm.runInContext("MODE='2025';render();applyTheme('night');setLang('es')",f.context);
  assert.equal(f.document.documentElement.lang,'es');
  assert.equal(vm.runInContext('GRUPOS.length',f.context),data.GRUPOS.length);
});
test('Dashboard handles invalid data, offers localized retry, and recovers',{skip:!hasDashboard},async()=>{
  let valid=false;const f=dashboard(async()=>({ok:true,json:async()=>valid?data:{}}));await flush();
  assert.equal(vm.runInContext('DATA_STATE',f.context),'error');
  assert.match(f.document.querySelector('#data-status').textContent,/Reintentar/);
  valid=true;await vm.runInContext('boot()',f.context);
  assert.equal(vm.runInContext('DATA_STATE',f.context),'ready');
});

test('All published article links and local assets resolve',()=>{
  const pages=['public/insights/index.html','public/en/insights/index.html',...fs.readdirSync('public/insights',{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>'public/insights/'+d.name+'/index.html').filter(f=>fs.existsSync(f))];
  let checked=0;
  for(const file of pages){
    const {document}=parseHTML(fs.readFileSync(file,'utf8'));
    for(const el of document.querySelectorAll('[href],[src]')){
      const href=el.getAttribute('href')||el.getAttribute('src');
      if(!href.startsWith('/')||href.startsWith('//'))continue;
      const pathname=decodeURI(href.split(/[?#]/)[0]);
      if(['/', '/en/','/es/'].includes(pathname)||pathname.startsWith('/dashboard/'))continue;
      let local=path.join('public',pathname);if(pathname.endsWith('/'))local=path.join(local,'index.html');
      assert(fs.existsSync(local),`${file}: missing ${pathname}`);checked++;
    }
  }
  assert(checked>3000);
});
