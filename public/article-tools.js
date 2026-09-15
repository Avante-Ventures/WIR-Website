/* Progressive enhancement: every article and archive link works without JavaScript. */
(() => {
  const en = document.documentElement.lang === 'en';
  const form = document.querySelector('[data-archive-tools]');
  if (form) {
    const input = form.querySelector('input');
    const select = form.querySelector('select');
    const cards = [...document.querySelectorAll('.ix-card,.ix-hero')];
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') || '';
    if ([...select.options].some(o => o.value === params.get('category'))) select.value = params.get('category');
    function filter() {
      const words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
      let count = 0;
      for (const card of cards) {
        card.hidden = !!(select.value && card.dataset.category !== select.value) || !words.every(w => normalize(card.textContent).includes(w));
        if (!card.hidden) count++;
      }
      form.querySelector('[role="status"]').textContent = count + (en ? ' articles' : ' artigos');
      document.querySelector('.ix-empty').hidden = count !== 0;
      const url = new URL(location.href);
      for (const [key,value] of [['q',input.value.trim()],['category',select.value]]) {
        if (value) url.searchParams.set(key,value); else url.searchParams.delete(key);
      }
      history.replaceState(null,'',url);
    }
    form.addEventListener('submit',e => { e.preventDefault(); filter(); });
    input.addEventListener('input',filter); select.addEventListener('change',filter); filter();
  }
  const body = document.querySelector('.blarticle__body');
  if (body) {
    const headings = [...body.querySelectorAll('h3')];
    if (headings.length > 1) {
      const toc = document.createElement('details'); toc.className = 'article-toc';
      const summary = document.createElement('summary'); summary.textContent = en ? 'In this article' : 'Neste artigo';
      const list = document.createElement('ol');
      headings.forEach((h,i) => {
        h.id = h.id || 'section-'+(i+1);
        const li = document.createElement('li'); const a = document.createElement('a');
        a.href = '#'+h.id; a.textContent = h.textContent; li.append(a); list.append(li);
      });
      toc.append(summary,list); body.before(toc);
    }
    const progress = document.createElement('div'); progress.className = 'article-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
    let pending = false;
    function update() { pending = false; const r = body.getBoundingClientRect(); progress.style.transform = `scaleX(${Math.max(0,Math.min(1,(innerHeight-r.top)/Math.max(r.height,1)))})`; }
    addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});
    addEventListener('resize',update); update();
  }
  // Keep the mobile dialog keyboard focus inside its visible controls.
  document.addEventListener('keydown',e=>{
    const menu=document.getElementById('nav-mobile-menu');
    if(e.key!=='Tab'||!menu?.classList.contains('is-open'))return;
    const controls=[document.querySelector('.nav__burger'),...menu.querySelectorAll('a,button')].filter(Boolean);
    const first=controls[0],last=controls.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
})();
