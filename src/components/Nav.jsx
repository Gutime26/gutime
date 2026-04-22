import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeSub, setActiveSub] = useState(null)
  const location = useLocation()

  useEffect(() => { setOpen(false); setActiveSub(null) }, [location])

  function close() { setOpen(false); setActiveSub(null) }
  function toggleSub(name, e) { e.preventDefault(); setActiveSub(s => s === name ? null : name) }

  return (
    <nav>
      <Link className="logo" to="/" onClick={close}>
        <img src="/logo-gutime.png" alt="GUTIME – Gusti Tipici Mediterranei" />
      </Link>

      <button
        className={`nav-hamburger${open ? ' nav-hamburger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Chiudi menu' : 'Apri menu'}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={open ? 'nav__menu--open' : ''}>
        <li><Link to="/" onClick={close}>Home</Link></li>
        <li><Link to="/chi-siamo" onClick={close}>Chi siamo</Link></li>
        <li><Link to="/prodotti" onClick={close}>Prodotti</Link></li>
        <li className={`has-sub${activeSub === 'aziende' ? ' has-sub--open' : ''}`}>
          <Link to="/le-aziende" onClick={close}>Le aziende</Link>
          <button className="nav-sub-toggle" onClick={(e) => toggleSub('aziende', e)} aria-label="Espandi">▾</button>
          <ul className="dropdown">
            <li><Link to="/le-aziende/produzione-primaria" onClick={close}>Produzione primaria</Link></li>
            <li><Link to="/le-aziende/trasformazione-commercializzazione" onClick={close}>Trasformazione e commercializzazione</Link></li>
            <li><Link to="/le-aziende/ricerca-innovazione" onClick={close}>Ricerca e innovazione</Link></li>
          </ul>
        </li>
        <li className={`has-sub${activeSub === 'qualita' ? ' has-sub--open' : ''}`}>
          <Link to="/qualita-sostenibilita" onClick={close}>Qualità e sostenibilità</Link>
          <button className="nav-sub-toggle" onClick={(e) => toggleSub('qualita', e)} aria-label="Espandi">▾</button>
          <ul className="dropdown">
            <li><Link to="/qualita-sostenibilita/certificazioni" onClick={close}>Certificazioni</Link></li>
            <li><Link to="/qualita-sostenibilita/impegno-ambientale" onClick={close}>Impegno ambientale</Link></li>
          </ul>
        </li>
        <li><a href="#" onClick={close}>News &amp; Eventi</a></li>
        <li><Link to="/contatti" onClick={close}>Contatti</Link></li>
      </ul>
    </nav>
  )
}
