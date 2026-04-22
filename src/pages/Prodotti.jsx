import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { prodotti, garanzie } from '../data/prodotti'

function ProdottoSection({ prodotto, reverse }) {
  return (
    <div className={`prod-section ${reverse ? 'prod-section--reverse' : ''}`} id={prodotto.id}>
      <div className="prod-section__img">
        <img src={prodotto.img} alt={prodotto.alt} />
        <span className="prod-section__tag" style={{ background: prodotto.tagColor, color: prodotto.tagColor === 'var(--yellow)' ? 'var(--brown)' : '#fff' }}>
          {prodotto.tag}
        </span>
      </div>
      <div className="prod-section__text">
        <h2>{prodotto.nome}</h2>
        <div className="divider" style={{ background: prodotto.tagColor }} />
        <p className="lead">{prodotto.intro}</p>
        <p>{prodotto.corpo}</p>
        <div className="prod-lista">
          <div className="prod-lista__titolo">{prodotto.listaTitolo}</div>
          <ul>
            {prodotto.lista.map((v) => (
              <li key={v}>
                <span className="prod-lista__dot" style={{ background: prodotto.tagColor }} />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Prodotti() {
  return (
    <>
      <PageHero
        tag="La nostra offerta"
        title="I nostri prodotti"
        subtitle="In ogni prodotto GUTIME vive l'identità del Mediterraneo. Qualità, freschezza e tracciabilità dalla filiera alla tua tavola."
        img="/images/hero-prodotti.jpg"
        breadcrumb={[{ label: 'Prodotti' }]}
      />

      {/* nav interna */}
      <div className="prod-subnav">
        {prodotti.map((p) => (
          <a key={p.id} href={`#${p.id}`} className="prod-subnav__item" style={{ '--c': p.tagColor }}>
            {p.nome}
          </a>
        ))}
      </div>

      {/* intro */}
      <section className="page-section" style={{ paddingBottom: '2rem' }}>
        <div className="page-section__inner">
          <p className="lead" style={{ maxWidth: 760 }}>
            Clementine, arance, pesche e ortaggi nascono all'interno di una filiera che segue ogni fase
            del percorso: dalla coltivazione alla trasformazione, fino alla distribuzione.
            Prodotti diversi, un'unica promessa: qualità, freschezza e tracciabilità.
          </p>
        </div>
      </section>

      {/* sezioni prodotto */}
      <section className="page-section prod-list">
        <div className="page-section__inner">
          {prodotti.map((p, i) => (
            <ProdottoSection key={p.id} prodotto={p} reverse={i % 2 !== 0} />
          ))}
        </div>
      </section>

      {/* dal campo alla tavola */}
      <section className="prod-filiera">
        <div className="prod-filiera__inner">
          <div className="prod-filiera__text">
            <span className="section-tag" style={{ color: 'var(--yellow)' }}>Dal campo alla tavola</span>
            <h2>Una filiera integrata</h2>
            <p>
              Ogni prodotto GUTIME nasce all'interno di una filiera in cui produzione,
              trasformazione e commercializzazione sono connesse tra loro.
            </p>
            <p>
              Per il consumatore significa poter scegliere prodotti di cui conosce l'origine e il
              percorso. Per il mercato significa contare su una filiera affidabile, organizzata e
              orientata alla qualità.
            </p>
            <Link to="/le-aziende" className="btn btn-primary" style={{ marginTop: '1.6rem', display: 'inline-block' }}>
              Scopri la nostra filiera →
            </Link>
          </div>
          <div className="prod-filiera__garanzie">
            {garanzie.map((g) => (
              <div className="prod-filiera__item" key={g.label}>
                <span className="prod-filiera__icon">{g.icon}</span>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
