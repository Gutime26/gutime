export default function AziendaCard({ azienda, accent = 'var(--yellow)' }) {
  const { nome, ruolo, focus, indirizzo, telefono, email, pec, sito, referente, highlight } = azienda

  return (
    <div className={`azienda-card${highlight ? ' azienda-card--highlight' : ''}`} style={{ '--accent': accent }}>
      <div className="azienda-card__header">
        <h3 className="azienda-card__nome">{nome}</h3>
        {ruolo && <span className="azienda-card__ruolo">{ruolo}</span>}
      </div>
      <p className="azienda-card__focus">{focus}</p>
      <ul className="azienda-card__contacts">
        <li>
          <span className="ci">📍</span>
          <span>{indirizzo}</span>
        </li>
        {telefono && (
          <li>
            <span className="ci">📞</span>
            <a href={`tel:${telefono.replace(/\s|\//g, '')}`}>{telefono}</a>
          </li>
        )}
        {email && (
          <li>
            <span className="ci">✉️</span>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        )}
        {pec && (
          <li>
            <span className="ci">🔒</span>
            <a href={`mailto:${pec}`}>{pec}</a>
          </li>
        )}
        {sito && (
          <li>
            <span className="ci">🌐</span>
            <a href={`https://${sito}`} target="_blank" rel="noreferrer">{sito}</a>
          </li>
        )}
        <li>
          <span className="ci">👤</span>
          <span>{referente}</span>
        </li>
      </ul>
    </div>
  )
}
