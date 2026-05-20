import { useEffect, useState } from 'react'
import { getMedia, uploadImage } from '../lib/api'

export default function MediaPickerModal({ onSelect, onClose }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    getMedia().then(list => { setImages(list); setLoading(false) })
  }, [])

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      await uploadImage(file)
      const list = await getMedia()
      setImages(list)
    } finally {
      setUploading(false)
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="adm-modal-backdrop" onClick={handleBackdrop}>
      <div className="adm-modal">
        <div className="adm-modal-header">
          <h2>Galleria media</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label className="adm-btn adm-btn--ghost" style={{ cursor: 'pointer', fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
              {uploading ? 'Caricamento…' : '+ Carica'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
            </label>
            <button className="adm-modal-close" onClick={onClose} title="Chiudi">✕</button>
          </div>
        </div>

        <div className="adm-modal-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--adm-muted)' }}>Caricamento…</div>
          ) : images.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--adm-muted)' }}>Nessuna immagine. Carica la prima.</div>
          ) : (
            <div className="adm-media-grid">
              {images.map(img => (
                <button
                  key={img.url}
                  type="button"
                  className="adm-media-thumb"
                  onClick={() => onSelect(img.url)}
                  title={img.pathname.split('/').pop()}
                >
                  <img src={img.url} alt={img.pathname.split('/').pop()} />
                  <span>{img.pathname.split('/').pop()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
