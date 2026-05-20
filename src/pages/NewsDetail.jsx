import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NewsDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/news/${slug}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null }
        return r.json()
      })
      .then(data => { if (data) { setArticle(data); setLoading(false) } })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [slug])

  if (loading) return <div className="page-section"><div className="page-section__inner"><p>Caricamento…</p></div></div>

  if (notFound) return (
    <>
      <PageHero tag="News" title="Articolo non trovato" img="/images/hero-chi-siamo.jpg" breadcrumb={[{ label: 'News', to: '/news' }, { label: 'Non trovato' }]} />
      <section className="page-section"><div className="page-section__inner"><Link to="/news" className="btn btn-primary">← Torna alle news</Link></div></section>
    </>
  )

  return (
    <>
      <PageHero
        tag="News &amp; Eventi"
        title={article.title}
        date={article.date}
        img={article.image || '/images/hero-chi-siamo.jpg'}
      />
      <section className="page-section">
        <div className="page-section__inner" style={{ maxWidth: 800 }}>
          <div className="news-body" dangerouslySetInnerHTML={{ __html: article.body }} />
          <div style={{ marginTop: '2rem' }}>
            <Link to="/news" className="btn btn-outline">← Torna alle news</Link>
          </div>
        </div>
      </section>
    </>
  )
}
