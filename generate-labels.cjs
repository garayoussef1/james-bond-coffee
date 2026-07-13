// generate-labels.js — génère etiquettes-table.html
const QRCode = require('qrcode')
const fs = require('fs')

const WIFI_SSID = 'James-bond'
const WIFI_PASSWORD = '007James-bond'
const MENU_URL = 'https://james-bond-coffee.vercel.app/'

Promise.all([
  new Promise((res, rej) => QRCode.toString(MENU_URL, {
    type: 'svg', color: { dark: '#D4AF37', light: '#0A0A0A' }, width: 300, margin: 1
  }, (e, s) => e ? rej(e) : res(s))),
  new Promise((res, rej) => QRCode.toString(`WIFI:T:WPA;S:${WIFI_SSID};P:${WIFI_PASSWORD};;`, {
    type: 'svg', color: { dark: '#D4AF37', light: '#0A0A0A' }, width: 300, margin: 1
  }, (e, s) => e ? rej(e) : res(s)))
]).then(([menuSvg, wifiSvg]) => {
  const menuInner = menuSvg.replace(/<\?xml[^?]*\?>/g,'').replace(/<svg[^>]*>/g,'').replace('</svg>','').trim()
  const wifiInner = wifiSvg.replace(/<\?xml[^?]*\?>/g,'').replace(/<svg[^>]*>/g,'').replace('</svg>','').trim()

  const card = `
  <div class="card">
    <div class="logo-wrap">
      <div class="logo-007">007</div>
      <div class="title-block">
        <p class="title">James Bond</p>
        <p class="subtitle">C O F F E E &nbsp; S H O P</p>
      </div>
    </div>
    <div class="gold-line"></div>

    <!-- QR Menu -->
    <div class="qr-section">
      <p class="qr-label">📋 Menu</p>
      <div class="qr-wrap">
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">${menuInner}</svg>
      </div>
      <p class="scan-text">Scannez pour voir le menu</p>
    </div>

    <div class="gold-line"></div>

    <!-- QR WiFi -->
    <div class="qr-section">
      <p class="qr-label">📶 WiFi — connexion automatique</p>
      <div class="qr-wrap">
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">${wifiInner}</svg>
      </div>
      <p class="scan-text">Scannez pour vous connecter</p>
    </div>

    <div class="gold-line"></div>
    <p class="slogan">7 jours sur 7, 007 à votre service</p>
    <p class="wifi">À vos ordres, agent 007</p>
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
    background: #555;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 20px;
    justify-content: center;
    font-family: 'Inter', sans-serif;
  }
  .card {
    width: 85mm;
    background: #0A0A0A;
    border: 1.5px solid #D4AF37;
    border-radius: 10px;
    padding: 16px 14px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    page-break-inside: avoid;
    box-shadow: 0 0 20px rgba(212,175,55,0.25);
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-007 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #D4AF37;
    border: 1.5px solid #D4AF37;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
    flex-shrink: 0;
  }
  .title-block { text-align: left; }
  .title {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 700;
    color: #F5F0E8;
    letter-spacing: 0.5px;
  }
  .subtitle {
    font-size: 7.5px;
    color: #D4AF37;
    letter-spacing: 3px;
    margin-top: 3px;
  }
  .gold-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, #D4AF37 40%, #D4AF37 60%, transparent);
  }
  .qr-wrap {
    padding: 8px;
    border: 1px solid rgba(212,175,55,0.3);
    border-radius: 8px;
    background: #0A0A0A;
  }
  .qr-wrap svg {
    display: block;
    width: 155px;
    height: 155px;
  }
  .scan-text {
    font-size: 8px;
    color: #A89880;
    letter-spacing: 2px;
    text-align: center;
    text-transform: uppercase;
  }
  .qr-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
  }
  .qr-label {
    font-size: 8.5px;
    color: #D4AF37;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .slogan {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 10px;
    color: #D4AF37;
    letter-spacing: 0.5px;
  }
  .wifi {
    font-size: 7.5px;
    color: #6B6055;
    letter-spacing: 0.5px;
    text-align: center;
  }
  @media print {
    body { background: white; gap: 8mm; padding: 8mm; }
    .card { box-shadow: none; }
  }
</style>
</head>
<body>
  ${Array(6).fill(card).join('\n')}
</body>
</html>`

  fs.writeFileSync('etiquettes-table.html', html)
  console.log('OK — etiquettes-table.html créé')
})
