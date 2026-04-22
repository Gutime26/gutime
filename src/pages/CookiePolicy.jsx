import PageHero from '../components/PageHero'

const sections = [
  {
    id: 'cosa-sono',
    titolo: 'Cosa sono i cookie',
    corpo: `I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano e registrano sul suo terminale (computer, tablet, smartphone). Grazie ai cookie un sito ricorda le azioni e le preferenze dell'utente nel tempo, così non è necessario reinserirle ad ogni visita.`,
  },
  {
    id: 'base-giuridica',
    titolo: 'Base giuridica del trattamento',
    corpo: `Il trattamento dei dati tramite cookie tecnici si basa sul legittimo interesse del titolare (art. 6 par. 1 lett. f GDPR) in quanto strettamente necessari all'erogazione del servizio richiesto. Per i cookie di terze parti non strettamente necessari la base giuridica è il consenso dell'utente (art. 6 par. 1 lett. a GDPR).`,
  },
  {
    id: 'tipologie',
    titolo: 'Tipologie di cookie utilizzati',
    sottosezioni: [
      {
        titolo: 'Cookie tecnici e funzionali',
        colore: 'var(--green)',
        etichetta: 'Sempre attivi',
        voci: [
          {
            nome: 'Cookie di sessione / navigazione',
            scopo: 'Necessari al corretto funzionamento della navigazione nel sito (routing lato client, ripristino della posizione di scorrimento).',
            durata: 'Sessione',
            tipologia: 'Prima parte',
          },
          {
            nome: 'cookie_consent',
            scopo: 'Memorizza la preferenza espressa dall\'utente in merito ai cookie, evitando la riproposizione del banner ad ogni visita.',
            durata: '12 mesi',
            tipologia: 'Prima parte',
          },
        ],
      },
      {
        titolo: 'Cookie di terze parti – Google Maps',
        colore: 'var(--yellow)',
        etichetta: 'Richiedono consenso',
        voci: [
          {
            nome: 'Google Maps Embed',
            scopo: 'Il widget di Google Maps incorporato nella pagina Contatti può impostare cookie propri per la visualizzazione della mappa interattiva e per scopi statistici interni a Google.',
            durata: 'Variabile (fino a 2 anni)',
            tipologia: 'Terza parte – Google LLC',
            info: 'https://policies.google.com/privacy',
          },
        ],
      },
    ],
  },
  {
    id: 'gestione',
    titolo: 'Come gestire o disabilitare i cookie',
    corpo: `L'utente può revocare il consenso precedentemente espresso in qualsiasi momento, oppure modificare le proprie preferenze agendo direttamente sulle impostazioni del browser. Di seguito i collegamenti alle guide dei principali browser:`,
    browser: [
      { nome: 'Google Chrome', href: 'https://support.google.com/chrome/answer/95647' },
      { nome: 'Mozilla Firefox', href: 'https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie' },
      { nome: 'Apple Safari', href: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
      { nome: 'Microsoft Edge', href: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
    ],
    nota: `La disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito. La disabilitazione dei cookie di terze parti (es. Google Maps) comporta la mancata visualizzazione delle mappe interattive.`,
  },
  {
    id: 'titolare',
    titolo: 'Titolare del trattamento',
    corpo: `Il titolare del trattamento dei dati personali è RHAURA – OP – Società Cooperativa Agricola, con sede in Via Capolanza, 58 – 87011 Cassano allo Ionio (CS). Per esercitare i diritti di cui agli artt. 15–22 GDPR (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione) è possibile contattare il titolare all'indirizzo e-mail: amministrazione@rheaura.it`,
  },
  {
    id: 'aggiornamenti',
    titolo: 'Aggiornamenti alla presente policy',
    corpo: `La presente Cookie Policy può essere aggiornata in seguito a modifiche normative o tecniche. L'ultima versione sarà sempre disponibile a questa pagina. Si invita l'utente a consultarla periodicamente.`,
    data: 'Ultima revisione: aprile 2026',
  },
]

export default function CookiePolicy() {
  return (
    <>
      <PageHero
        tag="Informativa"
        title="Cookie Policy"
        subtitle="Come utilizziamo i cookie e come puoi gestire le tue preferenze."
        img="/images/hero-qualita.jpg"
        breadcrumb={[{ label: 'Cookie Policy' }]}
      />

      <section className="page-section">
        <div className="page-section__inner cp-wrap">

          {sections.map((s) => (
            <div className="cp-section" key={s.id} id={s.id}>
              <h2 className="cp-section__title">{s.titolo}</h2>

              {s.corpo && <p className="cp-section__body">{s.corpo}</p>}

              {s.browser && (
                <>
                  <ul className="cp-browser-list">
                    {s.browser.map((b) => (
                      <li key={b.nome}>
                        <a href={b.href} target="_blank" rel="noopener noreferrer">{b.nome}</a>
                      </li>
                    ))}
                  </ul>
                  {s.nota && <p className="cp-nota">{s.nota}</p>}
                </>
              )}

              {s.sottosezioni && s.sottosezioni.map((ss) => (
                <div className="cp-sottosezione" key={ss.titolo}>
                  <div className="cp-sottosezione__header" style={{ borderLeftColor: ss.colore }}>
                    <span className="cp-sottosezione__titolo">{ss.titolo}</span>
                    <span className="cp-badge" style={{ background: ss.colore }}>{ss.etichetta}</span>
                  </div>
                  <div className="cp-table-wrap">
                    <table className="cp-table">
                      <thead>
                        <tr>
                          <th>Nome / servizio</th>
                          <th>Scopo</th>
                          <th>Durata</th>
                          <th>Tipologia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ss.voci.map((v) => (
                          <tr key={v.nome}>
                            <td className="cp-table__nome">{v.nome}</td>
                            <td>{v.scopo}</td>
                            <td className="cp-table__durata">{v.durata}</td>
                            <td className="cp-table__tipo">
                              {v.info
                                ? <a href={v.info} target="_blank" rel="noopener noreferrer">{v.tipologia}</a>
                                : v.tipologia
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {s.data && <p className="cp-data">{s.data}</p>}
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
