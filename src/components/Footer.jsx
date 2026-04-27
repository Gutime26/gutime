export default function Footer() {
  return (
    <footer id="contatti">
      <div className="footer-inner">

        {/* Colonna 1 – Brand */}
        <div className="footer-col footer-brand">
          <img src="/logo-gutime_neg.png" alt="GUTIME" />
          <div className="tagline">Gusti Tipici Mediterranei</div>
          <div className="footer-desc">La filiera che unisce la terra, crea valore, arriva a te.</div>
          <img src="/images/loghi-progetto-white.png" alt="Loghi progetto" className="footer-loghi" />
        </div>

        {/* Colonna 2 – Rhaura */}
        <div className="footer-col">
          <div className="footer-company">RHAURA – OP – SOCIETÀ COOPERATIVA AGRICOLA</div>
          <ul className="footer-contacts">
            <li>
              <span className="footer-label">Email</span>
              <a href="mailto:amministrazione@rheaura.it">amministrazione@rheaura.it</a>
            </li>
            <li>
              <span className="footer-label">PEC</span>
              <a href="mailto:rheaura@pec.it">rheaura@pec.it</a>
            </li>
            <li>
              <span className="footer-label">Rappr. legale</span>
              <span>Vocaturi Leonardo</span>
            </li>
            <li>
              <span className="footer-label">Tel.</span>
              <a href="tel:+393272682994">327 268 2994</a>
            </li>
          </ul>
        </div>

        {/* Colonna 3 – Omniagroup */}
        <div className="footer-col">
          <div className="footer-company">OMNIAGROUP CONSULTING S.R.L.S.</div>
          <ul className="footer-contacts">
            <li>
              <span className="footer-label">Email</span>
              <a href="mailto:amministrazione.omniagroup@gmail.com">amministrazione.omniagroup@gmail.com</a>
            </li>
            <li>
              <span className="footer-label">PEC</span>
              <a href="mailto:omniagroupconsulting@pec.it">omniagroupconsulting@pec.it</a>
            </li>
            <li>
              <span className="footer-label">Tel.</span>
              <a href="tel:+390984910083">0984/910083</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; 2026 GUTIME. Tutti i diritti riservati.
        {' · '}
        <a href="/cookie-policy" className="footer-bottom__link">Cookie Policy</a>
      </div>
    </footer>
  )
}
