const cards = [
  { icon: '🌿', title: 'Sostenibilità', text: 'Pratiche agricole rispettose dell\'ambiente e delle risorse naturali del territorio mediterraneo.' },
  { icon: '📍', title: 'Tracciabilità',  text: 'Ogni prodotto ha un\'origine certificata e verificabile, dalla terra alla tua tavola.' },
  { icon: '🤝', title: 'Filiera Unita',  text: '18 aziende che condividono valori, metodi e obiettivi per garantire qualità e continuità.' },
  { icon: '🍊', title: 'Autenticità',    text: 'Sapori veri, genuini, frutto di clima, tradizione e passione agricola del Sud Italia.' },
]

export default function Values() {
  return (
    <section className="values">
      <div className="values-head">
        <span className="section-tag">I nostri valori</span>
        <h2>Perché scegliere GUTIME</h2>
      </div>
      <div className="cards">
        {cards.map((card) => (
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
