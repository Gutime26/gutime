import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getContent, saveContent } from '../lib/api'
import ImageUpload from '../components/ImageUpload'

// ── DEFAULTS ────────────────────────────────────────────────────────────────

const HOME_DEFAULT = {
  hero: {
    tag: 'Gusti Tipici Mediterranei',
    h1Before: 'La filiera che ',
    h1Accent: 'unisce la terra',
    h1After: ', crea valore, arriva a te.',
    p: "18 aziende, un'unica visione: qualità, sostenibilità e tracciabilità dal Sud Italia.",
    btn1Label: 'Scopri la filiera', btn1Href: '#about',
    btn2Label: 'I nostri prodotti', btn2Href: '#prodotti',
  },
  strip: [
    { num: '18', label: 'Aziende in filiera' },
    { num: '100%', label: 'Prodotti tracciabili' },
    { num: 'Sud', label: 'Italia, origine autentica' },
    { num: '∞', label: 'Tradizione agricola' },
  ],
  about: {
    tag: 'La nostra storia',
    h2: 'Non è solo un nome,\nè una promessa.',
    lead: '"Gusti Tipici Mediterranei" racchiude l\'identità di un territorio ricco, vocato e generoso, dove clima, tradizione e cultura agricola si incontrano.',
    p1: "Per il consumatore significa riconoscere sapori autentici, naturali e familiari. Per il mercato, rappresenta un sistema affidabile che valorizza origine, qualità e continuità dell'offerta.",
    p2: "GUTIME nasce dall'unione di 18 aziende accomunate da una visione: portare sulle tavole prodotti ortofrutticoli di qualità, sostenibili e tracciabili, espressione autentica del Sud Italia.",
    imgSrc: '/agrumi-home.jpg', imgAlt: 'Arance e agrumi tipici mediterranei',
  },
  values: {
    tag: 'I nostri valori', h2: 'Perché scegliere GUTIME',
    cards: [
      { icon: '🌿', title: 'Sostenibilità', text: "Pratiche agricole rispettose dell'ambiente e delle risorse naturali del territorio mediterraneo." },
      { icon: '📍', title: 'Tracciabilità', text: "Ogni prodotto ha un'origine certificata e verificabile, dalla terra alla tua tavola." },
      { icon: '🤝', title: 'Filiera Unita', text: '18 aziende che condividono valori, metodi e obiettivi per garantire qualità e continuità.' },
      { icon: '🍊', title: 'Autenticità', text: 'Sapori veri, genuini, frutto di clima, tradizione e passione agricola del Sud Italia.' },
    ],
  },
  promise: {
    tag: 'La nostra promessa',
    h2: "Una visione, 18 aziende, un'unica identità.",
    blockquote: '"Gusti Tipici Mediterranei – la filiera che unisce la terra, crea valore, arriva a te."',
    body: 'GUTIME non è solo un marchio: è un sistema che unisce produttori, territorio e consumatori in un patto di qualità, trasparenza e rispetto per la natura.',
  },
  territory: {
    tag: 'Il territorio', h2: 'Le radici del gusto mediterraneo',
    p1: 'Clima mite, terreni fertili, secoli di tradizione agricola: il Sud Italia è uno dei comprensori ortofrutticoli più vocati del Mediterraneo. GUTIME nasce esattamente qui, valorizzando ogni singola realtà produttiva.',
    p2: 'Dalle piane di agrumi ai campi di ortaggi, ogni prodotto porta con sé la storia di chi lo ha coltivato e la ricchezza del territorio che lo ha generato.',
    pills: ['Sud Italia', 'Agricoltura sostenibile', 'Clima mediterraneo', 'Tradizione', 'Filiera corta'],
    imgSrc: '/aranceti-home.jpg', imgAlt: 'Campi agricoli del Sud Italia',
  },
}

const CHI_SIAMO_DEFAULT = {
  intro: {
    pageHeroTag: 'La nostra storia',
    pageHeroTitle: 'Nati dalla terra e dalle persone',
    pageHeroSubtitle: '18 aziende del Sud Italia che hanno scelto di unire esperienza, tradizione e visione per dare vita a una filiera ortofrutticola autentica.',
    sectionTag: 'Chi siamo',
    h2: 'GUTIME – Gusti Tipici Mediterranei',
    lead: "Nasce dalla terra e dalle persone. Dall'incontro di 18 aziende del Sud Italia che hanno scelto di unire esperienza, tradizione e visione per dare vita a una filiera ortofrutticola autentica e condivisa.",
    p1: "Una filiera è un sistema vivo: un percorso che accompagna ogni prodotto dal campo alla tavola, senza interruzioni. Coltivazione, trasformazione e distribuzione diventano parti di un'unica responsabilità. Questo significa più controllo, più trasparenza, più qualità.",
    p2: "Per il consumatore si traduce in una scelta consapevole: prodotti freschi, sicuri, tracciabili, che raccontano davvero da dove vengono.",
  },
  valori: {
    sectionTag: 'I nostri principi',
    h2: 'In cosa crediamo',
    lead: "Crediamo in un'agricoltura che rispetta la terra e le persone, in un modello che non separa qualità e sostenibilità, ma le unisce.",
    cards: [
      { icon: '🌿', titolo: 'Rispettiamo la terra', testo: "Un'agricoltura che non separa qualità e sostenibilità, ma le unisce in ogni scelta produttiva." },
      { icon: '🔍', titolo: 'Trasparenza totale', testo: 'Ogni prodotto è tracciabile dal campo alla tavola: sapere da dove viene è un diritto del consumatore.' },
      { icon: '🤝', titolo: 'Valore condiviso', testo: 'Una filiera che crea ricchezza per tutti gli attori: produttori, lavoratori e consumatori.' },
      { icon: '📜', titolo: 'Identità autentica', testo: "Custodire i sapori del Mediterraneo e trasformarli in un'esperienza genuina per chi consuma." },
    ],
  },
  missione: {
    sectionTag: 'La missione',
    h2: 'Un impegno chiaro',
    lead: "Offrire prodotti ortofrutticoli di qualità, garantendo sostenibilità ambientale, sicurezza alimentare e continuità dell'offerta per il mercato.",
    p1: "Un impegno che si inserisce in una visione più ampia, in linea con la strategia europea Farm to Fork, cuore dell'European Green Deal.",
    badgeLabel: 'Allineata a',
    badgeTitle: 'Strategia Farm to Fork',
    badgeSub: 'European Green Deal',
  },
  farmtofork: {
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
  },
}

