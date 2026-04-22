import PageHero from '../components/PageHero'
import { certificazioni } from '../data/qualita'

export default function Certificazioni() {
  return (
    <>
      <PageHero
        tag="Certificazioni"
        title="La qualità di GUTIME è certificata"
        subtitle="Standard riconosciuti a livello nazionale e internazionale che garantiscono sicurezza, tracciabilità e sostenibilità lungo tutta la filiera."
        img="/images/hero-certificazioni.jpg"
        breadcrumb={[
          { label: 'Qualità e sostenibilità', to: '/qualita-sostenibilita' },
          { label: 'Certificazioni' },
        ]}
      />

      <section className="page-section">
        <div className="page-section__inner">

          <div className="sottosezione-intro">
            <span className="section-tag">Un sistema certificato</span>
            <h2>Una garanzia concreta</h2>
            <p className="lead">
              Un impegno concreto: assicurare al consumatore e ai partner commerciali prodotti
              controllati, affidabili e conformi ai più elevati requisiti del settore agroalimentare.
            </p>
          </div>

          <div className="cert-gruppi">
            {certificazioni.map((gruppo) => (
              <div className="cert-gruppo" key={gruppo.categoria}>
                <div className="cert-gruppo__header" style={{ borderColor: gruppo.colore }}>
                  <span className="cert-gruppo__icona">{gruppo.icona}</span>
                  <h3>{gruppo.categoria}</h3>
                </div>
                <div className="cert-cards">
                  {gruppo.voci.map((v) => (
                    <div className="cert-card" key={v.nome} style={{ '--accent': gruppo.colore }}>
                      {v.logo && (
                        <div className="cert-card__logo" style={{ background: v.logoBg || '#fff' }}>
                          <img src={v.logo} alt={`Logo ${v.nome}`} />
                        </div>
                      )}
                      <div className="cert-card__body">
                        <div className="cert-card__nome">{v.nome}</div>
                        <p>{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* banner */}
      <section className="cert-banner">
        <div className="cert-banner__inner">
          <span className="cert-banner__icon">✅</span>
          <div>
            <h3>Ogni prodotto GUTIME è tracciabile e certificato</h3>
            <p>Dalla coltivazione alla distribuzione, ogni fase è presidiata da standard riconosciuti a livello internazionale.</p>
          </div>
        </div>
      </section>
    </>
  )
}
