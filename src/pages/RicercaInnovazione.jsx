import PageHero from '../components/PageHero'
import AziendaCard from '../components/AziendaCard'
import { ricercaInnovazione } from '../data/aziende'

export default function RicercaInnovazione() {
  return (
    <>
      <PageHero
        tag="Ricerca e innovazione"
        title="Il motore tecnologico della filiera"
        subtitle="Centri di ricerca e innovazione che supportano lo sviluppo sostenibile e la crescita tecnologica di GUTIME."
        img="/images/hero-ricerca.jpg"
        breadcrumb={[
          { label: 'Le aziende', to: '/le-aziende' },
          { label: 'Ricerca e innovazione' },
        ]}
      />

      <section className="page-section">
        <div className="page-section__inner">
          <div className="sottosezione-intro">
            <span className="section-tag">Innovazione</span>
            <h2>Tecnologia al servizio della filiera</h2>
            <p className="lead">
              La componente di ricerca e innovazione garantisce che la filiera GUTIME sia sempre
              allineata alle frontiere tecnologiche, dai processi produttivi alla sostenibilità ambientale.
            </p>
          </div>
          <div className="aziende-grid aziende-grid--centered">
            {ricercaInnovazione.map((a) => (
              <AziendaCard key={a.nome} azienda={a} accent="var(--green)" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