const PRODOTTI_DEFAULT = {
  prodotti: [
    {
      id: 'clementine',
      nome: 'Clementine',
      tag: 'Agrumi',
      tagColor: 'var(--yellow)',
      img: '/images/prod-clementine.jpg',
      alt: 'Clementine GUTIME',
      intro: 'Dolci, succose, naturalmente ricche di profumo. Le clementine GUTIME raccontano tutta la generosità del Sud Italia, grazie a territori vocati e a una raccolta che rispetta i tempi della natura.',
      corpo: "Coltivate e selezionate all'interno della filiera, arrivano al consumatore con tutta la loro freschezza e con la garanzia di un'origine certa.",
      listaTitolo: 'Perché sceglierle',
      lista: ['Gusto dolce e intenso', 'Pratiche da consumare', 'Raccolte nel momento ideale di maturazione', 'Tracciabili lungo tutta la filiera'],
    },
    {
      id: 'arance',
      nome: 'Arance',
      tag: 'Agrumi',
      tagColor: 'var(--red)',
      img: '/images/prod-arance.jpg',
      alt: 'Arance GUTIME',
      intro: 'Le arance GUTIME esprimono il carattere autentico della tradizione mediterranea. Frutti ricchi di succo, colore e sapore, coltivati in aree ad alta vocazione agrumicola e lavorati con attenzione in ogni fase.',
      corpo: "Perfette per il consumo fresco o per la trasformazione, sono il risultato di una filiera che punta sulla qualità e sulla continuità dell'offerta.",
      listaTitolo: 'Il valore delle nostre arance',
      lista: ['Elevata qualità organolettica', 'Freschezza garantita', 'Disponibilità costante per mercato consumer e B2B', 'Sicurezza e trasparenza dal campo alla tavola'],
    },
    {
      id: 'pesche',
      nome: 'Pesche',
      tag: 'Frutta',
      tagColor: 'var(--green)',
      img: '/images/prod-pesche.jpg',
      alt: 'Pesche GUTIME',
      intro: "Le pesche GUTIME racchiudono il gusto pieno dell'estate mediterranea. Morbide, profumate e naturalmente dolci, vengono coltivate nel rispetto della stagionalità e raccolte nel momento in cui esprimono al meglio le proprie caratteristiche.",
      corpo: "Ogni frutto viene seguito lungo tutta la filiera, per garantire qualità costante e un'esperienza autentica per il consumatore.",
      listaTitolo: 'Cosa le rende speciali',
      lista: ['Sapore intenso e naturale', 'Consistenza e freschezza', 'Raccolta stagionale e selezione accurata', 'Provenienza garantita'],
    },
    {
      id: 'ortaggi',
      nome: 'Ortaggi',
      tag: 'Verdure',
      tagColor: 'var(--brown)',
      img: '/images/prod-ortaggi.jpg',
      alt: 'Ortaggi GUTIME',
      intro: 'Gli ortaggi GUTIME completano il paniere della filiera con una proposta ampia e versatile, pensata per rispondere alle esigenze del mercato e delle famiglie.',
      corpo: 'Coltivati in territori vocati e lavorati secondo criteri di qualità e sostenibilità, portano in tavola tutta la freschezza e la genuinità del Mediterraneo.',
      listaTitolo: 'La forza dei nostri ortaggi',
      lista: ['Ampia varietà di prodotto', 'Freschezza e qualità costanti', 'Coltivazioni controllate e tracciabili', 'Ideali per il consumo quotidiano e per il mercato professionale'],
    },
  ],
}

const CONTATTI_DEFAULT = {
  aziende: [
    {
      nome: 'RHEAURA – OP – SOCIETÀ COOPERATIVA AGRICOLA',
      contatti: [
        { icon: '✉️', label: 'Email', value: 'amministrazione@rheaura.it', href: 'mailto:amministrazione@rheaura.it' },
        { icon: '🔒', label: 'PEC', value: 'rheaura@pec.it', href: 'mailto:rheaura@pec.it' },
        { icon: '📞', label: 'Tel.', value: '327 268 2994', href: 'tel:+393272682994' },
        { icon: '👤', label: 'Rappr.', value: 'Vocaturi Leonardo', href: null },
        { icon: '📍', label: 'Indirizzo', value: 'Via Capolanza, 58 – 87011 Cassano allo Ionio (CS)', href: null },
      ],
    },
    {
      nome: 'OMNIAGROUP CONSULTING S.R.L.S.',
      contatti: [
        { icon: '✉️', label: 'Email', value: 'amministrazione.omniagroup@gmail.com', href: 'mailto:amministrazione.omniagroup@gmail.com' },
        { icon: '🔒', label: 'PEC', value: 'omniagroupconsulting@pec.it', href: 'mailto:omniagroupconsulting@pec.it' },
        { icon: '📞', label: 'Tel.', value: '0984/910083', href: 'tel:+390984910083' },
      ],
    },
  ],
}

