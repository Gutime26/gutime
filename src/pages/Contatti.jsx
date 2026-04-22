import { useState } from 'react'
import PageHero from '../components/PageHero'

const aziende = [
  {
    nome: "RHEAURA – OP – SOCIETÀ COOPERATIVA AGRICOLA",
    contatti: [
      { icon: '✉️', label: 'Email',     value: 'amministrazione@rheaura.it',  href: 'mailto:amministrazione@rheaura.it' },
      { icon: '🔒', label: 'PEC',       value: 'rheaura@pec.it',              href: 'mailto:rheaura@pec.it' },
      { icon: '📞', label: 'Tel.',       value: '327 268 2994',                href: 'tel:+393272682994' },
      { icon: '👤', label: 'Rappr.',     value: 'Vocaturi Leonardo',           href: null },
      { icon: '📍', label: 'Indirizzo', value: 'Via Capolanza, 58 – 87011 Cassano allo Ionio (CS)', href: null },
    ],
  },
  {
    nome: "OMNIAGROUP CONSULTING S.R.L.S.",
    contatti: [
      { icon: '✉️', label: 'Email', value: 'amministrazione.omniagroup@gmail.com', href: 'mailto:amministrazione.omniagroup@gmail.com' },
      { icon: '🔒', label: 'PEC',   value: 'omniagroupconsulting@pec.it',          href: 'mailto:omniagroupconsulting@pec.it' },
      { icon: '📞', label: 'Tel.',  value: '0984/910083',                           href: 'tel:+390984910083' },
    ],
  },
]

export default function Contatti() {
  const [form, setForm] = useState({ nome: '', cognome: '', email: '', telefono: '', messaggio: '', privacy: false })
  const [inviato, setInviato] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setInviato(true)
  }

  return (
    <>
      <PageHero
        tag="Contatti"
        title="Scrivici"
        subtitle="Siamo a tua disposizione per informazioni, collaborazioni e richieste commerciali."
        img="/images/hero-certificazioni.jpg"
        breadcrumb={[{ label: 'Contatti' }]}
      />

      <section className="page-section ct-section">
        <div className="page-section__inner ct-inner">

          {/* ── FORM ── */}
          <div className="ct-form-wrap">
            <span className="section-tag">Inviaci un messaggio</span>
            <h2>Parliamoci</h2>
            <div className="divider" />

            {inviato ? (
              <div className="ct-success">
                <span className="ct-success__icon">✅</span>
                <h3>Messaggio inviato!</h3>
                <p>Ti risponderemo al più presto.</p>
                <button className="btn btn-primary" onClick={() => setInviato(false)}>Nuovo messaggio</button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-form__row">
                  <div className="ct-field">
                    <label htmlFor="nome">Nome *</label>
                    <input id="nome" name="nome" type="text" value={form.nome} onChange={handleChange} required />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="cognome">Cognome *</label>
                    <input id="cognome" name="cognome" type="text" value={form.cognome} onChange={handleChange} required />
                  </div>
                </div>
                <div className="ct-form__row">
                  <div className="ct-field">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="telefono">Telefono</label>
                    <input id="telefono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} />
                  </div>
                </div>
                <div className="ct-field">
                  <label htmlFor="messaggio">Messaggio *</label>
                  <textarea id="messaggio" name="messaggio" rows={5} placeholder="Scrivi qui il tuo messaggio…" value={form.messaggio} onChange={handleChange} required />
                </div>
                <div className="ct-field ct-field--check">
                  <input id="privacy" name="privacy" type="checkbox" checked={form.privacy} onChange={handleChange} required />
                  <label htmlFor="privacy">
                    Ho letto e accetto il <a href="#" onClick={e => e.preventDefault()}>trattamento dei dati personali</a> ai sensi del Regolamento UE 2016/679 (GDPR). *
                  </label>
                </div>
                <button type="submit" className="btn btn-primary ct-submit" disabled={!form.privacy}>
                  Invia messaggio →
                </button>
              </form>
            )}
          </div>

          {/* ── INFO + MAPPA ── */}
          <div className="ct-info">
            {aziende.map((az) => (
              <div className="ct-azienda" key={az.nome}>
                <div className="ct-azienda__nome">{az.nome}</div>
                <ul className="ct-azienda__list">
                  {az.contatti.map((c) => (
                    <li key={c.label}>
                      <span className="ct-ci">{c.icon}</span>
                      <div>
                        <span className="ct-label">{c.label}</span>
                        {c.href
                          ? <a href={c.href}>{c.value}</a>
                          : <span>{c.value}</span>
                        }
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="ct-map">
              <iframe
                title="Sede RHAURA – Via Capolanza 58, Cassano allo Ionio"
                src="https://maps.google.com/maps?q=Via+Capolanza+58+Cassano+allo+Ionio+CS+Italy&output=embed&z=15"
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: '14px', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
