// App.jsx — composant racine, gère le thème et la catégorie active
import { useState, useEffect, useCallback } from 'react'
import menuData from './data/menu.json'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import MenuCard from './components/MenuCard'
import WifiButton from './components/WifiButton'
import SplashScreen from './components/SplashScreen'
import Footer from './components/Footer'

export default function App() {
  // ── Splash screen (s'affiche une seule fois par session) ──────────────────
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem('jb-splash-done')
  )

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem('jb-splash-done', '1')
    setShowSplash(false)
  }, [])

  // ── Thème (dark par défaut) ───────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jb-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('jb-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // ── Catégorie active ──────────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0)

  const activeCategory = menuData[activeIndex]

  return (
    <>
      {/* Splash screen — affiché une seule fois à l'ouverture */}
      {showSplash && <SplashScreen onDone={handleSplashDone} />}

      <div className="app" data-theme={theme} style={{ visibility: showSplash ? 'hidden' : 'visible' }}>
      {/* En-tête avec logo, nom, slogan et toggle thème */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Onglets de navigation entre les catégories */}
      <CategoryTabs
        categories={menuData}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      {/* Contenu de la catégorie active */}
      <main className="menu-content" key={activeIndex}>
        <h2 className="menu-section-title">
          <span>{activeCategory.icone}</span>
          {activeCategory.categorie}
        </h2>
        <p className="menu-section-count">
          {activeCategory.items.length} articles disponibles
        </p>

        {/* Grille de cartes */}
        <div className="menu-grid">
          {activeCategory.items.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              categorie={activeCategory.categorie}
            />
          ))}
        </div>
      </main>

      {/* Footer avec logo 24/7 */}
      <Footer theme={theme} />

      {/* Bouton WiFi flottant */}
      <WifiButton />
    </div>
    </>
  )
}
