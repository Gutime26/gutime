import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.ok ? r.json() : [])
      .then(list => { setNews(list.filter(n => n.published)); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <PageHero
        tag="News &amp; Eventi"
        title="Aggiornamenti dalla filiera"
        subtitle="Le ultime notizie, eventi e comunicazioni di GUTIME."
        img="/images/hero-chi-siamo.jpg"
        breadcrumb={[{ label: 'News & Eventi' }]}
      />
      <section className="page-section">
        <div className="page-section__inner">
          {loading ? (
            <p>Caricamento…</p>
          ) : news.length === 0 ? (
            <p className="lead">Nessun articolo pubblicato per ora. Torna presto!</p>
          ) : (
            <div className="news-grid">
              {news.map(n => (
                <Link key={n.id} to={`/news/${n.slug || n.id}`} className="news-card">
                  {n.image && <div className="news-card__img"><img src={n.image} alt={n.title} /></div>}
                  <div className="news-card__body">
                    <div className="news-card__date">{n.date}</div>
                    <h3>{n.title}</h3>
                    {n.excerpt && <p>{n.excerpt}</p>}
                    <span className="news-card__cta">Leggi →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
