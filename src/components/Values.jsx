import { useState, useEffect } from 'react'

const FALLBACK = {
  tag: 'I nostri valori',
  h2: 'Perché scegliere GUTIME',
  cards: [
    { icon: '🌿', title: 'Sostenibilità', text: "Pratiche agricole rispettose dell'ambiente e delle risorse naturali del territorio mediterraneo." },
    { icon: '📍', title: 'Tracciabilità',  text: "Ogni prodotto ha un'origine certificata e verificabile, dalla terra alla tua tavola." },
    { icon: '🤝', title: 'Filiera Unita',  text: '18 aziende che condividono valori, metodi e obiettivi per garantire qualità e continuità.' },
    { icon: '🍊', title: 'Autenticità',    text: 'Sapori veri, genuini, frutto di clima, tradizione e passione agricola del Sud Italia.' },
  ],
}

export default function Values() {
  const [d, setD] = useState(FALLBACK)

  useEffect(() => {
    fetch('/api/content/home')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.values) setD(data.values) })
      .catch(() => {})
  }, [])

  return (
    <section className="values">
      <div className="values-head">
        <span className="section-tag">{d.tag}</span>
        <h2>{d.h2}</h2>
      </div>
      <div className="cards">
        {d.cards.map((card) => (
          <div className="card" key={card.title}>
            <span className="card-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
