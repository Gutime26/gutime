import { useEffect, useState } from 'react'
import { getMedia, deleteMedia, uploadImage } from '../lib/api'

export default function Media() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

  function load() {
    setLoading(true)
    getMedia().then(list => { setImages(list); setLoading(false) })
  }

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      await uploadImage(file)
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(url, name) {
    if (!confirm(`Eliminare "${name}"?`)) return
    await deleteMedia(url)
    setImages(imgs => imgs.filter(i => i.url !== url))
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <h1>Galleria media</h1>
        <label className="adm-btn adm-btn--primary" style={{ cursor: 'pointer' }}>
          {uploading ? 'Caricamento…' : '+ Carica immagine'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {error && <div className="adm-alert adm-alert--error">{error}</div>}

      {loading ? (
        <div>Caricamento…</div>
      ) : images.length === 0 ? (
        <div className="adm-card">Nessuna immagine caricata.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {images.map(img => (
            <div key={img.url} className="adm-card" style={{ padding: '0.75rem' }}>
              <img src={img.url} alt={img.pathname} style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }} />
              <div style={{ fontSize: 11, color: 'var(--adm-muted)', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {img.pathname.split('/').pop()}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="adm-btn adm-btn--ghost" style={{ flex: 1, padding: '4px 8px', fontSize: 12 }} onClick={() => copyUrl(img.url)}>Copia URL</button>
                <button className="adm-btn adm-btn--danger" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => handleDelete(img.url, img.pathname.split('/').pop())}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
