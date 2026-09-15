import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { parseHTML } from 'linkedom';
const require=createRequire(import.meta.url);
const entries=[['src/solutions.jsx','SolutionsPage','solution-overview'],['src/experience-pages.jsx','HowPage','information-flow'],['src/about.jsx','AboutPage','wir-team']];
for(const [file,name,anchor] of entries){
 const result=await build({entryPoints:[file],bundle:true,platform:'node',format:'cjs',write:false,packages:'external',loader:{'.css':'empty'}});
 for(const lang of ['pt-BR','en','es'])test(`${name} renders complete semantic content in ${lang}`,()=>{
  const module={exports:{}};
  vm.runInNewContext(result.outputFiles[0].text,{module,exports:module.exports,require,document:{documentElement:{lang}},location:{hash:''},console});
  const {document}=parseHTML(renderToString(React.createElement(module.exports[name],{go(){}})));
  assert.equal(document.querySelectorAll('h1').length,1);
  assert(document.getElementById(anchor));
  assert(document.querySelector('a[href="#contact"]'));
  assert(!document.textContent?.includes('undefined'));
  const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);assert.equal(new Set(ids).size,ids.length);
  if(name==='HowPage'){
   const tabs=document.querySelectorAll('[role="tab"]');assert.equal(tabs.length,3);
   assert.equal(document.querySelectorAll('[aria-selected="true"]').length,1);
   for(const tab of tabs)assert(document.getElementById(tab.getAttribute('aria-controls')));
   assert.equal(document.querySelectorAll('.xp-process article').length,3);
  }
 });
}

test('How it works flow responds to click and arrow-key navigation',async()=>{
 const built=await build({entryPoints:['src/experience-pages.jsx'],bundle:true,platform:'node',format:'cjs',write:false,packages:'external',loader:{'.css':'empty'}});
 let state=0,focused='';const module={exports:{}};
 const react={...React,useState:()=>[state,v=>{state=v;}]};
 vm.runInNewContext(built.outputFiles[0].text,{module,exports:module.exports,require:id=>id==='react'?react:require(id),document:{documentElement:{lang:'en'},getElementById:id=>({focus(){focused=id;}})}});
 function tabs(){const found=[];function visit(el){if(!el||typeof el!=='object')return;if(el.props?.role==='tab')found.push(el);React.Children.forEach(el.props?.children,visit);}visit(module.exports.HowPage({go(){}}));return found;}
 let current=tabs();assert.equal(current[0].props['aria-selected'],true);
 current[0].props.onKeyDown({key:'ArrowRight',preventDefault(){}});
 assert.equal(state,1);assert.equal(focused,'flow-tab-1');
 current=tabs();assert.equal(current[1].props['aria-selected'],true);
 current[2].props.onClick();assert.equal(state,2);
 current=tabs();current[2].props.onKeyDown({key:'Home',preventDefault(){}});assert.equal(state,0);
});
