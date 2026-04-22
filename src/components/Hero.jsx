export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-tag">Gusti Tipici Mediterranei</span>
        <h1>La filiera che <span className="accent">unisce la terra</span>, crea valore, arriva a te.</h1>
        <p>18 aziende, un'unica visione: qualità, sostenibilità e tracciabilità dal Sud Italia.</p>
        <a href="#about" className="btn btn-primary">Scopri la filiera</a>
        <a href="#prodotti" className="btn btn-outline">I nostri prodotti</a>
      </div>
    </section>
  )
}