const AZIENDE_DEFAULT = {
  produzione: [
    { nome: 'Tenute Conforti Giovanni Soc. Agr.', focus: 'Tradizione, cura delle coltivazioni e legame con il territorio calabrese.', indirizzo: 'Contrada Colucci 93, San Giorgio Albanese (CS)', telefono: '0983 854067 / 0983 854319', email: 'info@agricolaconforti.it', sito: 'www.agricolaconforti.it', referente: 'Conforti Luana' },
    { nome: 'Ferretti Tonino', focus: 'Esperienza e continuità produttiva.', indirizzo: 'Bisignano (CS)', telefono: '', email: '', sito: '', referente: 'Ferretti Tonino' },
    { nome: 'Fratelli Turano Società Agricola S.S.', focus: 'Organizzazione e qualità costante.', indirizzo: 'San Demetrio Corone (CS)', telefono: '', email: '', sito: '', referente: 'Turano Damiano' },
    { nome: 'Capalbo Ornella', focus: 'Cura artigianale delle produzioni.', indirizzo: 'Bisignano (CS)', telefono: '', email: '', sito: '', referente: 'Capalbo Ornella' },
    { nome: 'Società Agricola Magna Grecia S.r.l.', focus: 'Efficienza e integrazione produttiva.', indirizzo: 'Corigliano-Rossano (CS)', telefono: '', email: '', sito: '', referente: 'De Rosis Morgia Domiziano' },
    { nome: 'Carolina Società Agricola S.n.c.', focus: 'Identità mediterranea dalla Sicilia.', indirizzo: 'Palagonia (CT)', telefono: '', email: '', sito: '', referente: 'Auteri Carolina' },
    { nome: 'Calfrutta Società Agricola Semplice', focus: 'Stabilità produttiva e legame con il territorio.', indirizzo: 'Cassano allo Ionio (CS)', telefono: '', email: '', sito: '', referente: 'Mignogna Samuele' },
    { nome: 'Ortoven di Ventrone Pasquale', focus: 'Specializzazione orticola e diversificazione del paniere.', indirizzo: 'Francolise (CE)', telefono: '', email: '', sito: '', referente: 'Ventrone Pasquale' },
    { nome: 'Peclè S.r.l. Società Agricola', focus: 'Affidabilità produttiva e orientamento alla qualità.', indirizzo: 'Corigliano-Rossano (CS)', telefono: '', email: '', sito: '', referente: 'La Pietra Pasquale' },
    { nome: 'KU.BO Società Agricola S.r.l.', focus: 'Innovazione agricola e interpretazione del mercato moderno.', indirizzo: 'Battipaglia (SA)', telefono: '', email: '', sito: '', referente: 'Kushnir Mykhaylo' },
    { nome: 'Società Agricola La Fasanara S.r.l.', focus: 'Continuità e organizzazione strutturata.', indirizzo: 'Battipaglia (SA)', telefono: '', email: '', sito: '', referente: 'Pastore Mario' },
  ],
  trasformazione: [
    { nome: 'Rheaura OP – Società Cooperativa Agricola', ruolo: 'Coordinamento della filiera', focus: 'Governance e integrazione — soggetto proponente e cuore organizzativo di GUTIME.', indirizzo: 'Cassano allo Ionio (CS)', telefono: '327 268 2994', email: 'amministrazione@rheaura.it', pec: 'rheaura@pec.it', referente: 'Vocaturi Leonardo' },
    { nome: 'Morgia Società Cooperativa Agricola', ruolo: 'Lavorazione e commercializzazione', focus: 'Valorizzazione del prodotto con strutture e competenze dedicate.', indirizzo: 'Zona Industriale, Corigliano-Rossano (CS)', telefono: '0983 851260', email: 'amministrazione@morgiacooperativa.com', pec: '', referente: 'De Rosis Morgia Domiziano' },
    { nome: 'Turano – Società Cooperativa per Azioni', ruolo: 'Trasformazione e distribuzione', focus: 'Efficienza nei processi e continuità nella distribuzione.', indirizzo: 'Corigliano-Rossano (CS)', telefono: '', email: '', pec: '', referente: 'Turano Damiano' },
    { nome: 'Il Galletto Soc. Consortile Agricola O.P.', ruolo: 'Organizzazione produttori e commercializzazione', focus: "Coordinamento della produzione e facilitazione dell'accesso al mercato.", indirizzo: 'Palagonia (CT)', telefono: '', email: '', pec: '', referente: 'Auteri Carolina' },
    { nome: 'Società Cooperativa Agricola Orto Natura', ruolo: 'Commercializzazione', focus: 'Distribuzione ortofrutticola e connessione diretta con il mercato.', indirizzo: 'Vittoria (RG)', telefono: '', email: '', pec: '', referente: 'Alboni Giuseppina' },
  ],
  ricerca: [
    { nome: 'CERICT – Centro Regionale ICT', ruolo: 'Ricerca e innovazione', focus: 'Sviluppo tecnologico e innovazione dei processi per la crescita sostenibile della filiera.', indirizzo: 'Benevento (BN)', telefono: '', email: '', referente: 'Romano Luigi' },
  ],
}

const QUALITA_DEFAULT = {
  filiera: [
    { icon: '🌱', num: '01', titolo: 'Coltivazione', desc: 'Nei campi del Sud Italia le aziende coltivano clementine, arance, pesche e ortaggi nel rispetto dei tempi naturali e del territorio.', valore: 'Autenticità e qualità alla fonte' },
    { icon: '🚜', num: '02', titolo: 'Raccolta', desc: 'I prodotti vengono raccolti nel momento ideale di maturazione, preservando gusto, freschezza e proprietà nutrizionali.', valore: 'Freschezza e stagionalità' },
    { icon: '🏭', num: '03', titolo: 'Lavorazione', desc: 'Le strutture della filiera selezionano, lavorano e trasformano i prodotti secondo standard condivisi e controllati.', valore: 'Sicurezza e qualità costante' },
    { icon: '📦', num: '04', titolo: 'Confezionamento', desc: 'Ogni prodotto viene preparato e distribuito attraverso una rete organizzata ed efficiente.', valore: 'Continuità e affidabilità' },
    { icon: '🛒', num: '05', titolo: 'Distribuzione', desc: 'I prodotti GUTIME raggiungono il mercato consumer e i partner B2B, mantenendo integrità e tracciabilità.', valore: 'Accessibilità e presenza sul mercato' },
    { icon: '🍊', num: '06', titolo: 'Il consumatore', desc: 'Sulla tavola arriva un prodotto controllato, sicuro e di origine garantita.', valore: 'Fiducia e qualità riconoscibile' },
  ],
  certificazioni: [
    {
      categoria: 'Standard di produzione', colore: 'var(--green)', icona: '🌿',
      voci: [
        { nome: 'Produzione Integrata', desc: "Sistema che ottimizza le risorse naturali e riduce l'impatto ambientale, garantendo prodotti di qualità nel rispetto dell'ecosistema." },
        { nome: 'Agricoltura Biologica', desc: "Coltivazioni senza sostanze chimiche di sintesi, nel rispetto della natura, della biodiversità e della salute del consumatore." },
      ],
    },
    {
      categoria: 'Tracciabilità e gestione qualità', colore: 'var(--yellow)', icona: '🔍',
      voci: [
        { nome: 'UNI EN ISO 22005', desc: "Certifica la tracciabilità lungo tutta la filiera agroalimentare, monitorando ogni fase del processo produttivo." },
        { nome: 'UNI EN ISO 9001', desc: "Sistema di gestione della qualità che assicura processi efficienti, controllati e orientati al miglioramento continuo." },
      ],
    },
    {
      categoria: 'Sostenibilità ambientale', colore: 'var(--green)', icona: '♻️',
      voci: [
        { nome: 'UNI EN ISO 14001', desc: "Standard internazionale per la gestione ambientale, con l'obiettivo di ridurre l'impatto delle attività produttive sull'ambiente." },
      ],
    },
    {
      categoria: 'Standard internazionali di filiera', colore: 'var(--red)', icona: '🌍',
      voci: [
        { nome: 'GLOBALG.A.P.', desc: 'Certificazione globale per le buone pratiche agricole: sicurezza, qualità e sostenibilità delle produzioni.' },
        { nome: 'IFS Food', desc: 'Standard internazionale che certifica la sicurezza e la qualità dei processi di lavorazione e trasformazione alimentare.' },
        { nome: 'GRASP', desc: "Modulo integrativo di GLOBALG.A.P. che attesta il rispetto delle buone pratiche sociali e delle condizioni di lavoro." },
      ],
    },
  ],
  impegni: [
    { icon: '💧', titolo: "Gestione responsabile dell'acqua", desc: 'Sistemi di irrigazione a basso consumo e monitoraggio dei prelievi idrici per preservare le risorse del territorio.' },
    { icon: '🌍', titolo: 'Riduzione delle emissioni', desc: "Ottimizzazione della logistica e dei trasporti per minimizzare l'impronta carbonica lungo tutta la filiera." },
    { icon: '♻️', titolo: 'Economia circolare', desc: 'Riduzione degli sprechi produttivi e recupero degli scarti di lavorazione, in un modello orientato alla circolarità.' },
    { icon: '🌱', titolo: 'Tutela della biodiversità', desc: 'Pratiche agricole che preservano gli ecosistemi locali, la flora spontanea e la fauna presente nei territori coltivati.' },
    { icon: '☀️', titolo: 'Energia sostenibile', desc: "Orientamento all'utilizzo di fonti rinnovabili nelle strutture produttive e di lavorazione della filiera." },
    { icon: '📋', titolo: 'Conformità normativa', desc: 'Piena adesione alle normative europee e nazionali in materia ambientale, con certificazione ISO 14001.' },
  ],
}

