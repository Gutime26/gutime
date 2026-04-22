import PageHero from '../components/PageHero'
import AziendaCard from '../components/AziendaCard'
import { trasformazioneCommercializzazione } from '../data/aziende'

export default function TrasformazioneCommercializzazione() {
  return (
    <>
      <PageHero
        tag="Trasformazione e commercializzazione"
        title="Il cuore industriale e commerciale"
        subtitle="Cooperative e strutture che lavorano, valorizzano e portano i prodotti della filiera fino al mercato."
        img="/images/hero-trasformazione.jpg"
        breadcrumb={[
          { label: 'Le aziende', to: '/le-aziende' },
          { label: 'Trasformazione e commercializzazione' },
        ]}
      />

      <section className="page-section">
        <div className="page-section__inner">
          <div className="sottosezione-intro">
            <span className="section-tag">5 realtà</span>
            <h2>Dal campo al mercato</h2>
            <p className="lead">
              La fase di lavorazione e distribuzione garantisce continuità, efficienza e qualità
              costante lungo tutta la catena del valore, con Rheaura OP come soggetto coordinatore.
            </p>
          </div>
          <div className="aziende-grid">
            {trasformazioneCommercializzazione.map((a) => (
              <AziendaCard key={a.nome} azienda={a} accent="var(--red)" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
