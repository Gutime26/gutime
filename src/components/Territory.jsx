import { useState, useEffect } from 'react'

const FALLBACK = {
  tag: 'Il territorio',
  h2: 'Le radici del gusto mediterraneo',
  p1: 'Clima mite, terreni fertili, secoli di tradizione agricola: il Sud Italia è uno dei comprensori ortofrutticoli più vocati del Mediterraneo. GUTIME nasce esattamente qui, valorizzando ogni singola realtà produttiva.',
  p2: 'Dalle piane di agrumi ai campi di ortaggi, ogni prodotto porta con sé la storia di chi lo ha coltivato e la ricchezza del territorio che lo ha generato.',
  pills: ['Sud Italia', 'Agricoltura sostenibile', 'Clima mediterraneo', 'Tradizione', 'Filiera corta'],
  imgSrc: '/aranceti-home.jpg',
  imgAlt: 'Campi agricoli del Sud Italia',
}

export default function Territory() {
  const [d, setD] = useState(FALLBACK)

  useEffect(() => {
    fetch('/api/content/home')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.territory) setD(data.territory) })
      .catch(() => {})
  }, [])

  return (
    <section className="territory" id="territorio">
      <div className="territory-inner">
        <div className="territory-text">
          <div className="deco">
            <span className="dot" style={{ background: 'var(--green)' }} />
            <span className="dot" style={{ background: 'var(--yellow)' }} />
            <span className="dot" style={{ background: 'var(--red)' }} />
          </div>
          <span className="section-tag">{d.tag}</span>
          <h2>{d.h2}</h2>
          <div className="divider" style={{ background: 'var(--green)' }} />
          <p>{d.p1}</p>
          <p>{d.p2}</p>
          <div className="pill-list">
            {d.pills.map((p) => <span key={p}>{p}</span>)}
          </div>
        </div>
        <div className="territory-img">
          <img src={d.imgSrc} alt={d.imgAlt} />
        </div>
      </div>
    </section>
  )
}
