import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNewsList, deleteNewsArticle } from '../lib/api'

export default function NewsList() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getNewsList().then(list => { setNews(list); setLoading(false) })
  }, [])

  async function handleDelete(id, title) {
    if (!confirm(`Eliminare "${title}"?`)) return
    setDeleting(id)
    setError(null)
    try {
      await deleteNewsArticle(id)
      setNews(n => n.filter(a => a.id !== id))
    } catch (err) {
      setError(`Errore durante l'eliminazione: ${err.message}`)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <h1>News &amp; articoli</h1>
        <Link to="/admin/news/new" className="adm-btn adm-btn--primary">+ Nuovo articolo</Link>
      </div>

      {error && (
        <div className="adm-card" style={{ background: '#fef2f2', color: '#b91c1c', marginBottom: 16 }}>{error}</div>
      )}

      {loading ? (
        <div>Caricamento…</div>
      ) : news.length === 0 ? (
        <div className="adm-card">Nessun articolo. <Link to="/admin/news/new">Crea il primo →</Link></div>
      ) : (
        <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Data</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {news.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 500 }}>{a.title}</td>
                  <td style={{ color: 'var(--adm-muted)' }}>{a.date}</td>
                  <td>
                    <span className={`adm-badge ${a.published ? 'adm-badge--green' : 'adm-badge--gray'}`}>
                      {a.published ? 'Pubblicato' : 'Bozza'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link to={`/admin/news/${a.id}`} className="adm-btn adm-btn--ghost" style={{ padding: '4px 10px' }}>Modifica</Link>
                      <button className="adm-btn adm-btn--danger" style={{ padding: '4px 10px' }} disabled={deleting === a.id} onClick={() => handleDelete(a.id, a.title)}>{deleting === a.id ? 'Eliminazione…' : 'Elimina'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
