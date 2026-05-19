import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getNewsArticle, saveNewsArticle } from '../lib/api'
import ImageUpload from '../components/ImageUpload'

const empty = { title: '', slug: '', date: new Date().toISOString().slice(0, 10), excerpt: '', body: '', image: '', published: false }

export default function NewsEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      getNewsArticle(id).then(data => {
        if (data) setForm(data)
        setLoading(false)
      })
    }
  }, [id, isNew])

  function set(field, value) {
    if (field === 'title' && isNew) {
      setForm(f => ({ ...f, title: value, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }))
    } else {
      setForm(f => ({ ...f, [field]: value }))
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const saved_article = await saveNewsArticle(isNew ? null : id, form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      if (isNew) navigate(`/admin/news/${saved_article.id}`, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="adm-page">Caricamento…</div>

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <h1>{isNew ? 'Nuovo articolo' : 'Modifica articolo'}</h1>
        <button className="adm-btn adm-btn--ghost" onClick={() => navigate('/admin/news')}>← Torna alla lista</button>
      </div>

      {saved && <div className="adm-alert adm-alert--success">Salvato!</div>}
      {error && <div className="adm-alert adm-alert--error">{error}</div>}

      <form onSubmit={handleSave}>
        <div className="adm-card">
          <div className="adm-card-title">Contenuto</div>
          <div className="adm-field">
            <label>Titolo *</label>
            <input className="adm-input" type="text" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>
          <div className="adm-field">
            <label>Slug (URL)</label>
            <input className="adm-input" type="text" value={form.slug} onChange={e => set('slug', e.target.value)} />
          </div>
          <div className="adm-field">
            <label>Data</label>
            <input className="adm-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div className="adm-field">
            <label>Excerpt (anteprima)</label>
            <textarea className="adm-textarea" rows={3} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} />
          </div>
          <div className="adm-field">
            <label>Corpo articolo (HTML)</label>
            <textarea className="adm-textarea" rows={12} value={form.body} onChange={e => set('body', e.target.value)} placeholder="Puoi usare HTML: <p>, <strong>, <ul>, <li>, <h2>, ecc." />
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-title">Immagine e pubblicazione</div>
          <ImageUpload value={form.image} onChange={url => set('image', url)} label="Immagine articolo" />
          <div className="adm-field" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="published" checked={form.published} onChange={e => set('published', e.target.checked)} />
            <label htmlFor="published" style={{ marginBottom: 0, cursor: 'pointer' }}>Pubblicato (visibile sul sito)</label>
          </div>
        </div>

        <button className="adm-btn adm-btn--primary" type="submit" disabled={saving}>
          {saving ? 'Salvataggio…' : 'Salva articolo'}
        </button>
      </form>
    </div>
  )
}
