import React, { useEffect, useRef, useState } from 'react';
import { LANG } from './i18n.js';
import { filmPhase, mayPlay, readSeen, rememberSeen } from './hero-playback.mjs';
import './styles/hero-film.css';

const COPY = {
  pt: {
    title: <>IA para<br/><em>escalar</em> o<br/>mercado<br/>segurador.</>,
    description: 'Distribuição, subscrição e inteligência operacional conectadas ao crescimento da sua operação.',
    explore: 'Explorar soluções', contact: 'Falar com a WIR',
    subjects: ['Cotação', 'Consulta', 'Acompanhamento'], labels: ['Distribuição', 'Subscrição', 'Visibilidade'],
    story: ['O trabalho chega todos os dias.', 'A informação começa a se conectar.', 'Mais capacidade para crescer.'],
    pause: 'Pausar intro', resume: 'Continuar intro', replay: 'Repetir intro', play: 'Ver intro',
    film: 'Três e-mails se conectam em fios de luz e se transformam em três cintas: distribuição, subscrição e visibilidade.', scroll: 'Conheça a WIR',
  },
  en: {
    title: <>AI to<br/><em>scale</em> the<br/>insurance<br/>market.</>,
    description: 'Distribution, underwriting, and operational intelligence connected to the growth of your operation.',
    explore: 'Explore solutions', contact: 'Talk to WIR',
    subjects: ['Quote request', 'Inquiry', 'Follow-up'], labels: ['Distribution', 'Underwriting', 'Visibility'],
    story: ['Work arrives every day.', 'Information starts to connect.', 'More capacity to grow.'],
    pause: 'Pause intro', resume: 'Resume intro', replay: 'Replay intro', play: 'Watch intro',
    film: 'Three emails connect through threads of light and become three ribbons: distribution, underwriting, and visibility.', scroll: 'Discover WIR',
  },
  es: {
    title: <>IA para<br/><em>escalar</em> el<br/>mercado<br/>asegurador.</>,
    description: 'Distribución, suscripción e inteligencia operativa conectadas al crecimiento de tu operación.',
    explore: 'Explorar soluciones', contact: 'Hablar con WIR',
    subjects: ['Cotización', 'Consulta', 'Seguimiento'], labels: ['Distribución', 'Suscripción', 'Visibilidad'],
    story: ['El trabajo llega todos los días.', 'La información empieza a conectarse.', 'Más capacidad para crecer.'],
    pause: 'Pausar intro', resume: 'Continuar intro', replay: 'Repetir intro', play: 'Ver intro',
    film: 'Tres correos se conectan mediante hilos de luz y se transforman en tres cintas: distribución, suscripción y visibilidad.', scroll: 'Conoce WIR',
  },
}[LANG];

