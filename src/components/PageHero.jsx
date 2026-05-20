import { Link } from 'react-router-dom'

export default function PageHero({ tag, title, subtitle, date, img, breadcrumb = [] }) {
  return (
    <div className="page-hero" style={{ backgroundImage: `url('${img}')` }}>
      <div className="page-hero__overlay" />
      <div className="page-hero__content">
        {breadcrumb.length > 0 && (
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            {breadcrumb.map((b) => (
              <span key={b.label}>
                <span className="breadcrumb__sep">›</span>
                {b.to ? <Link to={b.to}>{b.label}</Link> : <span>{b.label}</span>}
              </span>
            ))}
          </div>
        )}
        {tag && <span className="hero-tag">{tag}</span>}
        <h1>{title}</h1>
        {date && <p className="page-hero__date">{date}</p>}
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
