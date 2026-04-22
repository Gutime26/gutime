import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const sezioni = [
  {
    to: '/le-aziende/produzione-primaria',
    icon: '🌱',
    titolo: 'Produzione primaria',
    desc: 'Cuore agricolo della filiera: 11 aziende che coltivano i prodotti con cura, tradizione e rispetto per il territorio.',
    num: 11,
    accent: 'var(--yellow)',
    img: '/images/sez-produzione-primaria.jpg',
  },
  {
    to: '/le-aziende/trasformazione-commercializzazione',
    icon: '🏭',
    titolo: 'Trasformazione e commercializzazione',
    desc: 'Il cuore industriale e commerciale: cooperative e strutture che valorizzano, trasformano e portano i prodotti al mercato.',
    num: 5,
    accent: 'var(--red)',
    img: '/images/sez-trasformazione.jpg',
  },
  {
    to: '/le-aziende/ricerca-innovazione',
    icon: '🔬',
    titolo: 'Ricerca e innovazione',
    desc: 'Il motore tecnologico della filiera: centri di ricerca che supportano lo sviluppo sostenibile e l\'innovazione dei processi.',
    num: 1,
    accent: 'var(--green)',
    img: '/images/sez-ricerca.jpg',
  },
]

export default function LeAziende() {
  return (
    <>
      <PageHero
        tag="La filiera GUTIME"
        title="Le aziende"
        subtitle="18 realtà, un'unica visione."
        img="/images/hero-le-aziende.jpg"
        breadcrumb={[{ label: 'Le aziende' }]}
      />

      <section className="page-section">
        <div className="page-section__inner">
          <span className="section-tag">La filiera</span>
          <h2>18 realtà, un'unica visione</h2>
          <p className="lead" style={{ marginBottom: '3rem' }}>
            La filiera GUTIME è composta da aziende agricole, cooperative e organismi di ricerca
            che collaborano per garantire qualità, continuità e innovazione lungo tutto il percorso
            del prodotto. Ogni azienda rappresenta un presidio di competenza, territorio e valore,
            coordinate dalla Società Cooperativa Agricola Rheaura OP.
          </p>

          <div className="sezioni-grid">
            {sezioni.map((s) => (
              <Link to={s.to} key={s.to} className="sezione-card" style={{ '--accent': s.accent }}>
                <div className="sezione-card__img">
                  <img src={s.img} alt={s.titolo} />
                  <div className="sezione-card__img-overlay" />
                </div>
                <div className="sezione-card__body">
                  <span className="sezione-card__icon">{s.icon}</span>
                  <div className="sezione-card__num">{s.num} {s.num === 1 ? 'azienda' : 'aziende'}</div>
                  <h3>{s.titolo}</h3>
                  <p>{s.desc}</p>
                  <span className="sezione-card__cta">Scopri →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
