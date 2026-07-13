// Composant carte menu — affiche une boisson ou un plat
import { useState } from 'react'

// Icônes de remplacement si la photo n'existe pas
const FALLBACK_ICONS = {
  'Coffee Drinks':   '☕',
  'Italian Coffee':  '☕',
  'Caffè Macchiato': '☕',
  'Thé':             '🍵',
  'Frappuccino':     '🥤',
  'Milkshake':       '🥛',
  'Mojito':          '🍹',
  'Smoothie':        '🍓',
  'Fresh Cocktails': '🍋',
  'Hot Drinks':      '🍫',
  'Fresh Drinks':    '🌊',
  'Sweet Drinks':    '🥤',
  'Crepes Salees':   '🥞',
  'Crepes Sucrees':  '🍯',
  'Panini':          '🥪',
  'Fast 007':        '⚡',
}

export default function MenuCard({ item, categorie }) {
  const [imgError, setImgError] = useState(false)

  const badge = item.badge?.toLowerCase()

  return (
    <article className="menu-card">
      {/* Image du plat */}
      <div className="menu-card__image-wrapper">
        {!imgError ? (
          <img
            className="menu-card__image"
            src={item.photo}
            alt={item.nom}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="menu-card__placeholder">
            {FALLBACK_ICONS[categorie] || '🍽️'}
          </div>
        )}

        {/* Badge Populaire / Nouveau */}
        {item.badge && (
          <span className={`menu-card__badge menu-card__badge--${badge}`}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Infos du plat */}
      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.nom}</h3>
        {/* Description uniquement pour les crêpes */}
        {item.description && (
          <p className="menu-card__description">{item.description}</p>
        )}
        <div className="menu-card__footer">
          <span className="menu-card__price">{item.prix}</span>
          <div className="menu-card__separator" />
        </div>
      </div>
    </article>
  )
}