export function Opening({ go }) {
  const hero = useRef(null), video = useRef(null), controls = useRef(null);
  const [scene, setScene] = useState('poster');
  const [phase, setPhase] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = video.current;
    el.muted = true;
    el.defaultMuted = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const source = mobile ? '/assets/scale/intro-mobile.mp4' : '/assets/scale/intro-desktop.mp4';
    let wanted = !reduced.matches && !readSeen();
    let visible = false, disposed = false, pending = false, finished = false, hasPlayed = false, showingFilm = false;
    const fallback = () => {
      if (disposed) return;
      wanted = false; pending = false; showingFilm = false; el.pause();
      setPlaying(false); setScene('poster'); setPhase(2);
    };
    const sync = () => {
      if (disposed) return;
      if (!mayPlay({ wanted, visible, hidden: document.hidden, finished })) { el.pause(); return; }
      if (pending || !el.paused) return;
      if (!el.getAttribute('src')) { el.src = source; el.load(); }
      pending = true;
      Promise.resolve(el.play()).then(() => {
        pending = false;
        if (disposed || !mayPlay({ wanted, visible, hidden: document.hidden, finished })) el.pause();
      }).catch(error => {
        pending = false;
        if (!disposed && wanted && visible && !document.hidden) fallback(error);
      });
    };
    const onPlaying = () => {
      if (disposed) return;
      hasPlayed = true; showingFilm = true; rememberSeen(); setStarted(true);
      setScene('film'); setPhase(filmPhase(el.currentTime)); setPlaying(true);
    };
    const onTime = () => { if (showingFilm) setPhase(filmPhase(el.currentTime)); };
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      finished = true; wanted = false; showingFilm = false;
      setPlaying(false); setPhase(2); setScene('ended');
    };
    const onPreference = () => { if (reduced.matches) fallback(); };
    controls.current = {
      toggle: () => {
        if (!el.paused) { wanted = false; el.pause(); }
        else {
          if (finished || !hasPlayed || el.error) {
            finished = false;
            if (el.error) el.removeAttribute('src');
            if (el.readyState > 0) el.currentTime = 0;
          }
          wanted = true; sync();
        }
      },
      replay: () => {
        finished = false; wanted = true;
        if (el.error) el.removeAttribute('src');
        if (el.readyState > 0) el.currentTime = 0;
        sync();
      },
    };
    const events = { playing: onPlaying, pause: onPause, timeupdate: onTime, ended: onEnded, error: fallback };
    Object.entries(events).forEach(([name, handler]) => el.addEventListener(name, handler));
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', onPreference);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .12 });
    observer.observe(hero.current);
    return () => {
      disposed = true; controls.current = null; observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', onPreference);
      Object.entries(events).forEach(([name, handler]) => el.removeEventListener(name, handler));
      el.pause(); el.removeAttribute('src'); el.load();
    };
  }, []);
  const inFilm = scene === 'film';
  const final = !inFilm || phase === 2;
  const label = playing ? COPY.pause : inFilm ? COPY.resume : started || readSeen() ? COPY.replay : COPY.play;
  const visit = (e, route, anchor) => { e.preventDefault(); go(route, anchor); };
  return (
    <section className={'scale-hero scale-hero--' + LANG} ref={hero} aria-labelledby="scale-title" data-scene={scene}>
      <div className="scale-hero__visual">
        <picture className="scale-hero__poster" aria-hidden="true">
          <source media="(max-width: 760px)" srcSet="/assets/scale/hero-mobile.jpg"/>
          <img src="/assets/scale/hero-final.jpg" width="1672" height="941" alt="" fetchPriority="high"/>
        </picture>
        <video ref={video} className={inFilm ? 'is-visible' : ''} muted playsInline preload="none" aria-hidden="true" tabIndex={-1}/>
        <div className={'scale-hero__subjects' + (inFilm && phase === 0 ? ' is-visible' : '')} aria-hidden="true">
          {COPY.subjects.map((subject, i) => <span key={subject} className={'subject-' + i}>{subject}</span>)}
        </div>
        <div className={'scale-hero__labels' + (final ? ' is-visible' : '')} aria-hidden="true">
          {COPY.labels.map((name, i) => <span key={name} className={'ribbon-' + i}><i/>{name}</span>)}
        </div>
      </div>
      <div className="scale-wrap scale-hero__content">
        <h1 id="scale-title">{COPY.title}</h1>
        <p className="scale-hero__description">{COPY.description}</p>
        <div className="scale-actions">
          <a className="scale-button scale-button--light" href="#home#home-capabilities" onClick={e => visit(e, 'home', 'home-capabilities')}>{COPY.explore}<span aria-hidden="true">→</span></a>
          <a className="scale-button scale-button--outline" href="#contact" onClick={e => visit(e, 'contact')}>{COPY.contact}</a>
        </div>
      </div>
      <div className="scale-wrap scale-hero__bottom">
        <a className="scale-hero__scroll" href="#home#home-capabilities" onClick={e => visit(e, 'home', 'home-capabilities')}><span aria-hidden="true">↓</span>{COPY.scroll}</a>
        <div className="scale-film-controls">
          <span className="scale-film-story">{COPY.story[phase]}</span>
          <button type="button" onClick={() => controls.current?.toggle()} aria-label={label} title={label}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span><span>{label}</span></button>
          {inFilm && <button type="button" className="scale-film-replay" onClick={() => controls.current?.replay()} aria-label={COPY.replay} title={COPY.replay}><span aria-hidden="true">↻</span></button>}
        </div>
      </div>
      <p className="scale-sr-only">{COPY.film}</p>
    </section>
  );
}
