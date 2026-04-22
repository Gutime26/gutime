import PageHero from '../components/PageHero'
import AziendaCard from '../components/AziendaCard'
import { produzionePrimaria } from '../data/aziende'

export default function ProduzionePrimaria() {
  return (
    <>
      <PageHero
        tag="Produzione primaria"
        title="Cuore agricolo della filiera"
        subtitle="Dove nascono i prodotti: 11 aziende che coltivano con tradizione, cura e rispetto per il territorio mediterraneo."
        img="/images/hero-produzione-primaria.jpg"
        breadcrumb={[
          { label: 'Le aziende', to: '/le-aziende' },
          { label: 'Produzione primaria' },
        ]}
      />

      <section className="page-section">
        <div className="page-section__inner">
          <div className="sottosezione-intro">
            <span className="section-tag">11 aziende</span>
            <h2>Dalla terra al prodotto</h2>
            <p className="lead">
              La produzione primaria è il fondamento della filiera GUTIME: agrumeti, orti e campi
              coltivati con competenza nelle terre più vocate del Mezzogiorno d'Italia.
            </p>
          </div>
          <div className="aziende-grid">
            {produzionePrimaria.map((a) => (
              <AziendaCard key={a.nome} azienda={a} accent="var(--yellow)" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
