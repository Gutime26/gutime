import { useState } from 'react'
import { uploadImage } from '../lib/api'

export default function ImageUpload({ value, onChange, label = 'Immagine' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const { url } = await uploadImage(file)
      onChange(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="adm-field">
      <label>{label}</label>
      {value && <img src={value} alt="preview" style={{ maxHeight: 120, borderRadius: 6, marginBottom: 8, display: 'block' }} />}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input className="adm-input" type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="URL immagine" style={{ flex: 1 }} />
        <label className="adm-btn adm-btn--ghost" style={{ cursor: 'pointer', margin: 0 }}>
          {uploading ? 'Caricamento…' : 'Carica'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {error && <div style={{ color: 'var(--adm-danger)', fontSize: 12, marginTop: 4 }}>{error}</div>}
    </div>
  )
}
