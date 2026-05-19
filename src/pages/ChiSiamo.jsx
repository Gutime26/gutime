import { useState, useEffect } from 'react'
import PageHero from '../components/PageHero'

const FALLBACK_INTRO = {
  pageHeroTag: 'La nostra storia',
  pageHeroTitle: 'Nati dalla terra e dalle persone',
  pageHeroSubtitle: '18 aziende del Sud Italia che hanno scelto di unire esperienza, tradizione e visione per dare vita a una filiera ortofrutticola autentica.',
  sectionTag: 'Chi siamo',
  h2: 'GUTIME – Gusti Tipici Mediterranei',
  lead: "Nasce dalla terra e dalle persone. Dall'incontro di 18 aziende del Sud Italia che hanno scelto di unire esperienza, tradizione e visione per dare vita a una filiera ortofrutticola autentica e condivisa.",
  p1: "Una filiera è un sistema vivo: un percorso che accompagna ogni prodotto dal campo alla tavola, senza interruzioni. Coltivazione, trasformazione e distribuzione diventano parti di un'unica responsabilità. Questo significa più controllo, più trasparenza, più qualità.",
  p2: "Per il consumatore si traduce in una scelta consapevole: prodotti freschi, sicuri, tracciabili, che raccontano davvero da dove vengono.",
}

const FALLBACK_VALORI = {
  sectionTag: 'I nostri principi',
  h2: 'In cosa crediamo',
  lead: "Crediamo in un'agricoltura che rispetta la terra e le persone, in un modello che non separa qualità e sostenibilità, ma le unisce.",
  cards: [
    { icon: '🌿', titolo: 'Rispettiamo la terra', testo: "Un'agricoltura che non separa qualità e sostenibilità, ma le unisce in ogni scelta produttiva." },
    { icon: '🔍', titolo: 'Trasparenza totale', testo: 'Ogni prodotto è tracciabile dal campo alla tavola: sapere da dove viene è un diritto del consumatore.' },
    { icon: '🤝', titolo: 'Valore condiviso', testo: 'Una filiera che crea ricchezza per tutti gli attori: produttori, lavoratori e consumatori.' },
    { icon: '📜', titolo: 'Identità autentica', testo: "Custodire i sapori del Mediterraneo e trasformarli in un'esperienza genuina per chi consuma." },
  ],
}

const FALLBACK_MISSIONE = {
  sectionTag: 'La missione',
  h2: 'Un impegno chiaro',
  lead: "Offrire prodotti ortofrutticoli di qualità, garantendo sostenibilità ambientale, sicurezza alimentare e continuità dell'offerta per il mercato.",
  p1: "Un impegno che si inserisce in una visione più ampia, in linea con la strategia europea Farm to Fork, cuore dell'European Green Deal.",
  badgeLabel: 'Allineata a',
  badgeTitle: 'Strategia Farm to Fork',
  badgeSub: 'European Green Deal',
}

const FALLBACK_FTF = {
  sectionTag: 'Visione europea',
  h2: 'Dal campo alla tavola',
  lead: "La strategia Farm to Fork rappresenta un cambio di paradigma: ripensare l'intero sistema alimentare per renderlo più equo, sano e rispettoso dell'ambiente.",
  items: [
    "Ridurre l'impatto ambientale dell'agricoltura e contrastare il cambiamento climatico",
    'Proteggere la biodiversità e le risorse naturali',
    'Garantire alimenti sicuri, nutrienti e accessibili a tutti',
    'Assicurare un giusto valore economico per tutti gli attori della filiera',
    'Ridurre sprechi e inefficienze lungo tutta la catena alimentare',
  ],
  closing: "Una visione che mette al centro il consumatore, ma anche chi produce, trasformando la sostenibilità in un'opportunità concreta di sviluppo.",
}

export default function ChiSiamo() {
  const [intro, setIntro] = useState(FALLBACK_INTRO)
  const [valori, setValori] = useState(FALLBACK_VALORI)
  const [missione, setMissione] = useState(FALLBACK_MISSIONE)
  const [ftf, setFtf] = useState(FALLBACK_FTF)

  useEffect(() => {
    fetch('/api/content/chi-siamo')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return
        if (data.intro) setIntro(data.intro)
        if (data.valori) setValori(data.valori)
        if (data.missione) setMissione(data.missione)
        if (data.farmtofork) setFtf(data.farmtofork)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <PageHero
        tag={intro.pageHeroTag}
        title={intro.pageHeroTitle}
        subtitle={intro.pageHeroSubtitle}
        img="/images/hero-chi-siamo.jpg"
        breadcrumb={[{ label: 'Chi siamo' }]}
      />

      {/* ── INTRO ── */}
      <section className="page-section cs-intro">
        <div className="page-section__inner cs-intro__inner">
          <div className="cs-intro__text">
            <div className="deco">
              <span className="dot" style={{ background: 'var(--yellow)' }} />
              <span className="dot" style={{ background: 'var(--red)' }} />
              <span className="dot" style={{ background: 'var(--green)' }} />
            </div>
            <span className="section-tag">{intro.sectionTag}</span>
            <h2>{intro.h2}</h2>
            <div className="divider" />
            <p className="lead">{intro.lead}</p>
            <p>{intro.p1}</p>
            <p>{intro.p2}</p>
          </div>
          <div className="cs-intro__img">
            <img src="/agrumi-home.jpg" alt="Agrumi tipici mediterranei" />
          </div>
        </div>
      </section>

      {/* ── VALORI ── */}
      <section className="page-section" style={{ background: 'var(--off)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="page-section__inner">
          <div className="sottosezione-intro">
            <span className="section-tag">{valori.sectionTag}</span>
            <h2>{valori.h2}</h2>
            <p className="lead">{valori.lead}</p>
          </div>
          <div className="cards">
            {valori.cards.map((v) => (
              <div className="card" key={v.titolo}>
                <span className="card-icon">{v.icon}</span>
                <h3>{v.titolo}</h3>
                <p>{v.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSIONE ── */}
      <section className="page-section cs-mission">
        <div className="page-section__inner cs-mission__inner">
          <div className="cs-mission__img">
            <img src="/images/missione.jpg" alt="Campo agricolo al tramonto" />
            <div className="cs-mission__img-deco" />
          </div>
          <div className="cs-mission__text">
            <span className="section-tag">{missione.sectionTag}</span>
            <h2>{missione.h2}</h2>
            <div className="divider" />
            <p className="lead">{missione.lead}</p>
            <p>{missione.p1}</p>
            <div className="cs-mission__badge">
              <span className="cs-mission__badge-icon">🇪🇺</span>
              <div>
                <div className="cs-mission__badge-label">{missione.badgeLabel}</div>
                <div className="cs-mission__badge-title">{missione.badgeTitle}</div>
                <div className="cs-mission__badge-sub">{missione.badgeSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FARM TO FORK ── */}
      <section className="cs-ftf">
        <div className="cs-ftf__inner">
          <div className="cs-ftf__header">
            <span className="section-tag" style={{ color: 'var(--yellow)' }}>{ftf.sectionTag}</span>
            <h2>{ftf.h2}</h2>
            <p className="lead" style={{ color: 'rgba(255,255,255,.8)' }}>{ftf.lead}</p>
          </div>
          <div className="cs-ftf__list">
            {ftf.items.map((item, i) => (
              <div className="cs-ftf__item" key={i}>
                <span className="cs-ftf__num">{String(i + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <p className="cs-ftf__closing">{ftf.closing}</p>
        </div>
      </section>
    </>
  )
}
