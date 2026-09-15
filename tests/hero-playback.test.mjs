import test from 'node:test';
import assert from 'node:assert/strict';
import { filmPhase, mayPlay, readSeen, rememberSeen, SESSION_KEY } from '../src/hero-playback.mjs';
import { HOME_INSIGHTS } from '../src/home-insights.mjs';
import { existsSync } from 'node:fs';

test('timeline follows decoded time across the two story boundaries', () => {
  assert.deepEqual([0, 1.99, 2, 4.99, 5, 8].map(filmPhase), [0,0,1,1,2,2]);
  assert.equal(filmPhase(0),0); // Replay resets the story.
});
test('playback requires intent, visibility, a visible tab and an unfinished film', () => {
  const ready={wanted:true,visible:true,hidden:false,finished:false};
  assert.equal(mayPlay(ready),true);
  for(const [key,value] of Object.entries({wanted:false,visible:false,hidden:true,finished:true})) assert.equal(mayPlay({...ready,[key]:value}),false);
});
test('session playback works when storage is denied', () => {
  Object.defineProperty(globalThis,'sessionStorage',{configurable:true,get(){throw new Error('Denied');}});
  assert.equal(readSeen(),false);
  rememberSeen();
  assert.equal(readSeen(),true);
  delete globalThis.sessionStorage;
});
test('homepage articles resolve to real local pages and assets', () => {
  for(const [lang, articles] of Object.entries(HOME_INSIGHTS)) {
    assert.equal(articles.length,3);
    for(const a of articles) {
      assert.ok(existsSync('public/insights/'+a.slug+'/index.html'),a.slug);
      assert.ok(existsSync('public'+a.image),a.image);
    }
    assert.equal([...articles].sort((a,b)=>b.dateISO.localeCompare(a.dateISO))[0],articles[0]);
  }
});
