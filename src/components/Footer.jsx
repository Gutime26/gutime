import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const FALLBACK = {
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

export default function Footer() {
  const [d, setD] = useState(FALLBACK)

  useEffect(() => {
    fetch('/api/content/footer')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setD(data) })
      .catch(() => {})
  }, [])

  return (
    <footer id="contatti">
      <div className="footer-inner">

        {/* Colonna 1 – Brand */}
        <div className="footer-col footer-brand">
          <img src="/logo-gutime_neg.png" alt="GUTIME" />
          <div className="tagline">{d.tagline}</div>
          <div className="footer-desc">{d.claim}</div>
          <img src="/images/loghi-progetto-white.png" alt="Loghi progetto" className="footer-loghi" />
        </div>

        {/* Colonna 2 – Azienda 1 */}
        <div className="footer-col">
          <div className="footer-company">{d.azienda1.nome}</div>
          <ul className="footer-contacts">
            <li>
              <span className="footer-label">Email</span>
              <a href={`mailto:${d.azienda1.email}`}>{d.azienda1.email}</a>
            </li>
            <li>
              <span className="footer-label">PEC</span>
              <a href={`mailto:${d.azienda1.pec}`}>{d.azienda1.pec}</a>
            </li>
            <li>
              <span className="footer-label">Rappr. legale</span>
              <span>{d.azienda1.rappresentante}</span>
            </li>
            <li>
              <span className="footer-label">Tel.</span>
              <a href={`tel:+39${d.azienda1.telefono.replace(/\D/g, '')}`}>{d.azienda1.telefono}</a>
            </li>
          </ul>
        </div>

        {/* Colonna 3 – Azienda 2 */}
        <div className="footer-col">
          <div className="footer-company">{d.azienda2.nome}</div>
          <ul className="footer-contacts">
            <li>
              <span className="footer-label">Email</span>
              <a href={`mailto:${d.azienda2.email}`}>{d.azienda2.email}</a>
            </li>
            <li>
              <span className="footer-label">PEC</span>
              <a href={`mailto:${d.azienda2.pec}`}>{d.azienda2.pec}</a>
            </li>
            <li>
              <span className="footer-label">Tel.</span>
              <a href={`tel:+39${d.azienda2.telefono.replace(/\D/g, '')}`}>{d.azienda2.telefono}</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        {d.copyright}
        {' · '}
        <Link to="/cookie-policy" className="footer-bottom__link">Cookie Policy</Link>
      </div>
    </footer>
  )
}
