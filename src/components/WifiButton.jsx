// Composant bouton WiFi flottant + modale avec identifiants réseau
import { useState } from 'react'

// Modifie ces valeurs pour ton réseau réel
const WIFI_SSID = '007James-bond'
const WIFI_PASSWORD = 'Shaken007!'

export default function WifiButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Copie le mot de passe dans le presse-papiers
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WIFI_PASSWORD)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback pour les anciens navigateurs
      const el = document.createElement('textarea')
      el.value = WIFI_PASSWORD
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        className="wifi-button"
        onClick={() => setOpen(true)}
        aria-label="Voir le mot de passe WiFi"
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

            <h2 className="modal__title">📶 Connexion WiFi</h2>

            {/* Nom du réseau */}
            <div className="modal__row">
              <div>
                <p className="modal__label">Réseau</p>
                <p className="modal__value">{WIFI_SSID}</p>
              </div>
            </div>

            {/* Mot de passe + copier */}
            <div className="modal__row">
              <div>
                <p className="modal__label">Mot de passe</p>
                <p className="modal__value">{WIFI_PASSWORD}</p>
              </div>
              <button
                className={`modal__copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '✓ Copié !' : 'Copier'}
              </button>
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
