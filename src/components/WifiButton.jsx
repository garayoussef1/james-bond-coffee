// Composant bouton WiFi flottant + modale réseau ouvert
import { useState } from 'react'

const WIFI_SSID = '007James-bond'

export default function WifiButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Bouton flottant */}
      <button
        className="wifi-button"
        onClick={() => setOpen(true)}
        aria-label="Connexion WiFi"
        title="WiFi"
      >
        📶
      </button>

      {/* Modale */}
      {open && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="modal">
            <div className="modal__handle" />

            <h2 className="modal__title">📶 WiFi Gratuit</h2>

            {/* Nom du réseau */}
            <div className="modal__row">
              <div>
                <p className="modal__label">Réseau</p>
                <p className="modal__value">{WIFI_SSID}</p>
              </div>
            </div>

            {/* Connexion automatique */}
            <div className="modal__row">
              <div>
                <p className="modal__label">Mot de passe</p>
                <p className="modal__value" style={{ color: 'var(--gold)' }}>
                  Aucun — connexion automatique ✓
                </p>
              </div>
            </div>

            <button className="modal__close" onClick={() => setOpen(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  )
}
