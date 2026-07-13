// Composant bouton WiFi flottant + modale réseau ouvert
import { useState } from 'react'

const WIFI_SSID = 'James-bond'
const WIFI_PASSWORD = '007James-bond'

export default function WifiButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WIFI_PASSWORD)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
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
      <button
        className="wifi-button"
        onClick={() => setOpen(true)}
        aria-label="Connexion WiFi"
        title="WiFi"
      >
        📶
      </button>

      {open && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="modal">
            <div className="modal__handle" />
            <h2 className="modal__title">📶 WiFi Gratuit</h2>

            <div className="modal__row">
              <div>
                <p className="modal__label">Réseau</p>
                <p className="modal__value">{WIFI_SSID}</p>
              </div>
            </div>

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
