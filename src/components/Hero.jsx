import { useState, useEffect } from 'react'

const FALLBACK = {
  tag: 'Gusti Tipici Mediterranei',
  h1Before: 'La filiera che ',
  h1Accent: 'unisce la terra',
  h1After: ', crea valore, arriva a te.',
  p: "18 aziende, un'unica visione: qualità, sostenibilità e tracciabilità dal Sud Italia.",
  btn1Label: 'Scopri la filiera', btn1Href: '#about',
  btn2Label: 'I nostri prodotti', btn2Href: '#prodotti',
}

export default function Hero() {
  const [d, setD] = useState(FALLBACK)

  useEffect(() => {
    fetch('/api/content/home')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.hero) setD(data.hero) })
      .catch(() => {})
  }, [])

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-tag">{d.tag}</span>
        <h1>{d.h1Before}<span className="accent">{d.h1Accent}</span>{d.h1After}</h1>
        <p>{d.p}</p>
        <a href={d.btn1Href} className="btn btn-primary">{d.btn1Label}</a>
        <a href={d.btn2Href} className="btn btn-outline">{d.btn2Label}</a>
      </div>
    </section>
  )
}
