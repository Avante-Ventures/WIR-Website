import test from 'node:test';
import assert from 'node:assert/strict';
import { postForm } from '../src/form-transport.mjs';
const config={supabaseUrl:'https://form.invalid',supabaseAnonKey:'test-public-key'};
test('Contact and newsletter use the configured table and send only the provided payload',async()=>{
 for(const [table,payload] of [['leads',{name:'Test',email:'test@example.invalid',company:'QA'}],['newsletter_subs',{email:'test@example.invalid',source:'newsletter'}]]){
  let call;const res=await postForm(config,table,payload,async(url,options)=>{call={url,options};return {ok:true,status:201};});
  assert.equal(res.status,201);assert.equal(call.url,config.supabaseUrl+'/rest/v1/'+table);
  assert.equal(call.options.method,'POST');assert.equal(call.options.headers.Prefer,'return=minimal');
  assert.deepEqual(JSON.parse(call.options.body),payload);assert(call.options.signal instanceof AbortSignal);
 }
});
test('Rejected and duplicate responses reach the UI, and transport failures reject',async()=>{
 for(const status of [400,401,409,500])assert.equal((await postForm(config,'leads',{},async()=>({ok:false,status}))).status,status);
 await assert.rejects(postForm(config,'leads',{},async()=>{throw new Error('offline');}),/offline/);
});
