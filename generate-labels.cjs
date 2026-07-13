// generate-labels.js — génère etiquettes-table.html
const QRCode = require('qrcode')
const fs = require('fs')

const WIFI_SSID = 'James-bond'
const WIFI_PASSWORD = '007James-bond'
const MENU_URL = 'https://james-bond-coffee.vercel.app/'

const QR_OPTS = {
  type: 'svg',
  color: { dark: '#0A0A0A', light: '#FFFFFF' },
  errorCorrectionLevel: 'H',
  margin: 1
}

// Extrait le contenu <svg> en conservant son viewBox réel (qui dépend du
// nombre de modules du QR, ex: 31x31) — écraser ce viewBox avec une valeur
// fixe est ce qui faisait apparaître le QR minuscule en haut à gauche.
function extractQr(svg) {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100'
  const inner = svg.replace(/<\?xml[^?]*\?>/g, '').replace(/<svg[^>]*>/g, '').replace('</svg>', '').trim()
  return { viewBox, inner }
}

Promise.all([
  new Promise((res, rej) => QRCode.toString(MENU_URL, QR_OPTS, (e, s) => e ? rej(e) : res(s))),
  new Promise((res, rej) => QRCode.toString(`WIFI:T:WPA;S:${WIFI_SSID};P:${WIFI_PASSWORD};;`, QR_OPTS, (e, s) => e ? rej(e) : res(s)))
]).then(([menuSvg, wifiSvg]) => {
  const menuQr = extractQr(menuSvg)
  const wifiQr = extractQr(wifiSvg)

  const card = `
  <div class="card">
    <span class="corner corner--tl"></span>
    <span class="corner corner--tr"></span>
    <span class="corner corner--bl"></span>
    <span class="corner corner--br"></span>

    <div class="header">
      <img class="logo-007" src="logo2.png" alt="007">
      <p class="title">James Bond</p>
      <p class="subtitle">C O F F E E &nbsp; S H O P</p>
    </div>

    <div class="gold-line"></div>

    <div class="qr-grid">
      <!-- QR Menu -->
      <div class="qr-section">
        <p class="qr-label"><span class="qr-label__icon">📋</span> Menu</p>
        <div class="qr-wrap">
          <div class="qr-panel">
            <svg viewBox="${menuQr.viewBox}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${menuQr.inner}</svg>
          </div>
        </div>
        <p class="scan-text">Scannez pour voir le menu</p>
      </div>

      <div class="qr-divider"></div>

      <!-- QR WiFi -->
      <div class="qr-section">
        <p class="qr-label"><span class="qr-label__icon">📶</span> WiFi</p>
        <div class="qr-wrap">
          <div class="qr-panel">
            <svg viewBox="${wifiQr.viewBox}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${wifiQr.inner}</svg>
          </div>
        </div>
        <p class="scan-text">Connexion automatique</p>
      </div>
    </div>

    <div class="gold-line"></div>

    <p class="slogan">&laquo;&nbsp;7 jours sur 7, 007 à votre service&nbsp;&raquo;</p>
    <div class="wifi-badge">
      <span class="wifi-badge__dot"></span>
      Réseau <strong>${WIFI_SSID}</strong> &middot; À vos ordres, agent 007
    </div>
  </div>`

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Etiquettes Table — James Bond 007 Coffee</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@300;400&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    background: radial-gradient(circle at 50% 0%, #2a2a2a 0%, #1a1a1a 55%, #0d0d0d 100%);
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 32px 20px;
    justify-content: center;
    font-family: 'Inter', sans-serif;
  }
  .card {
    position: relative;
    width: 620px;
    max-width: 95vw;
    background:
      radial-gradient(circle at 50% -10%, rgba(212,175,55,0.10), transparent 55%),
      linear-gradient(180deg, #131007 0%, #0A0A0A 100%);
    border: 1px solid #D4AF37;
    border-radius: 20px;
    padding: 36px 40px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    page-break-inside: avoid;
    box-shadow: 0 0 0 6px rgba(212,175,55,0.06), 0 20px 50px rgba(0,0,0,0.5);
  }
  .corner {
    position: absolute;
    width: 22px;
    height: 22px;
    border: 2px solid #D4AF37;
    opacity: 0.85;
  }
  .corner--tl { top: 10px; left: 10px; border-right: none; border-bottom: none; border-radius: 6px 0 0 0; }
  .corner--tr { top: 10px; right: 10px; border-left: none; border-bottom: none; border-radius: 0 6px 0 0; }
  .corner--bl { bottom: 10px; left: 10px; border-right: none; border-top: none; border-radius: 0 0 0 6px; }
  .corner--br { bottom: 10px; right: 10px; border-left: none; border-top: none; border-radius: 0 0 6px 0; }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .logo-007 {
    width: 128px;
    height: 128px;
    object-fit: contain;
    display: block;
    margin-bottom: 4px;
  }
  .title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #F5F0E8;
    letter-spacing: 1px;
  }
  .subtitle {
    font-size: 12px;
    color: #D4AF37;
    letter-spacing: 5px;
  }
  .gold-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, #D4AF37 40%, #D4AF37 60%, transparent);
  }
  .qr-grid {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 24px;
    width: 100%;
  }
  .qr-divider {
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.4) 15%, rgba(212,175,55,0.4) 85%, transparent);
    flex-shrink: 0;
  }
  .qr-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }
  .qr-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #D4AF37;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .qr-label__icon { font-size: 15px; }
  .qr-wrap {
    padding: 10px;
    border: 1px solid rgba(212,175,55,0.35);
    border-radius: 18px;
    background: #0A0A0A;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qr-panel {
    background: #FFFFFF;
    border-radius: 14px;
    padding: 18px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.04);
  }
  .qr-panel svg {
    display: block;
    width: 100%;
    height: auto;
    max-width: 220px;
    aspect-ratio: 1 / 1;
    shape-rendering: crispEdges;
  }
  .scan-text {
    font-size: 10.5px;
    color: #A89880;
    letter-spacing: 1.5px;
    text-align: center;
    text-transform: uppercase;
  }
  .slogan {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 16px;
    color: #F5E3A1;
    letter-spacing: 0.3px;
    text-align: center;
  }
  .wifi-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #A89880;
    letter-spacing: 0.3px;
    background: rgba(212,175,55,0.06);
    border: 1px solid rgba(212,175,55,0.25);
    border-radius: 999px;
    padding: 8px 16px;
  }
  .wifi-badge strong { color: #D4AF37; font-weight: 600; }
  .wifi-badge__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4CAF50;
    box-shadow: 0 0 6px #4CAF50;
    flex-shrink: 0;
  }
  @media (max-width: 480px) {
    .qr-grid { flex-direction: column; }
    .qr-divider { display: none; width: 100%; height: 1px; }
  }
  @media print {
    body { background: white; gap: 8mm; padding: 8mm; }
    .card { box-shadow: none; }
  }
</style>
</head>
<body>
  ${card}
</body>
</html>`

  fs.writeFileSync('etiquettes-table.html', html)
  console.log('OK — etiquettes-table.html créé')
})