const FOOTER_DEFAULT = {
  azienda1: {
    nome: 'RHAURA – OP – SOCIETÀ COOPERATIVA AGRICOLA',
    email: 'amministrazione@rheaura.it',
    pec: 'rheaura@pec.it',
    rappresentante: 'Vocaturi Leonardo',
    telefono: '327 268 2994',
  },
  azienda2: {
    nome: 'OMNIAGROUP CONSULTING S.R.L.S.',
    email: 'amministrazione.omniagroup@gmail.com',
    pec: 'omniagroupconsulting@pec.it',
    telefono: '0984/910083',
  },
  tagline: 'Gusti Tipici Mediterranei',
  claim: 'La filiera che unisce la terra, crea valore, arriva a te.',
  copyright: '© 2026 GUTIME. Tutti i diritti riservati.',
}

const DEFAULTS = {
  home: HOME_DEFAULT,
  'chi-siamo': CHI_SIAMO_DEFAULT,
  prodotti: PRODOTTI_DEFAULT,
  contatti: CONTATTI_DEFAULT,
  aziende: AZIENDE_DEFAULT,
  qualita: QUALITA_DEFAULT,
  footer: FOOTER_DEFAULT,
}

const SECTION_LABELS = {
  home: 'Home',
  'chi-siamo': 'Chi siamo',
  prodotti: 'Prodotti',
  contatti: 'Contatti',
  aziende: 'Le aziende',
  qualita: 'Qualità',
  footer: 'Footer',
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      {children}
    </div>
  )
}

function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <Field label={label}>
      <input className="adm-input" type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </Field>
  )
}

function Textarea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <Field label={label}>
      <textarea className="adm-textarea" rows={rows} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </Field>
  )
}

// Array editor per array di oggetti con schema fisso
function ArrayEditor({ items, onChange, schema, addLabel = '+ Aggiungi', emptyItem }) {
  function update(i, field, value) {
    const next = items.map((item, idx) => idx === i ? { ...item, [field]: value } : item)
    onChange(next)
  }
  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i))
  }
  function add() {
    onChange([...items, emptyItem || Object.fromEntries(schema.map(s => [s.key, '']))])
  }
  function move(i, dir) {
    const next = [...items]
    const target = i + dir
    if (target < 0 || target >= next.length) return
    ;[next[i], next[target]] = [next[target], next[i]]
    onChange(next)
  }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="adm-array-item">
          <div className="adm-array-item-fields">
            {schema.map(s => (
              s.type === 'textarea' ? (
                <div key={s.key} className="adm-field" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: 11 }}>{s.label}</label>
                  <textarea className="adm-textarea" rows={s.rows || 3} value={item[s.key] || ''} onChange={e => update(i, s.key, e.target.value)} />
                </div>
              ) : (
                <div key={s.key} className="adm-field" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: 11 }}>{s.label}</label>
                  <input className="adm-input" type="text" value={item[s.key] || ''} onChange={e => update(i, s.key, e.target.value)} />
                </div>
              )
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
            <button type="button" className="adm-btn adm-btn--ghost" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => move(i, -1)}>↑</button>
            <button type="button" className="adm-btn adm-btn--ghost" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => move(i, 1)}>↓</button>
            <button type="button" className="adm-btn adm-btn--danger" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => remove(i)}>✕</button>
          </div>
        </div>
      ))}
      <button type="button" className="adm-add-btn" onClick={add}>{addLabel}</button>
    </div>
  )
}

// Array editor per array di stringhe
function StringArrayEditor({ items, onChange, addLabel = '+ Aggiungi', placeholder = '' }) {
  function update(i, value) {
    onChange(items.map((item, idx) => idx === i ? value : item))
  }
  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i))
  }
  function add() {
    onChange([...items, ''])
  }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <input className="adm-input" type="text" value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder} style={{ flex: 1 }} />
          <button type="button" className="adm-btn adm-btn--danger" style={{ padding: '4px 10px' }} onClick={() => remove(i)}>✕</button>
        </div>
      ))}
      <button type="button" className="adm-add-btn" onClick={add}>{addLabel}</button>
    </div>
  )
}

// ── TAB EDITORS ──────────────────────────────────────────────────────────────

