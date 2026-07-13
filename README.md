# James Bond 007 CoffeeShop — Menu Digital

Menu digital accessible via QR code, thème espion élégant.

## Lancer le projet

```bash
cd james-bond-coffee
npm install
npm run dev
```

Ouvre ensuite : http://localhost:5173

## Build pour déploiement (Vercel)

```bash
npm run build
```

Le dossier `dist/` est prêt à déployer sur Vercel (zéro configuration).

## Personnaliser le menu

Modifie uniquement le fichier `src/data/menu.json` :
- `nom` : nom du plat
- `description` : description courte
- `prix` : prix en DT (ex: "8.500 DT")
- `photo` : chemin vers l'image dans `public/images/`
- `badge` : "Populaire", "Nouveau" ou `null`

## Ajouter des photos

Place tes images dans `public/images/` et mets à jour le champ `photo` dans `menu.json`.
Exemple : `"photo": "/images/mon-cafe.jpg"`

## Changer le WiFi

Dans `src/components/WifiButton.jsx`, modifie :
```js
const WIFI_SSID = 'NomDeTonReseau'
const WIFI_PASSWORD = 'TonMotDePasse'
```

## Ajouter le logo

Place ton logo dans `public/logo.png` (format carré recommandé, min 200×200px).
