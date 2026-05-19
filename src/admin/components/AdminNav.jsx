import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../lib/api'

const sections = [
  { label: 'Contenuti', items: [
    { to: '/admin/contenuti/home', label: 'Home' },
    { to: '/admin/contenuti/chi-siamo', label: 'Chi siamo' },
    { to: '/admin/contenuti/prodotti', label: 'Prodotti' },
    { to: '/admin/contenuti/contatti', label: 'Contatti' },
    { to: '/admin/contenuti/aziende', label: 'Le aziende' },
    { to: '/admin/contenuti/qualita', label: 'Qualità' },
    { to: '/admin/contenuti/footer', label: 'Footer' },
  ]},
  { label: 'News', items: [
    { to: '/admin/news', label: 'Tutti gli articoli' },
    { to: '/admin/news/new', label: '+ Nuovo articolo' },
  ]},
  { label: 'Media', items: [
    { to: '/admin/media', label: 'Galleria immagini' },
  ]},
]

export default function AdminNav({ onClose }) {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      <div className="adm-logo">
        <span>GUTIME</span>
        <span className="adm-logo-sub">Admin</span>
      </div>
      <div className="adm-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
          Dashboard
        </NavLink>
        {sections.map(s => (
          <div key={s.label}>
            <div className="adm-nav-section">{s.label}</div>
            {s.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <button className="adm-logout" onClick={handleLogout}>Esci</button>
    </aside>
  )
}
