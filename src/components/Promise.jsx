import { useState, useEffect } from 'react'

const FALLBACK = {
  tag: 'La nostra promessa',
  h2: "Una visione, 18 aziende, un'unica identità.",
  blockquote: '"Gusti Tipici Mediterranei – la filiera che unisce la terra, crea valore, arriva a te."',
  body: 'GUTIME non è solo un marchio: è un sistema che unisce produttori, territorio e consumatori in un patto di qualità, trasparenza e rispetto per la natura.',
}

export default function Promise() {
  const [d, setD] = useState(FALLBACK)

  useEffect(() => {
    fetch('/api/content/home')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.promise) setD(data.promise) })
      .catch(() => {})
  }, [])

  return (
    <section className="promise">
      <span className="section-tag">{d.tag}</span>
      <h2>{d.h2}</h2>
      <blockquote>{d.blockquote}</blockquote>
      <p className="body">{d.body}</p>
    </section>
  )
}
