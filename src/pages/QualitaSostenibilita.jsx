import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { filiераSteps } from '../data/qualita'

export default function QualitaSostenibilita() {
  return (
    <>
      <PageHero
        tag="Qualità e sostenibilità"
        title="Un percorso chiaro, controllato, senza interruzioni"
        subtitle="La filiera GUTIME accompagna ogni prodotto dalla terra alla tavola, garantendo qualità in ogni fase."
        img="/images/hero-qualita.jpg"
        breadcrumb={[{ label: 'Qualità e sostenibilità' }]}
      />

      {/* sottopagine nav */}
      <div className="qs-subnav">
        <Link to="/qualita-sostenibilita/certificazioni" className="qs-subnav__item qs-subnav__item--yellow">
          <span>🏅</span> Certificazioni
        </Link>
        <Link to="/qualita-sostenibilita/impegno-ambientale" className="qs-subnav__item qs-subnav__item--green">
          <span>🌿</span> Impegno ambientale
        </Link>
      </div>

      {/* filiera steps */}
      <section className="page-section">
        <div className="page-section__inner">
          <div className="sottosezione-intro">
            <span className="section-tag">La filiera</span>
            <h2>Sei fasi, un'unica responsabilità</h2>
            <p className="lead">
              Ogni passaggio è presidiato, tracciato e certificato. Dalla coltivazione al consumatore,
              nulla è lasciato al caso.
            </p>
          </div>
          <div className="qs-steps">
            {filiераSteps.map((s) => (
              <div className="qs-step" key={s.num}>
                <div className="qs-step__num">{s.num}</div>
                <div className="qs-step__icon">{s.icon}</div>
                <div className="qs-step__body">
                  <h3>{s.titolo}</h3>
                  <p>{s.desc}</p>
                  <span className="qs-step__valore">{s.valore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* farm to fork */}
      <section className="qs-ftf">
        <div className="qs-ftf__inner">
          <div className="qs-ftf__text">
            <span className="section-tag" style={{ color: 'var(--yellow)' }}>Visione europea</span>
            <h2>Un impegno in linea con l'Europa</h2>
            <p>
              GUTIME si inserisce nel percorso tracciato dalla strategia europea <strong>Farm to Fork</strong>,
              che promuove un sistema alimentare più equo, sano e sostenibile.
            </p>
            <ul className="qs-ftf__list">
              <li>Ridurre gli sprechi lungo la filiera</li>
              <li>Migliorare la qualità degli alimenti</li>
              <li>Garantire un giusto equilibrio tra produzione e ambiente</li>
            </ul>
          </div>
          <div className="qs-ftf__cards">
            <Link to="/qualita-sostenibilita/certificazioni" className="qs-ftf__card qs-ftf__card--yellow">
              <span className="qs-ftf__card-icon">🏅</span>
              <h3>Certificazioni</h3>
              <p>Standard riconosciuti a livello nazionale e internazionale.</p>
              <span className="qs-ftf__card-cta">Scopri →</span>
            </Link>
            <Link to="/qualita-sostenibilita/impegno-ambientale" className="qs-ftf__card qs-ftf__card--green">
              <span className="qs-ftf__card-icon">🌿</span>
              <h3>Impegno ambientale</h3>
              <p>Azioni concrete per un'agricoltura più sostenibile.</p>
              <span className="qs-ftf__card-cta">Scopri →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* claim finale */}
      <section className="qs-claim">
        <p>GUTIME – Gusti Tipici Mediterranei</p>
        <h2>Non è solo un percorso produttivo.<br />È un impegno che arriva fino a te.</h2>
      </section>
    </>
  )
}
