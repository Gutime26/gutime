const products = [
  {
    img:  '/images/prod-arance.jpg',
    alt:  'Arance del Sud Italia',
    pill: 'Agrumi',
    name: 'Arance',
    desc: 'Succose e profumate, coltura tipica delle pianure meridionali.',
  },
  {
    img:  '/images/prod-clementine.jpg',
    alt:  'Clementine mediterranee',
    pill: 'Agrumi',
    name: 'Clementine',
    desc: 'IGP, dolci e senza semi: il gusto del Mediterraneo in ogni spicchio.',
  },
  {
    img:  '/images/prod-ortaggi.jpg',
    alt:  'Ortaggi freschi del Sud Italia',
    pill: 'Ortaggi',
    name: 'Ortaggi Freschi',
    desc: 'Colori, sapori e varietà autentiche coltivate con cura e passione.',
  },
]

export default function Products() {
  return (
    <section className="products" id="prodotti">
      <div className="products-head">
        <span className="section-tag">La nostra offerta</span>
        <h2>I prodotti GUTIME</h2>
        <p className="lead">
          Ortofrutticoli di qualità selezionati dalle migliori terre del Sud Italia,
          espressione autentica del clima e della tradizione mediterranea.
        </p>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.name}>
            <img src={p.img} alt={p.alt} />
            <div className="overlay">
              <span className="pill">{p.pill}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
