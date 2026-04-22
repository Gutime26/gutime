export const filiераSteps = [
  { icon: '🌱', num: '01', titolo: 'Coltivazione', desc: 'Nei campi del Sud Italia le aziende coltivano clementine, arance, pesche e ortaggi nel rispetto dei tempi naturali e del territorio.', valore: 'Autenticità e qualità alla fonte' },
  { icon: '🚜', num: '02', titolo: 'Raccolta',      desc: 'I prodotti vengono raccolti nel momento ideale di maturazione, preservando gusto, freschezza e proprietà nutrizionali.', valore: 'Freschezza e stagionalità' },
  { icon: '🏭', num: '03', titolo: 'Lavorazione',   desc: 'Le strutture della filiera selezionano, lavorano e trasformano i prodotti secondo standard condivisi e controllati.', valore: 'Sicurezza e qualità costante' },
  { icon: '📦', num: '04', titolo: 'Confezionamento', desc: 'Ogni prodotto viene preparato e distribuito attraverso una rete organizzata ed efficiente.', valore: 'Continuità e affidabilità' },
  { icon: '🛒', num: '05', titolo: 'Distribuzione',  desc: 'I prodotti GUTIME raggiungono il mercato consumer e i partner B2B, mantenendo integrità e tracciabilità.', valore: 'Accessibilità e presenza sul mercato' },
  { icon: '🍊', num: '06', titolo: 'Il consumatore', desc: 'Sulla tavola arriva un prodotto controllato, sicuro e di origine garantita.', valore: 'Fiducia e qualità riconoscibile' },
]

export const certificazioni = [
  {
    categoria: 'Standard di produzione',
    colore: 'var(--green)',
    icona: '🌿',
    voci: [
      {
        nome: 'Produzione Integrata',
        desc: "Sistema che ottimizza le risorse naturali e riduce l'impatto ambientale, garantendo prodotti di qualità nel rispetto dell'ecosistema.",
        logo: '/images/cert/sqnpi.jpg',
        logoBg: '#fff',
      },
      {
        nome: 'Agricoltura Biologica',
        desc: "Coltivazioni senza sostanze chimiche di sintesi, nel rispetto della natura, della biodiversità e della salute del consumatore.",
        logo: '/images/cert/bio-eu.svg',
        logoBg: '#fff',
      },
    ],
  },
  {
    categoria: 'Tracciabilità e gestione qualità',
    colore: 'var(--yellow)',
    icona: '🔍',
    voci: [
      {
        nome: 'UNI EN ISO 22005',
        desc: "Certifica la tracciabilità lungo tutta la filiera agroalimentare, monitorando ogni fase del processo produttivo.",
        logo: '/images/cert/iso-generic.svg',
        logoBg: '#fff',
      },
      {
        nome: 'UNI EN ISO 9001',
        desc: "Sistema di gestione della qualità che assicura processi efficienti, controllati e orientati al miglioramento continuo.",
        logo: '/images/cert/iso9001.svg',
        logoBg: '#fff',
      },
    ],
  },
  {
    categoria: 'Sostenibilità ambientale',
    colore: 'var(--green)',
    icona: '♻️',
    voci: [
      {
        nome: 'UNI EN ISO 14001',
        desc: "Standard internazionale per la gestione ambientale, con l'obiettivo di ridurre l'impatto delle attività produttive sull'ambiente.",
        logo: '/images/cert/iso14001.jpg',
        logoBg: '#fff',
      },
    ],
  },
  {
    categoria: 'Standard internazionali di filiera',
    colore: 'var(--red)',
    icona: '🌍',
    voci: [
      {
        nome: 'GLOBALG.A.P.',
        desc: "Certificazione globale per le buone pratiche agricole: sicurezza, qualità e sostenibilità delle produzioni.",
        logo: '/images/cert/globalgap.svg',
        logoBg: '#fff',
      },
      {
        nome: 'IFS Food',
        desc: "Standard internazionale che certifica la sicurezza e la qualità dei processi di lavorazione e trasformazione alimentare.",
        logo: '/images/cert/ifs-food.svg',
        logoBg: '#fff',
      },
      {
        nome: 'GRASP',
        desc: "Modulo integrativo di GLOBALG.A.P. che attesta il rispetto delle buone pratiche sociali e delle condizioni di lavoro.",
        logo: '/images/cert/globalgap.svg',
        logoBg: '#fff',
      },
    ],
  },
]

export const impegniAmbientali = [
  {
    icon: '💧',
    titolo: "Gestione responsabile dell'acqua",
    desc: 'Sistemi di irrigazione a basso consumo e monitoraggio dei prelievi idrici per preservare le risorse del territorio.',
  },
  {
    icon: '🌍',
    titolo: 'Riduzione delle emissioni',
    desc: "Ottimizzazione della logistica e dei trasporti per minimizzare l'impronta carbonica lungo tutta la filiera.",
  },
  {
    icon: '♻️',
    titolo: 'Economia circolare',
    desc: 'Riduzione degli sprechi produttivi e recupero degli scarti di lavorazione, in un modello orientato alla circolarità.',
  },
  {
    icon: '🌱',
    titolo: 'Tutela della biodiversità',
    desc: 'Pratiche agricole che preservano gli ecosistemi locali, la flora spontanea e la fauna presente nei territori coltivati.',
  },
  {
    icon: '☀️',
    titolo: 'Energia sostenibile',
    desc: "Orientamento all'utilizzo di fonti rinnovabili nelle strutture produttive e di lavorazione della filiera.",
  },
  {
    icon: '📋',
    titolo: 'Conformità normativa',
    desc: 'Piena adesione alle normative europee e nazionali in materia ambientale, con certificazione ISO 14001.',
  },
]
