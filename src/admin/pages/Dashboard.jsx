import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNewsList } from '../lib/api'

export default function Dashboard() {
  const [newsCount, setNewsCount] = useState(0)
  const [publishedCount, setPublishedCount] = useState(0)

  useEffect(() => {
    getNewsList().then(list => {
      setNewsCount(list.length)
      setPublishedCount(list.filter(n => n.published).length)
    })
  }, [])

  const sezioni = [
    { label: 'Home', to: '/admin/contenuti/home', icon: '🏠' },
    { label: 'Chi siamo', to: '/admin/contenuti/chi-siamo', icon: '👥' },
    { label: 'Prodotti', to: '/admin/contenuti/prodotti', icon: '🍊' },
    { label: 'Contatti', to: '/admin/contenuti/contatti', icon: '📞' },
    { label: 'Le aziende', to: '/admin/contenuti/aziende', icon: '🏭' },
    { label: 'Qualità', to: '/admin/contenuti/qualita', icon: '🏅' },
    { label: 'Footer', to: '/admin/contenuti/footer', icon: '📄' },
  ]

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <h1>Dashboard</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="adm-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--adm-accent)' }}>{newsCount}</div>
          <div style={{ color: 'var(--adm-muted)' }}>Articoli totali</div>
        </div>
        <div className="adm-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--adm-success)' }}>{publishedCount}</div>
          <div style={{ color: 'var(--adm-muted)' }}>Articoli pubblicati</div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">Gestisci contenuti</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
          {sezioni.map(s => (
            <Link key={s.to} to={s.to} className="adm-btn adm-btn--ghost" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '1rem' }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span>{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-title">News</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/admin/news" className="adm-btn adm-btn--ghost">Vedi tutti gli articoli</Link>
          <Link to="/admin/news/new" className="adm-btn adm-btn--primary">+ Nuovo articolo</Link>
        </div>
      </div>
    </div>
  )
}