// HOME
function HomeEditor({ data, onChange }) {
  const [tab, setTab] = useState('hero')
  const tabs = ['hero', 'strip', 'about', 'values', 'promise', 'territory']
  const tabLabels = { hero: 'Hero', strip: 'Strip', about: 'About', values: 'Valori', promise: 'Promessa', territory: 'Territorio' }

  function upd(section, field, value) {
    onChange({ ...data, [section]: { ...data[section], [field]: value } })
  }

  return (
    <>
      <div className="adm-tabs">
        {tabs.map(t => (
          <button key={t} type="button" className={`adm-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{tabLabels[t]}</button>
        ))}
      </div>

      {tab === 'hero' && (
        <div className="adm-card">
          <div className="adm-card-title">Hero</div>
          <Input label="Tag" value={data.hero.tag} onChange={v => upd('hero', 'tag', v)} />
          <Input label="H1 – parte prima" value={data.hero.h1Before} onChange={v => upd('hero', 'h1Before', v)} />
          <Input label="H1 – parte accent (verde)" value={data.hero.h1Accent} onChange={v => upd('hero', 'h1Accent', v)} />
          <Input label="H1 – parte finale" value={data.hero.h1After} onChange={v => upd('hero', 'h1After', v)} />
          <Textarea label="Paragrafo" value={data.hero.p} onChange={v => upd('hero', 'p', v)} rows={3} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <Input label="Bottone 1 – testo" value={data.hero.btn1Label} onChange={v => upd('hero', 'btn1Label', v)} />
            <Input label="Bottone 1 – link" value={data.hero.btn1Href} onChange={v => upd('hero', 'btn1Href', v)} />
            <Input label="Bottone 2 – testo" value={data.hero.btn2Label} onChange={v => upd('hero', 'btn2Label', v)} />
            <Input label="Bottone 2 – link" value={data.hero.btn2Href} onChange={v => upd('hero', 'btn2Href', v)} />
          </div>
        </div>
      )}

      {tab === 'strip' && (
        <div className="adm-card">
          <div className="adm-card-title">Strip numerica (4 elementi fissi)</div>
          {data.strip.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0 1rem', marginBottom: 8 }}>
              <Input label={`Numero ${i + 1}`} value={item.num} onChange={v => {
                const next = [...data.strip]; next[i] = { ...next[i], num: v }; onChange({ ...data, strip: next })
              }} />
              <Input label={`Etichetta ${i + 1}`} value={item.label} onChange={v => {
                const next = [...data.strip]; next[i] = { ...next[i], label: v }; onChange({ ...data, strip: next })
              }} />
            </div>
          ))}
        </div>
      )}

      {tab === 'about' && (
        <div className="adm-card">
          <div className="adm-card-title">Sezione About</div>
          <Input label="Tag" value={data.about.tag} onChange={v => upd('about', 'tag', v)} />
          <Textarea label="H2" value={data.about.h2} onChange={v => upd('about', 'h2', v)} rows={2} />
          <Textarea label="Lead" value={data.about.lead} onChange={v => upd('about', 'lead', v)} rows={3} />
          <Textarea label="Paragrafo 1" value={data.about.p1} onChange={v => upd('about', 'p1', v)} rows={3} />
          <Textarea label="Paragrafo 2" value={data.about.p2} onChange={v => upd('about', 'p2', v)} rows={3} />
          <ImageUpload label="Immagine" value={data.about.imgSrc} onChange={v => upd('about', 'imgSrc', v)} />
          <Input label="Alt immagine" value={data.about.imgAlt} onChange={v => upd('about', 'imgAlt', v)} />
        </div>
      )}

      {tab === 'values' && (
        <div className="adm-card">
          <div className="adm-card-title">Sezione Valori</div>
          <Input label="Tag" value={data.values.tag} onChange={v => upd('values', 'tag', v)} />
          <Input label="H2" value={data.values.h2} onChange={v => upd('values', 'h2', v)} />
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '.825rem', fontWeight: 600, display: 'block', marginBottom: '.5rem' }}>Card valori</label>
            <ArrayEditor
              items={data.values.cards}
              onChange={cards => onChange({ ...data, values: { ...data.values, cards } })}
              schema={[
                { key: 'icon', label: 'Icona (emoji)' },
                { key: 'title', label: 'Titolo' },
                { key: 'text', label: 'Testo', type: 'textarea', rows: 2 },
              ]}
              addLabel="+ Aggiungi card"
              emptyItem={{ icon: '', title: '', text: '' }}
            />
          </div>
        </div>
      )}

      {tab === 'promise' && (
        <div className="adm-card">
          <div className="adm-card-title">Sezione Promessa</div>
          <Input label="Tag" value={data.promise.tag} onChange={v => upd('promise', 'tag', v)} />
          <Input label="H2" value={data.promise.h2} onChange={v => upd('promise', 'h2', v)} />
          <Textarea label="Citazione (blockquote)" value={data.promise.blockquote} onChange={v => upd('promise', 'blockquote', v)} rows={3} />
          <Textarea label="Corpo" value={data.promise.body} onChange={v => upd('promise', 'body', v)} rows={4} />
        </div>
      )}

      {tab === 'territory' && (
        <div className="adm-card">
          <div className="adm-card-title">Sezione Territorio</div>
          <Input label="Tag" value={data.territory.tag} onChange={v => upd('territory', 'tag', v)} />
          <Input label="H2" value={data.territory.h2} onChange={v => upd('territory', 'h2', v)} />
          <Textarea label="Paragrafo 1" value={data.territory.p1} onChange={v => upd('territory', 'p1', v)} rows={3} />
          <Textarea label="Paragrafo 2" value={data.territory.p2} onChange={v => upd('territory', 'p2', v)} rows={3} />
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '.825rem', fontWeight: 600, display: 'block', marginBottom: '.5rem' }}>Pills</label>
            <StringArrayEditor
              items={data.territory.pills}
              onChange={pills => onChange({ ...data, territory: { ...data.territory, pills } })}
              placeholder="Es. Sud Italia"
            />
          </div>
          <ImageUpload label="Immagine" value={data.territory.imgSrc} onChange={v => upd('territory', 'imgSrc', v)} />
          <Input label="Alt immagine" value={data.territory.imgAlt} onChange={v => upd('territory', 'imgAlt', v)} />
        </div>
      )}
    </>
  )
}

// CHI SIAMO
function ChiSiamoEditor({ data, onChange }) {
  const [tab, setTab] = useState('intro')

  function upd(section, field, value) {
    onChange({ ...data, [section]: { ...data[section], [field]: value } })
  }

  return (
    <>
      <div className="adm-tabs">
        {['intro', 'valori', 'missione', 'farmtofork'].map(t => (
          <button key={t} type="button" className={`adm-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {{ intro: 'Intro', valori: 'Valori', missione: 'Missione', farmtofork: 'Farm to Fork' }[t]}
          </button>
        ))}
      </div>

      {tab === 'intro' && (
        <div className="adm-card">
          <div className="adm-card-title">Intro pagina</div>
          <Input label="Hero Tag" value={data.intro.pageHeroTag} onChange={v => upd('intro', 'pageHeroTag', v)} />
          <Input label="Hero Titolo" value={data.intro.pageHeroTitle} onChange={v => upd('intro', 'pageHeroTitle', v)} />
          <Textarea label="Hero Sottotitolo" value={data.intro.pageHeroSubtitle} onChange={v => upd('intro', 'pageHeroSubtitle', v)} rows={2} />
          <Input label="Section Tag" value={data.intro.sectionTag} onChange={v => upd('intro', 'sectionTag', v)} />
          <Input label="H2" value={data.intro.h2} onChange={v => upd('intro', 'h2', v)} />
          <Textarea label="Lead" value={data.intro.lead} onChange={v => upd('intro', 'lead', v)} rows={3} />
          <Textarea label="Paragrafo 1" value={data.intro.p1} onChange={v => upd('intro', 'p1', v)} rows={3} />
          <Textarea label="Paragrafo 2" value={data.intro.p2} onChange={v => upd('intro', 'p2', v)} rows={3} />
        </div>
      )}

      {tab === 'valori' && (
        <div className="adm-card">
          <div className="adm-card-title">Sezione Valori</div>
          <Input label="Section Tag" value={data.valori.sectionTag} onChange={v => upd('valori', 'sectionTag', v)} />
          <Input label="H2" value={data.valori.h2} onChange={v => upd('valori', 'h2', v)} />
          <Textarea label="Lead" value={data.valori.lead} onChange={v => upd('valori', 'lead', v)} rows={3} />
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '.825rem', fontWeight: 600, display: 'block', marginBottom: '.5rem' }}>Card valori</label>
            <ArrayEditor
              items={data.valori.cards}
              onChange={cards => onChange({ ...data, valori: { ...data.valori, cards } })}
              schema={[
                { key: 'icon', label: 'Icona' },
                { key: 'titolo', label: 'Titolo' },
                { key: 'testo', label: 'Testo', type: 'textarea', rows: 2 },
              ]}
              addLabel="+ Aggiungi card"
              emptyItem={{ icon: '', titolo: '', testo: '' }}
            />
          </div>
        </div>
      )}

      {tab === 'missione' && (
        <div className="adm-card">
          <div className="adm-card-title">Sezione Missione</div>
          <Input label="Section Tag" value={data.missione.sectionTag} onChange={v => upd('missione', 'sectionTag', v)} />
          <Input label="H2" value={data.missione.h2} onChange={v => upd('missione', 'h2', v)} />
          <Textarea label="Lead" value={data.missione.lead} onChange={v => upd('missione', 'lead', v)} rows={3} />
          <Textarea label="Paragrafo 1" value={data.missione.p1} onChange={v => upd('missione', 'p1', v)} rows={3} />
          <Input label="Badge Label" value={data.missione.badgeLabel} onChange={v => upd('missione', 'badgeLabel', v)} />
          <Input label="Badge Titolo" value={data.missione.badgeTitle} onChange={v => upd('missione', 'badgeTitle', v)} />
          <Input label="Badge Sottotitolo" value={data.missione.badgeSub} onChange={v => upd('missione', 'badgeSub', v)} />
        </div>
      )}

      {tab === 'farmtofork' && (
        <div className="adm-card">
          <div className="adm-card-title">Sezione Farm to Fork</div>
          <Input label="Section Tag" value={data.farmtofork.sectionTag} onChange={v => upd('farmtofork', 'sectionTag', v)} />
          <Input label="H2" value={data.farmtofork.h2} onChange={v => upd('farmtofork', 'h2', v)} />
          <Textarea label="Lead" value={data.farmtofork.lead} onChange={v => upd('farmtofork', 'lead', v)} rows={3} />
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '.825rem', fontWeight: 600, display: 'block', marginBottom: '.5rem' }}>Elementi lista</label>
            <StringArrayEditor
              items={data.farmtofork.items}
              onChange={items => onChange({ ...data, farmtofork: { ...data.farmtofork, items } })}
              placeholder="Es. Ridurre l'impatto ambientale…"
            />
          </div>
          <Textarea label="Chiusura" value={data.farmtofork.closing} onChange={v => upd('farmtofork', 'closing', v)} rows={3} />
        </div>
      )}
    </>
  )
}

