export const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const smooth = n => (n = clamp(n), n * n * (3 - 2 * n));
const range = (p, a, b) => smooth((p - a) / (b - a));
export function emailPose(p) {
  p = clamp(p);
  return { arrival: range(p, 0, .1), open: range(p, .16, .39), fields: range(p, .36, .53), missing: range(p, .53, .65), reply: range(p, .70, .90) };
}
export const stepProgress = [.12, .51, .67, 1];
export function makeEmailStage(host) {
  host.innerHTML = `<div class="email-camera"><div class="email-world">
    <div class="waiting-mail waiting-one" aria-hidden="true"><span>✉</span></div><div class="waiting-mail waiting-two" aria-hidden="true"><span>✉</span></div>
    <div class="envelope-back" aria-hidden="true"></div><div class="envelope-flap" aria-hidden="true"></div>
    <article class="mail-object"><div class="mail-topbar"><span class="tiny-envelope">✉</span><span>SOLICITAÇÃO RECEBIDA</span><span class="mail-dots">···</span></div><div class="mail-sender"><span class="sender-avatar">C</span><div><b>Corretora</b><small>para equipe de subscrição</small></div><span class="mail-clock">agora</span></div><h3>Solicitação de cotação</h3><p>Olá, equipe.<br>Podem avaliar o seguro desta carga?</p><div class="mail-source"><span>Operação <b>Transporte de carga</b></span><span>Valor da carga <b class="missing-value">Não informado</b></span></div><span class="mail-id">SEGURO DE TRANSPORTES <i>↗</i></span></article>
    <div class="envelope-front" aria-hidden="true"><span>✉</span><b>Uma nova solicitação</b></div>
    <div class="reading-line" aria-hidden="true"></div>
    <div class="data-card operation"><span class="data-symbol">↗</span><small>OPERAÇÃO</small><b>Transporte<br>de carga</b><span class="data-state">Identificada <i>✓</i></span></div>
    <div class="data-card risk"><span class="data-symbol">◇</span><small>RISCO</small><b>Análise<br>pendente</b><span class="data-state">Aguardando dados</span></div>
    <div class="data-card missing"><span class="data-symbol">!</span><small>INFORMAÇÃO PENDENTE</small><b>Valor<br>da carga</b><span class="data-state">Não informado</span></div>
    <div class="missing-callout"><span>!</span> Falta o valor da carga.</div>
    <article class="reply-object"><div class="reply-topbar"><img src="logo-blue.svg" alt="WIR" width="43"><span>RESPOSTA PREPARADA</span><span class="reply-check">✓</span></div><small class="reply-to">Para: Corretora</small><h3>Re: Solicitação de cotação</h3><p>Olá! Para seguir com a análise,<br>pode informar o <strong>valor da carga?</strong></p><div class="reply-footer"><span><i></i> Pronta para sua revisão</span><span>↗</span></div></article>
    <div class="final-connector" aria-hidden="true"></div><div class="final-label">PRÓXIMO PASSO DEFINIDO <span>✓</span></div>
  </div></div>`;
  const world = host.querySelector('.email-world');
  const nodes = Object.fromEntries(['mail-object','envelope-back','envelope-flap','envelope-front','reading-line','missing-callout','reply-object','final-connector','final-label','waiting-one','waiting-two'].map(c => [c, host.querySelector('.' + c)]));
  const fields = [...host.querySelectorAll('.data-card')];
  const resize = new ResizeObserver(([entry]) => {
    host.style.setProperty('--stage-scale', String(Math.min(entry.contentRect.width / 660, entry.contentRect.height / 600)));
  });
  resize.observe(host);
  function update(progress) {
    const {arrival:a, open:o, fields:f, missing:m, reply:r} = emailPose(progress);
    host.dataset.phase = r > .5 ? 'reply' : m > .5 ? 'missing' : f > .5 ? 'fields' : 'arrival';
    world.style.transform = `rotateX(${5 - o * 5}deg) rotateY(${-15 + o * 12 + r * 3}deg)`;
    nodes['mail-object'].style.transform = `translate3d(${-r*110}px,${(1-a)*-40-o*60-r*35}px,${40+o*70-r*135}px) rotateZ(${-3+o*3-r*5}deg) scale(${1-r*.24})`;
    nodes['mail-object'].style.opacity = String(1-r*.63);
    for (const name of ['envelope-back','envelope-front']) {
      nodes[name].style.transform = `translate3d(0,${o*120}px,${name==='envelope-front'?90:0}px)`;
      nodes[name].style.opacity = String(1-o);
    }
    nodes['envelope-flap'].style.transform = `translate3d(0,${o*120}px,1px) rotateX(${-o*175}deg)`;
    nodes['envelope-flap'].style.opacity = String(1-o);
    nodes['reading-line'].style.transform = `translate3d(0,${f*320}px,150px)`;
    nodes['reading-line'].style.opacity = String(range(progress,.31,.36)*(1-range(progress,.48,.54)));
    fields.forEach((el,i)=>{
      const emerge=range(progress,.35+i*.025,.48+i*.025);
      el.style.transform = `translate3d(${(1-emerge)*(1-i)*140}px,${(1-emerge)*-110-r*15}px,${150+emerge*30+(i===2?m*25:0)}px) rotateY(${(1-emerge)*-15}deg) scale(${.85+emerge*.15})`;
      el.style.opacity = String(emerge*(1-r));
    });
    nodes['missing-callout'].style.opacity = String(m*(1-r));
    nodes['missing-callout'].style.transform = `translate3d(0,${(1-m)*15}px,220px)`;
    nodes['reply-object'].style.transform = `translate3d(${(1-r)*25}px,${(1-r)*115}px,${180+r*40}px) rotateX(${(1-r)*-20}deg)`;
    nodes['reply-object'].style.opacity = String(r);
    nodes['final-connector'].style.opacity = String(r);
    nodes['final-label'].style.opacity = String(r);
    for (const [i,name] of ['waiting-one','waiting-two'].entries()) {
      nodes[name].style.opacity = String((1-o)*.28);
      nodes[name].style.transform = `translate3d(${(1-a)*40}px,${(1-a)*-35}px,${-100-i*80}px) rotateZ(${i?12:-12}deg)`;
    }
  }
  update(0);
  return { update, dispose:()=>resize.disconnect() };
}
