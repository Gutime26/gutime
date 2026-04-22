const pills = ['Sud Italia', 'Agricoltura sostenibile', 'Clima mediterraneo', 'Tradizione', 'Filiera corta']

export default function Territory() {
  return (
    <section className="territory" id="territorio">
      <div className="territory-inner">
        <div className="territory-text">
          <div className="deco">
            <span className="dot" style={{ background: 'var(--green)' }} />
            <span className="dot" style={{ background: 'var(--yellow)' }} />
            <span className="dot" style={{ background: 'var(--red)' }} />
          </div>
          <span className="section-tag">Il territorio</span>
          <h2>Le radici del gusto mediterraneo</h2>
          <div className="divider" style={{ background: 'var(--green)' }} />
          <p>
            Clima mite, terreni fertili, secoli di tradizione agricola: il Sud Italia è uno dei
            comprensori ortofrutticoli più vocati del Mediterraneo. GUTIME nasce esattamente qui,
            valorizzando ogni singola realtà produttiva.
          </p>
          <p>
            Dalle piane di agrumi ai campi di ortaggi, ogni prodotto porta con sé la storia di chi
            lo ha coltivato e la ricchezza del territorio che lo ha generato.
          </p>
          <div className="pill-list">
            {pills.map((p) => <span key={p}>{p}</span>)}
          </div>
        </div>
        <div className="territory-img">
          <img
            src="/aranceti-home.jpg"
            alt="Campi agricoli del Sud Italia"
          />
        </div>
      </div>
    </section>
  )
}
