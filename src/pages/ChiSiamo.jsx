import PageHero from '../components/PageHero'

const valori = [
  {
    icon: '🌿',
    titolo: 'Rispettiamo la terra',
    testo: "Un\u2019agricoltura che non separa qualità e sostenibilità, ma le unisce in ogni scelta produttiva.",
  },
  {
    icon: '🔍',
    titolo: 'Trasparenza totale',
    testo: 'Ogni prodotto è tracciabile dal campo alla tavola: sapere da dove viene è un diritto del consumatore.',
  },
  {
    icon: '🤝',
    titolo: 'Valore condiviso',
    testo: 'Una filiera che crea ricchezza per tutti gli attori: produttori, lavoratori e consumatori.',
  },
  {
    icon: '📜',
    titolo: 'Identità autentica',
    testo: "Custodire i sapori del Mediterraneo e trasformarli in un\u2019esperienza genuina per chi consuma.",
  },
]

const farmToFork = [
  "Ridurre l\u2019impatto ambientale dell\u2019agricoltura e contrastare il cambiamento climatico",
  'Proteggere la biodiversità e le risorse naturali',
  'Garantire alimenti sicuri, nutrienti e accessibili a tutti',
  'Assicurare un giusto valore economico per tutti gli attori della filiera',
  'Ridurre sprechi e inefficienze lungo tutta la catena alimentare',
]

export default function ChiSiamo() {
  return (
    <>
      <PageHero
        tag="La nostra storia"
        title="Nati dalla terra e dalle persone"
        subtitle="18 aziende del Sud Italia che hanno scelto di unire esperienza, tradizione e visione per dare vita a una filiera ortofrutticola autentica."
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
            <span className="section-tag">Chi siamo</span>
            <h2>GUTIME – Gusti Tipici Mediterranei</h2>
            <div className="divider" />
            <p className="lead">
              Nasce dalla terra e dalle persone. Dall'incontro di 18 aziende del Sud Italia che hanno
              scelto di unire esperienza, tradizione e visione per dare vita a una filiera
              ortofrutticola autentica e condivisa.
            </p>
            <p>
              Una filiera è un sistema vivo: un percorso che accompagna ogni prodotto dal campo alla
              tavola, senza interruzioni. Coltivazione, trasformazione e distribuzione diventano parti
              di un'unica responsabilità. Questo significa più controllo, più trasparenza, più qualità.
            </p>
            <p>
              Per il consumatore si traduce in una scelta consapevole: prodotti freschi, sicuri,
              tracciabili, che raccontano davvero da dove vengono.
            </p>
          </div>
          <div className="cs-intro__img">
            <img
              src="/agrumi-home.jpg"
              alt="Agrumi tipici mediterranei"
            />
          </div>
        </div>
      </section>

      {/* ── VALORI ── */}
      <section className="page-section" style={{ background: 'var(--off)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="page-section__inner">
          <div className="sottosezione-intro">
            <span className="section-tag">I nostri principi</span>
            <h2>In cosa crediamo</h2>
            <p className="lead">
              Crediamo in un'agricoltura che rispetta la terra e le persone, in un modello che non
              separa qualità e sostenibilità, ma le unisce.
            </p>
          </div>
          <div className="cards">
            {valori.map((v) => (
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
            <img
              src="/images/missione.jpg"
              alt="Campo agricolo al tramonto"
            />
            <div className="cs-mission__img-deco" />
          </div>
          <div className="cs-mission__text">
            <span className="section-tag">La missione</span>
            <h2>Un impegno chiaro</h2>
            <div className="divider" />
            <p className="lead">
              Offrire prodotti ortofrutticoli di qualità, garantendo sostenibilità ambientale,
              sicurezza alimentare e continuità dell'offerta per il mercato.
            </p>
            <p>
              Un impegno che si inserisce in una visione più ampia, in linea con la strategia
              europea <strong>Farm to Fork</strong>, cuore dell'European Green Deal.
            </p>
            <div className="cs-mission__badge">
              <span className="cs-mission__badge-icon">🇪🇺</span>
              <div>
                <div className="cs-mission__badge-label">Allineata a</div>
                <div className="cs-mission__badge-title">Strategia Farm to Fork</div>
                <div className="cs-mission__badge-sub">European Green Deal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FARM TO FORK ── */}
      <section className="cs-ftf">
        <div className="cs-ftf__inner">
          <div className="cs-ftf__header">
            <span className="section-tag" style={{ color: 'var(--yellow)' }}>Visione europea</span>
            <h2>Dal campo alla tavola</h2>
            <p className="lead" style={{ color: 'rgba(255,255,255,.8)' }}>
              La strategia Farm to Fork rappresenta un cambio di paradigma: ripensare l'intero sistema
              alimentare per renderlo più equo, sano e rispettoso dell'ambiente.
            </p>
          </div>
          <div className="cs-ftf__list">
            {farmToFork.map((item, i) => (
              <div className="cs-ftf__item" key={i}>
                <span className="cs-ftf__num">{String(i + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <p className="cs-ftf__closing">
            Una visione che mette al centro il consumatore, ma anche chi produce, trasformando la
            sostenibilità in un'opportunità concreta di sviluppo.
          </p>
        </div>
      </section>
    </>
  )
}
