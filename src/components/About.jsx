import { useState, useEffect } from 'react'

const FALLBACK = {
  tag: 'La nostra storia',
  h2: 'Non è solo un nome,\nè una promessa.',
  lead: '"Gusti Tipici Mediterranei" racchiude l\'identità di un territorio ricco, vocato e generoso, dove clima, tradizione e cultura agricola si incontrano.',
  p1: "Per il consumatore significa riconoscere sapori autentici, naturali e familiari. Per il mercato, rappresenta un sistema affidabile che valorizza origine, qualità e continuità dell'offerta.",
  p2: "GUTIME nasce dall'unione di 18 aziende accomunate da una visione: portare sulle tavole prodotti ortofrutticoli di qualità, sostenibili e tracciabili, espressione autentica del Sud Italia.",
  imgSrc: '/agrumi-home.jpg',
  imgAlt: 'Arance e agrumi tipici mediterranei',
}

export default function About() {
  const [d, setD] = useState(FALLBACK)

  useEffect(() => {
    fetch('/api/content/home')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.about) setD(data.about) })
      .catch(() => {})
  }, [])

  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-img">
          <img src={d.imgSrc} alt={d.imgAlt} />
        </div>
        <div className="about-text">
          <div className="deco">
            <span className="dot" style={{ background: 'var(--yellow)' }} />
            <span className="dot" style={{ background: 'var(--red)' }} />
            <span className="dot" style={{ background: 'var(--green)' }} />
          </div>
          <span className="section-tag">{d.tag}</span>
          <h2>{d.h2.split('\n').map((line, i, arr) => i < arr.length - 1 ? <span key={i}>{line}<br /></span> : <span key={i}>{line}</span>)}</h2>
          <div className="divider" />
          <p className="lead">{d.lead}</p>
          <p>{d.p1}</p>
          <p>{d.p2}</p>
        </div>
      </div>
    </section>
  )
}
