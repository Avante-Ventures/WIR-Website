import React, { useId } from 'react';

// Abstract capability illustrations: no customer data or simulated product results.
export function SolutionArt({ kind = 'SS', compact = false }) {
  const id = 'solution-' + useId().replace(/:/g, '');
  const underwriting = kind === 'UI';
  const analytics = kind === 'analytics';
  return <div className={'solution-art' + (compact ? ' solution-art--compact' : '')} aria-hidden="true">
    <svg viewBox="0 0 560 340" fill="none">
      <defs>
        <linearGradient id={id} x1="80" y1="70" x2="440" y2="280" gradientUnits="userSpaceOnUse"><stop stopColor="#e3d7ff" stopOpacity=".65"/><stop offset=".45" stopColor="#8e73ff" stopOpacity=".2"/><stop offset="1" stopColor="#4938db" stopOpacity=".08"/></linearGradient>
        <linearGradient id={id+'line'}><stop stopColor="#ffc47c"/><stop offset="1" stopColor="#ad9aff"/></linearGradient>
        <radialGradient id={id+'halo'}><stop stopColor="#8370ff" stopOpacity=".28"/><stop offset="1" stopColor="#8370ff" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="290" cy="195" rx="260" ry="140" fill={'url(#'+id+'halo)'}/>
      {[0,1,2,3].map(i=><path key={i} d={`M20 ${255+i*8} C180 ${310-i*25} 200 ${90+i*35} 540 ${115+i*25}`} stroke={'url(#'+id+'line)'} opacity={.7-i*.12}/>) }
      {analytics ? <>
        {[2,1,0].map(i=><g key={i} transform={`translate(${i*25} ${-i*18})`} opacity={1-i*.25}><path d="M130 108L389 70L421 254L161 293Z" fill={'url(#'+id+')'} stroke="#b8a7ff"/><path d="M147 131L395 95" stroke="#d6c5ff" opacity=".5"/>{[40,67,56,90,118].map((h,j)=><path key={j} d={`M${183+j*40} ${256-j*6}v-${h}l20 -3v${h}z`} fill={'url(#'+id+')'} stroke="#beacff"/>)}</g>)}
      </> : underwriting ? <>
        {[2,1,0].map(i=><g key={i} transform={`translate(${i*57} ${-i*17})`}><path d="M139 94L263 137V297L139 253Z" fill={'url(#'+id+')'} stroke="#cbbbff"/><path d="M155 119L247 151M155 135L216 157" stroke="#d5c9ff" opacity=".6"/></g>)}
        <path d="M60 217L207 261L385 208L498 171" stroke="#ffd19a" strokeWidth="2"/>
        {[ [115,233],[238,252],[351,218],[466,182] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="#ffc783" stroke="#ffe2c1"/>)}
      </> : <>
        {[2,1,0].map(i=><path key={i} d={`M280 ${66+i*48}L428 ${131+i*48}L280 ${197+i*48}L133 ${131+i*48}Z`} fill={'url(#'+id+')'} stroke="#c8b5ff"/>)}
        <path d="M77 247L162 220L279 247L407 191L481 125" stroke="#ffd19a" strokeWidth="2"/>
        {[[77,247],[162,220],[279,247],[407,191],[481,125]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="12" fill="#f8ad39" opacity=".09"/><circle cx={x} cy={y} r="4" fill="#ffcc8b"/></g>)}
      </>}
    </svg>
  </div>;
}
