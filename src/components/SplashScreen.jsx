// SplashScreen.jsx — Écran d'ouverture animé style 007
import { useEffect, useState } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('enter') // enter → show → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 1200)
    const t2 = setTimeout(() => setPhase('exit'), 2800)
    const t3 = setTimeout(() => onDone(), 3600)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onDone])

  return (
    <div className={`splash splash--${phase}`} aria-hidden="true">

      {/* ── Tunnel 007 ── */}
      <div className="splash__tunnel">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="splash__ring" style={{ '--i': i }} />
        ))}

        {/* ── James Bond — Silhouette tuxedo, pistolet tendu ── */}
        <div className="splash__agent">
          <svg viewBox="0 0 130 140" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* === SILHOUETTE BOND === */}

            {/* Tête */}
            <ellipse cx="42" cy="13" rx="10" ry="11" fill="black"/>

            {/* Cou */}
            <rect x="39" y="23" width="6" height="7" rx="1" fill="black"/>

            {/* Veste tuxedo — corps principal */}
            <path d="M22 32 Q42 26 62 32 L65 80 H19 Z" fill="black"/>

            {/* Revers — chemise blanche visible */}
            <path d="M38 32 L42 54 L46 32 Q42 29 38 32 Z" fill="#EDE5D0" opacity="0.85"/>

            {/* Nœud papillon */}
            <path d="M37.5 34 Q42 39 46.5 34 Q42 37 37.5 34 Z" fill="#111"/>

            {/* ── Bras gauche — détendu, légèrement fléchi ── */}
            <line x1="23" y1="38" x2="14" y2="68" stroke="black" strokeWidth="9" strokeLinecap="round"/>

            {/* ── Bras droit — tendu, pistolet pointé ── */}
            <line x1="61" y1="38" x2="90" y2="54" stroke="black" strokeWidth="9" strokeLinecap="round"/>

            {/* Main droite */}
            <circle cx="92" cy="55" r="6.5" fill="black"/>

            {/* === PISTOLET === */}
            {/* Corps */}
            <rect x="88" y="49" width="35" height="9" rx="3" fill="black"/>
            {/* Guidon / viseur */}
            <rect x="98" y="46" width="14" height="3.5" rx="1" fill="black"/>
            {/* Canon long */}
            <rect x="120" y="50" width="12" height="6" rx="1.5" fill="black"/>
            {/* Pontet */}
            <path d="M92 58 Q97 65 102 58" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            {/* Crosse */}
            <path d="M90 58 L88 68 Q90 70 95 68 L97 58" fill="black"/>

            {/* === VAPEUR DE CAFÉ DORÉE — monte du canon → forme "007" === */}
            <path className="steam s1"
              d="M130 47 Q124 36 130 26 Q135 17 128 9"
              stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round"
              strokeDasharray="50" strokeDashoffset="50"/>
            <path className="steam s2"
              d="M126 46 Q132 34 125 24 Q119 15 126 6"
              stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round"
              strokeDasharray="50" strokeDashoffset="50" opacity="0.7"/>

            {/* "007" en vapeur dorée */}
            <text className="steam-007"
              x="116" y="3"
              fontFamily="Georgia, serif" fontSize="9" fontWeight="bold"
              fill="#D4AF37" letterSpacing="1.5" opacity="0"
              textAnchor="middle">007</text>

            {/* === JAMBES — pose de marche === */}
            <line x1="35" y1="80" x2="28" y2="118" stroke="black" strokeWidth="9" strokeLinecap="round"/>
            <line x1="49" y1="80" x2="56" y2="118" stroke="black" strokeWidth="9" strokeLinecap="round"/>

            {/* Chaussures */}
            <path d="M19 118 Q29 115 37 119 L35 125 Q25 127 19 123 Z" fill="black"/>
            <path d="M48 118 Q58 115 66 119 L64 125 Q54 127 48 123 Z" fill="black"/>

          </svg>
        </div>

        {/* Flash doré — café qui jaillit du canon */}
        <div className="splash__gunshot" />
      </div>

      {/* ── Logo + Slogan ── */}
      <div className="splash__content">
        <img
          src="/logo_bond_light.png"
          alt="James Bond 007 CoffeeShop"
          className="splash__logo-img"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'block'
          }}
        />
        {/* Fallback si le PNG ne charge pas */}
        <span className="splash__logo-fallback" style={{ display: 'none' }}>007</span>

        <div className="splash__gold-line" />
        <p className="splash__tagline">"7 jours sur 7, 007 à votre service"</p>
      </div>

    </div>
  )
}