// PRODOTTI
function ProdottiEditor({ data, onChange }) {
  const [tab, setTab] = useState(0)

  function updProdotto(i, field, value) {
    const next = data.prodotti.map((p, idx) => idx === i ? { ...p, [field]: value } : p)
    onChange({ ...data, prodotti: next })
  }

  const p = data.prodotti[tab]

  return (
    <>
      <div className="adm-tabs">
        {data.prodotti.map((prod, i) => (
          <button key={i} type="button" className={`adm-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{prod.nome}</button>
        ))}
      </div>

      {p && (
        <div className="adm-card">
          <div className="adm-card-title">Prodotto: {p.nome}</div>
          <Input label="Nome" value={p.nome} onChange={v => updProdotto(tab, 'nome', v)} />
          <Input label="Tag categoria" value={p.tag} onChange={v => updProdotto(tab, 'tag', v)} />
          <Input label="Colore tag (CSS var)" value={p.tagColor} onChange={v => updProdotto(tab, 'tagColor', v)} placeholder="Es. var(--yellow)" />
          <ImageUpload label="Immagine" value={p.img} onChange={v => updProdotto(tab, 'img', v)} />
          <Input label="Alt immagine" value={p.alt} onChange={v => updProdotto(tab, 'alt', v)} />
          <Textarea label="Intro" value={p.intro} onChange={v => updProdotto(tab, 'intro', v)} rows={3} />
          <Textarea label="Corpo" value={p.corpo} onChange={v => updProdotto(tab, 'corpo', v)} rows={3} />
          <Input label="Lista – titolo" value={p.listaTitolo} onChange={v => updProdotto(tab, 'listaTitolo', v)} />
          <div>
            <label style={{ fontSize: '.825rem', fontWeight: 600, display: 'block', marginBottom: '.5rem' }}>Lista caratteristiche</label>
            <StringArrayEditor
              items={p.lista}
              onChange={lista => updProdotto(tab, 'lista', lista)}
              placeholder="Es. Gusto dolce e intenso"
            />
          </div>
        </div>
      )}
    </>
  )
}

// CONTATTI
function ContattiEditor({ data, onChange }) {
  const [tab, setTab] = useState(0)

  function updAzienda(i, field, value) {
    const next = data.aziende.map((az, idx) => idx === i ? { ...az, [field]: value } : az)
    onChange({ ...data, aziende: next })
  }

  function updContatto(aziendaIdx, contattoIdx, field, value) {
    const az = data.aziende[aziendaIdx]
    const newContatti = az.contatti.map((c, idx) => idx === contattoIdx ? { ...c, [field]: value } : c)
    const next = data.aziende.map((a, idx) => idx === aziendaIdx ? { ...a, contatti: newContatti } : a)
    onChange({ ...data, aziende: next })
  }

  function addContatto(aziendaIdx) {
    const az = data.aziende[aziendaIdx]
    const newContatti = [...az.contatti, { icon: '', label: '', value: '', href: '' }]
    const next = data.aziende.map((a, idx) => idx === aziendaIdx ? { ...a, contatti: newContatti } : a)
    onChange({ ...data, aziende: next })
  }

  function removeContatto(aziendaIdx, contattoIdx) {
    const az = data.aziende[aziendaIdx]
    const newContatti = az.contatti.filter((_, idx) => idx !== contattoIdx)
    const next = data.aziende.map((a, idx) => idx === aziendaIdx ? { ...a, contatti: newContatti } : a)
    onChange({ ...data, aziende: next })
  }

  const az = data.aziende[tab]

  return (
    <>
      <div className="adm-tabs">
        {data.aziende.map((a, i) => (
          <button key={i} type="button" className={`adm-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>Azienda {i + 1}</button>
        ))}
      </div>

      {az && (
        <div className="adm-card">
          <div className="adm-card-title">{az.nome}</div>
          <Input label="Nome azienda" value={az.nome} onChange={v => updAzienda(tab, 'nome', v)} />
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '.825rem', fontWeight: 600, display: 'block', marginBottom: '.5rem' }}>Contatti</label>
            {az.contatti.map((c, ci) => (
              <div key={ci} className="adm-array-item">
                <div className="adm-array-item-fields">
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0 8px' }}>
                    <div className="adm-field" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: 11 }}>Icona</label>
                      <input className="adm-input" value={c.icon || ''} onChange={e => updContatto(tab, ci, 'icon', e.target.value)} />
                    </div>
                    <div className="adm-field" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: 11 }}>Label</label>
                      <input className="adm-input" value={c.label || ''} onChange={e => updContatto(tab, ci, 'label', e.target.value)} />
                    </div>
                  </div>
                  <div className="adm-field" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: 11 }}>Valore</label>
                    <input className="adm-input" value={c.value || ''} onChange={e => updContatto(tab, ci, 'value', e.target.value)} />
                  </div>
                  <div className="adm-field" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: 11 }}>Href (es. mailto:, tel:, o null)</label>
                    <input className="adm-input" value={c.href || ''} onChange={e => updContatto(tab, ci, 'href', e.target.value || null)} placeholder="mailto:... oppure tel:..." />
                  </div>
                </div>
                <button type="button" className="adm-btn adm-btn--danger" style={{ padding: '4px 8px', fontSize: 11, alignSelf: 'flex-start' }} onClick={() => removeContatto(tab, ci)}>✕</button>
              </div>
            ))}
            <button type="button" className="adm-add-btn" onClick={() => addContatto(tab)}>+ Aggiungi contatto</button>
          </div>
        </div>
      )}
    </>
  )
}

