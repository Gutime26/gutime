export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-img">
          <img
            src="/agrumi-home.jpg"
            alt="Arance e agrumi tipici mediterranei"
          />
        </div>
        <div className="about-text">
          <div className="deco">
            <span className="dot" style={{ background: 'var(--yellow)' }} />
            <span className="dot" style={{ background: 'var(--red)' }} />
            <span className="dot" style={{ background: 'var(--green)' }} />
          </div>
          <span className="section-tag">La nostra storia</span>
          <h2>Non è solo un nome,<br />è una promessa.</h2>
          <div className="divider" />
          <p className="lead">
            "Gusti Tipici Mediterranei" racchiude l'identità di un territorio ricco, vocato e generoso,
            dove clima, tradizione e cultura agricola si incontrano.
          </p>
          <p>
            Per il consumatore significa riconoscere sapori autentici, naturali e familiari.
            Per il mercato, rappresenta un sistema affidabile che valorizza origine, qualità e
            continuità dell'offerta.
          </p>
          <p>
            GUTIME nasce dall'unione di 18 aziende accomunate da una visione: portare sulle tavole
            prodotti ortofrutticoli di qualità, sostenibili e tracciabili, espressione autentica del
            Sud Italia.
          </p>
        </div>
      </div>
    </section>
  )
}
