// Composant Header — logo réel (dark/light), slogan, toggle thème
import ThemeToggle from './ThemeToggle'

export default function Header({ theme, toggleTheme }) {
  // dark theme → logo crème (texte clair sur fond sombre)
  // light theme → logo sombre (texte foncé sur fond clair)
  const logoSrc = theme === 'dark' ? '/logo_bond_light.png' : '/logo_bond_dark.png'

  return (
    <header className="header">
      <div className="header__top">
        {/* Logo principal — contient déjà le titre "James Bond 007 CoffeeShop" */}
        <img
          className="header__logo-main"
          src={logoSrc}
          alt="James Bond 007 CoffeeShop"
        />

        {/* Bouton toggle thème */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Ligne dorée décorative */}
      <div className="gold-divider" />

      {/* Slogan */}
      <p className="header__slogan">
        "<span>Shaken</span>, not stirred"
      </p>
    </header>
  )
}