// AZIENDE
function AziendeEditor({ data, onChange }) {
  const [tab, setTab] = useState('produzione')

  const schemaBase = [
    { key: 'nome', label: 'Nome azienda' },
    { key: 'focus', label: 'Focus', type: 'textarea', rows: 2 },
    { key: 'indirizzo', label: 'Indirizzo' },
    { key: 'telefono', label: 'Telefono' },
    { key: 'email', label: 'Email' },
    { key: 'referente', label: 'Referente' },
  ]

  const schemaTrasf = [
    { key: 'nome', label: 'Nome azienda' },
    { key: 'ruolo', label: 'Ruolo' },
    { key: 'focus', label: 'Focus', type: 'textarea', rows: 2 },
    { key: 'indirizzo', label: 'Indirizzo' },
    { key: 'telefono', label: 'Telefono' },
    { key: 'email', label: 'Email' },
    { key: 'pec', label: 'PEC' },
    { key: 'referente', label: 'Referente' },
  ]

  return (
    <>
      <div className="adm-tabs">
        {[['produzione', 'Produzione primaria'], ['trasformazione', 'Trasformazione'], ['ricerca', 'Ricerca']].map(([k, l]) => (
          <button key={k} type="button" className={`adm-tab${tab === k ? ' active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'produzione' && (
        <div className="adm-card">
          <div className="adm-card-title">Aziende di produzione primaria</div>
          <ArrayEditor
            items={data.produzione}
            onChange={produzione => onChange({ ...data, produzione })}
            schema={schemaBase}
            addLabel="+ Aggiungi azienda"
            emptyItem={{ nome: '', focus: '', indirizzo: '', telefono: '', email: '', sito: '', referente: '' }}
          />
        </div>
      )}

      {tab === 'trasformazione' && (
        <div className="adm-card">
          <div className="adm-card-title">Aziende di trasformazione e commercializzazione</div>
          <ArrayEditor
            items={data.trasformazione}
            onChange={trasformazione => onChange({ ...data, trasformazione })}
            schema={schemaTrasf}
            addLabel="+ Aggiungi azienda"
            emptyItem={{ nome: '', ruolo: '', focus: '', indirizzo: '', telefono: '', email: '', pec: '', referente: '' }}
          />
        </div>
      )}

      {tab === 'ricerca' && (
        <div className="adm-card">
          <div className="adm-card-title">Aziende di ricerca e innovazione</div>
          <ArrayEditor
            items={data.ricerca}
            onChange={ricerca => onChange({ ...data, ricerca })}
            schema={[
              { key: 'nome', label: 'Nome' },
              { key: 'ruolo', label: 'Ruolo' },
              { key: 'focus', label: 'Focus', type: 'textarea', rows: 2 },
              { key: 'indirizzo', label: 'Indirizzo' },
              { key: 'telefono', label: 'Telefono' },
              { key: 'email', label: 'Email' },
              { key: 'referente', label: 'Referente' },
            ]}
            addLabel="+ Aggiungi azienda"
            emptyItem={{ nome: '', ruolo: '', focus: '', indirizzo: '', telefono: '', email: '', referente: '' }}
          />
        </div>
      )}
    </>
  )
}

// QUALITA
function QualitaEditor({ data, onChange }) {
  const [tab, setTab] = useState('filiera')

  return (
    <>
      <div className="adm-tabs">
        {[['filiera', 'Filiera'], ['certificazioni', 'Certificazioni'], ['impegni', 'Impegni ambientali']].map(([k, l]) => (
          <button key={k} type="button" className={`adm-tab${tab === k ? ' active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'filiera' && (
        <div className="adm-card">
          <div className="adm-card-title">Step della filiera</div>
          <ArrayEditor
            items={data.filiera}
            onChange={filiera => onChange({ ...data, filiera })}
            schema={[
              { key: 'icon', label: 'Icona' },
              { key: 'num', label: 'Numero (es. 01)' },
              { key: 'titolo', label: 'Titolo' },
              { key: 'desc', label: 'Descrizione', type: 'textarea', rows: 2 },
              { key: 'valore', label: 'Valore' },
            ]}
            addLabel="+ Aggiungi step"
            emptyItem={{ icon: '', num: '', titolo: '', desc: '', valore: '' }}
          />
        </div>
      )}

      {tab === 'certificazioni' && (
        <div>
          {data.certificazioni.map((gruppo, gi) => (
            <div key={gi} className="adm-card">
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0 8px', marginBottom: '1rem' }}>
                <div className="adm-field" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: 11 }}>Icona</label>
                  <input className="adm-input" value={gruppo.icona || ''} onChange={e => {
                    const next = data.certificazioni.map((g, i) => i === gi ? { ...g, icona: e.target.value } : g)
                    onChange({ ...data, certificazioni: next })
                  }} />
                </div>
                <div className="adm-field" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: 11 }}>Categoria</label>
                  <input className="adm-input" value={gruppo.categoria || ''} onChange={e => {
                    const next = data.certificazioni.map((g, i) => i === gi ? { ...g, categoria: e.target.value } : g)
                    onChange({ ...data, certificazioni: next })
                  }} />
                </div>
              </div>
              <label style={{ fontSize: '.825rem', fontWeight: 600, display: 'block', marginBottom: '.5rem' }}>Voci</label>
              <ArrayEditor
                items={gruppo.voci}
                onChange={voci => {
                  const next = data.certificazioni.map((g, i) => i === gi ? { ...g, voci } : g)
                  onChange({ ...data, certificazioni: next })
                }}
                schema={[
                  { key: 'nome', label: 'Nome certificazione' },
                  { key: 'desc', label: 'Descrizione', type: 'textarea', rows: 2 },
                ]}
                addLabel="+ Aggiungi voce"
                emptyItem={{ nome: '', desc: '' }}
              />
            </div>
          ))}
        </div>
      )}

      {tab === 'impegni' && (
        <div className="adm-card">
          <div className="adm-card-title">Impegni ambientali</div>
          <ArrayEditor
            items={data.impegni}
            onChange={impegni => onChange({ ...data, impegni })}
            schema={[
              { key: 'icon', label: 'Icona' },
              { key: 'titolo', label: 'Titolo' },
              { key: 'desc', label: 'Descrizione', type: 'textarea', rows: 2 },
            ]}
            addLabel="+ Aggiungi impegno"
            emptyItem={{ icon: '', titolo: '', desc: '' }}
          />
        </div>
      )}
    </>
  )
}

