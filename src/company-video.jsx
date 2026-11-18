import React, { useEffect, useRef, useState } from 'react';
import { LANG } from './i18n.js';
import './styles/company-video.css';

const SOURCE = '/assets/video/wir-introduction.mp4';
const POSTER = '/assets/video/wir-introduction-poster.jpg';
const COPY = {
  pt: {
    watch: 'Assistir ao vídeo', title: 'Conheça a WIR',
    heading: 'A WIR em dois minutos.', language: 'Áudio em português',
    close: 'Fechar vídeo', fallback: 'Abrir o vídeo diretamente',
  },
  en: {
    watch: 'Watch the video', title: 'Meet WIR',
    heading: 'WIR in two minutes.', language: 'Audio in Portuguese',
    close: 'Close video', fallback: 'Open the video directly',
  },
  es: {
    watch: 'Ver el video', title: 'Conoce WIR',
    heading: 'WIR en dos minutos.', language: 'Audio en portugués',
    close: 'Cerrar video', fallback: 'Abrir el video directamente',
  },
}[LANG];

function CompanyVideo({ autoPlay = false }) {
  const video = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = video.current;
    return () => {
      el.pause();
      el.removeAttribute('src');
      el.load();
    };
  }, []);
  return <div className="company-video__player">
    <video ref={video} src={SOURCE} poster={POSTER} controls playsInline
      preload="none" autoPlay={autoPlay} width="1024" height="576"
      aria-label={`${COPY.title} — ${COPY.language}`} onError={() => setFailed(true)}>
      <a href={SOURCE}>{COPY.fallback}</a>
    </video>
    {failed && <p className="company-video__fallback" role="status"><a href={SOURCE}>{COPY.fallback}</a></p>}
  </div>;
}

export function CompanyVideoButton({ onOpen }) {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);
  const show = () => {
    onOpen?.();
    dialog.current.showModal();
    setOpen(true);
  };
  const closed = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  return <>
    <button ref={trigger} type="button" className="company-video-trigger" onClick={show}
      aria-haspopup="dialog" aria-controls="company-video-dialog">
      <span className="company-video-trigger__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
      </span>
      <span>{COPY.watch}</span><span className="company-video-trigger__duration">2:01</span>
    </button>
    <dialog ref={dialog} id="company-video-dialog" className="company-video-dialog"
      aria-labelledby="company-video-dialog-title" onClose={closed}
      onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <div className="company-video-dialog__content">
        <div className="company-video-dialog__header">
          <h2 id="company-video-dialog-title">{COPY.title}</h2>
          <button type="button" className="company-video-dialog__close" autoFocus
            onClick={() => dialog.current.close()} aria-label={COPY.close}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>
        {open && <CompanyVideo autoPlay/>}
        <p className="company-video-dialog__note">2:01 · {COPY.language}</p>
      </div>
    </dialog>
  </>;
}

export function CompanyVideoSection() {
  return <section className="company-video-section" id="wir-video" aria-labelledby="company-video-title">
    <div className="xp-wrap">
      <div className="company-video-section__header">
        <h2 className="xp-title" id="company-video-title">{COPY.heading}</h2>
        <p>2:01 · {COPY.language}</p>
      </div>
      <CompanyVideo/>
    </div>
  </section>;
}
