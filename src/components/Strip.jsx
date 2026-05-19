import { useState, useEffect } from 'react'

const FALLBACK = [
  { num: '18',   label: 'Aziende in filiera' },
  { num: '100%', label: 'Prodotti tracciabili' },
  { num: 'Sud',  label: 'Italia, origine autentica' },
  { num: '∞',    label: 'Tradizione agricola' },
]

export default function Strip() {
  const [items, setItems] = useState(FALLBACK)

  useEffect(() => {
    fetch('/api/content/home')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.strip?.length) setItems(data.strip) })
      .catch(() => {})
  }, [])

  return (
    <div className="strip">
      {items.map((item) => (
        <div className="strip-item" key={item.label}>
          <div className="num">{item.num}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
