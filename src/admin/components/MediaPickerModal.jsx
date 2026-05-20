import { useEffect, useState } from 'react'
import { getMedia, uploadImage } from '../lib/api'

const PRESETS = [
  { id: 'small',  label: 'Small',  width: 300 },
  { id: 'medium', label: 'Medium', width: 500 },
  { id: 'large',  label: 'Large',  width: 800 },
  { id: 'custom', label: 'Custom', width: null },
]

export default function MediaPickerModal({ onSelect, onClose }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState(null)   // { url, name }
  const [preset, setPreset] = useState('medium')
  const [customPx, setCustomPx] = useState(400)

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

  function handlePickImage(img) {
    setSelected({ url: img.url, name: img.pathname.split('/').pop() })
  }

  function handleInsert() {
    const width = preset === 'custom'
      ? Math.max(10, Math.min(customPx, 9999))
      : PRESETS.find(p => p.id === preset).width
    onSelect(selected.url, width)
  }

  if (selected) {
    return (
      <div className="adm-modal-backdrop" onClick={handleBackdrop}>
        <div className="adm-modal adm-modal--size-picker">
          <div className="adm-modal-header">
            <button className="adm-modal-back" onClick={() => setSelected(null)} title="Torna alla galleria">← Galleria</button>
            <button className="adm-modal-close" onClick={onClose} title="Chiudi">✕</button>
          </div>

          <div className="adm-modal-body adm-size-picker">
            <div className="adm-size-preview">
              <img src={selected.url} alt={selected.name} />
              <span className="adm-size-preview-name">{selected.name}</span>
            </div>

            <div className="adm-size-options">
              <p className="adm-size-label">Dimensione di inserimento</p>
              <div className="adm-size-presets">
                {PRESETS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className={`adm-size-btn${preset === p.id ? ' adm-size-btn--active' : ''}`}
                    onClick={() => setPreset(p.id)}
                  >
                    <span className="adm-size-btn-label">{p.label}</span>
                    {p.width && <span className="adm-size-btn-px">{p.width}px</span>}
                  </button>
                ))}
              </div>

              {preset === 'custom' && (
                <div className="adm-size-custom">
                  <label>Larghezza (px)</label>
                  <input
                    type="number"
                    min="10"
                    max="9999"
                    value={customPx}
                    onChange={e => setCustomPx(Number(e.target.value))}
                  />
                  <span className="adm-size-custom-note">Altezza proporzionale automatica</span>
                </div>
              )}

              <p className="adm-size-proportional">Proporzioni vincolate — altezza automatica</p>

              <button className="adm-btn adm-btn--primary adm-size-insert" onClick={handleInsert}>
                Inserisci immagine
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
                  onClick={() => handlePickImage(img)}
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
