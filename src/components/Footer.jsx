// Footer.jsx — Logo "The Spy's Blend 24/7" en pied de page
export default function Footer({ theme }) {
  const logoSrc = theme === 'dark' ? '/logo_247_light.png' : '/logo_247_dark.png'

  return (
    <footer className="footer">
      <div className="gold-divider" />
      <img
        src={logoSrc}
        alt="The Spy's Blend — Brewing 24/7"
        className="footer__logo"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <p className="footer__copy">© 2021 James Bond 007 Coffee Shop · Kelibia</p>
    </footer>
  )
}