// FOOTER
function FooterEditor({ data, onChange }) {
  function upd(key, value) {
    onChange({ ...data, [key]: value })
  }
  function updAz(azKey, field, value) {
    onChange({ ...data, [azKey]: { ...data[azKey], [field]: value } })
  }

  return (
    <>
      <div className="adm-card">
        <div className="adm-card-title">Brand</div>
        <Input label="Tagline" value={data.tagline} onChange={v => upd('tagline', v)} />
        <Input label="Claim" value={data.claim} onChange={v => upd('claim', v)} />
        <Input label="Copyright" value={data.copyright} onChange={v => upd('copyright', v)} />
      </div>
      <div className="adm-card">
        <div className="adm-card-title">Azienda 1 — Rhaura</div>
        <Input label="Nome" value={data.azienda1.nome} onChange={v => updAz('azienda1', 'nome', v)} />
        <Input label="Email" value={data.azienda1.email} onChange={v => updAz('azienda1', 'email', v)} />
        <Input label="PEC" value={data.azienda1.pec} onChange={v => updAz('azienda1', 'pec', v)} />
        <Input label="Rappresentante legale" value={data.azienda1.rappresentante} onChange={v => updAz('azienda1', 'rappresentante', v)} />
        <Input label="Telefono" value={data.azienda1.telefono} onChange={v => updAz('azienda1', 'telefono', v)} />
      </div>
      <div className="adm-card">
        <div className="adm-card-title">Azienda 2 — Omniagroup</div>
        <Input label="Nome" value={data.azienda2.nome} onChange={v => updAz('azienda2', 'nome', v)} />
        <Input label="Email" value={data.azienda2.email} onChange={v => updAz('azienda2', 'email', v)} />
        <Input label="PEC" value={data.azienda2.pec} onChange={v => updAz('azienda2', 'pec', v)} />
        <Input label="Telefono" value={data.azienda2.telefono} onChange={v => updAz('azienda2', 'telefono', v)} />
      </div>
    </>
  )
}

// ── MAIN PAGE EDITOR ─────────────────────────────────────────────────────────

export default function PageEditor() {
  const { section } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setData(null)
    setSaved(false)
    setError('')
    getContent(section)
      .then(remote => {
        setData(remote || DEFAULTS[section] || {})
        setLoading(false)
      })
      .catch(() => {
        setData(DEFAULTS[section] || {})
        setLoading(false)
      })
  }, [section])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await saveContent(section, data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !data) return <div className="adm-page">Caricamento…</div>

  const sectionLabel = SECTION_LABELS[section] || section

  function renderEditor() {
    switch (section) {
      case 'home': return <HomeEditor data={data} onChange={setData} />
      case 'chi-siamo': return <ChiSiamoEditor data={data} onChange={setData} />
      case 'prodotti': return <ProdottiEditor data={data} onChange={setData} />
      case 'contatti': return <ContattiEditor data={data} onChange={setData} />
      case 'aziende': return <AziendeEditor data={data} onChange={setData} />
      case 'qualita': return <QualitaEditor data={data} onChange={setData} />
      case 'footer': return <FooterEditor data={data} onChange={setData} />
      default: return <div className="adm-card">Sezione non riconosciuta: {section}</div>
    }
  }

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <h1>Contenuti – {sectionLabel}</h1>
        <button className="adm-btn adm-btn--ghost" onClick={() => navigate('/admin/dashboard')}>← Dashboard</button>
      </div>

      {saved && <div className="adm-alert adm-alert--success">Salvato con successo!</div>}
      {error && <div className="adm-alert adm-alert--error">{error}</div>}

      <form onSubmit={handleSave}>
        {renderEditor()}
        <div style={{ position: 'sticky', bottom: 0, background: 'var(--adm-bg)', padding: '1rem 0', borderTop: '1px solid var(--adm-border)', marginTop: '1rem' }}>
          <button className="adm-btn adm-btn--primary" type="submit" disabled={saving} style={{ minWidth: 160 }}>
            {saving ? 'Salvataggio…' : 'Salva modifiche'}
          </button>
        </div>
      </form>
    </div>
  )
}
