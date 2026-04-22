import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { impegniAmbientali } from '../data/qualita'

const obiettivi = [
  { val: '−30%', label: 'Riduzione sprechi produttivi' },
  { val: 'ISO 14001', label: 'Gestione ambientale certificata' },
  { val: 'Farm to Fork', label: 'Allineamento strategia EU' },
  { val: '100%', label: 'Tracciabilità di filiera' },
]

export default function ImpegnoAmbientale() {
  return (
    <>
      <PageHero
        tag="Impegno ambientale"
        title="Produrre bene, rispettando la terra"
        subtitle="La sostenibilità non è un accessorio della filiera GUTIME: è il fondamento su cui si basa ogni scelta produttiva."
        img="/images/hero-le-aziende.jpg"
        breadcrumb={[
          { label: 'Qualità e sostenibilità', to: '/qualita-sostenibilita' },
          { label: 'Impegno ambientale' },
        ]}
      />

      {/* intro */}
      <section className="page-section">
        <div className="page-section__inner ia-intro">
          <div className="ia-intro__text">
            <span className="section-tag">Sostenibilità</span>
            <h2>Un modello agricolo responsabile</h2>
            <div className="divider" />
            <p className="lead">
              Crediamo che produrre bene significhi anche produrre in modo rispettoso: per la terra,
              per le comunità locali e per le generazioni future.
            </p>
            <p>
              La filiera GUTIME adotta pratiche agricole e gestionali orientate alla riduzione
              dell'impatto ambientale, in piena coerenza con la strategia europea Farm to Fork e con
              gli obiettivi del Green Deal.
            </p>
            <p>
              Ogni azienda della filiera contribuisce a questo impegno collettivo, integrando la
              sostenibilità nei propri processi produttivi e nella propria cultura aziendale.
            </p>
          </div>
          <div className="ia-intro__numeri">
            {obiettivi.map((o) => (
              <div className="ia-num" key={o.label}>
                <div className="ia-num__val">{o.val}</div>
                <div className="ia-num__label">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* impegni */}
      <section className="page-section" style={{ background: 'var(--off)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="page-section__inner">
          <div className="sottosezione-intro">
            <span className="section-tag">Le nostre azioni</span>
            <h2>Sei impegni concreti</h2>
          </div>
          <div className="ia-grid">
            {impegniAmbientali.map((item) => (
              <div className="ia-card" key={item.titolo}>
                <span className="ia-card__icon">{item.icon}</span>
                <h3>{item.titolo}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* iso + farm to fork */}
      <section className="ia-eu">
        <div className="ia-eu__inner">
          <div className="ia-eu__badge">
            <span className="ia-eu__badge-icon">🇪🇺</span>
            <div>
              <div className="ia-eu__badge-label">Allineata a</div>
              <div className="ia-eu__badge-title">Strategia Farm to Fork</div>
              <div className="ia-eu__badge-sub">European Green Deal</div>
            </div>
          </div>
          <div className="ia-eu__text">
            <h3>Sostenibilità come opportunità</h3>
            <p>
              La Farm to Fork non è solo un obbligo normativo: è una visione che trasforma la
              sostenibilità in vantaggio competitivo, costruendo fiducia con consumatori e mercati.
            </p>
            <p>
              GUTIME abbraccia questa visione come parte integrante della propria identità,
              certificando il proprio impegno con standard internazionali come l'<strong>ISO 14001</strong> e le
              buone pratiche agricole riconosciute da <strong>GLOBALG.A.P.</strong>
            </p>
            <Link to="/qualita-sostenibilita/certificazioni" className="btn btn-primary" style={{ marginTop: '1.4rem', display: 'inline-block' }}>
              Vedi le certificazioni →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
