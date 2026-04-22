import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'all')
    setVisible(false)
  }

  function necessary() {
    localStorage.setItem('cookie_consent', 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Informativa cookie">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <strong>Utilizziamo i cookie</strong>
          <p>
            Questo sito usa cookie tecnici necessari al funzionamento e cookie di terze parti (Google Maps)
            per la visualizzazione delle mappe. Puoi accettare tutti i cookie o limitarti a quelli necessari.{' '}
            <Link to="/cookie-policy" className="cookie-banner__link">Scopri di più</Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button className="cookie-btn cookie-btn--secondary" onClick={necessary}>Solo necessari</button>
          <button className="cookie-btn cookie-btn--primary" onClick={accept}>Accetta tutti</button>
        </div>
      </div>
    </div>
  )
}
