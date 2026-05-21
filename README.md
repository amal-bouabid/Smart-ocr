# SmartOCR — Extracteur Intelligent de Documents

> Projet portfolio · AI Engineer Junior  
> Propulsé par **Claude Opus Vision API** (Anthropic)

---

## Architecture

```
smartocr/
├── frontend/     ← Application React (interface utilisateur)
├── backend/      ← Serveur Express (proxy sécurisé vers Anthropic)
└── README.md
```

### Flux de données

```
Navigateur (React)
      │
      │  POST /api/ocr  { base64, mediaType, prompt }
      ▼
Backend Express (Node.js)       ← ANTHROPIC_API_KEY stockée ici uniquement
      │
      │  POST https://api.anthropic.com/v1/messages
      ▼
Claude Opus Vision API
```

> La clé `ANTHROPIC_API_KEY` **n'est jamais envoyée au navigateur**.

---

## Fonctionnalités

| Mode | Description | Export |
|------|-------------|--------|
| **Texte brut** | Extrait tout le texte visible | `.txt` |
| **Tableau → JSON** | Détecte et structure les tableaux | `.json` |
| **Facture / Reçu** | Analyse montants, dates, références | `.json` |
| **Carte de visite / ID** | Nom, email, téléphone, adresse | `.json` |
| **Analyse intelligente** | Résumé + structure auto-détectée | `.txt` |

---

## Installation locale

### Prérequis
- Node.js ≥ 16
- Clé API Anthropic → [console.anthropic.com](https://console.anthropic.com)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Éditer `backend/.env` :
```env
ANTHROPIC_API_KEY=sk-ant-votre-vraie-clé
PORT=3001
ALLOWED_ORIGIN=http://localhost:3000
```

```bash
npm run dev
# Serveur disponible sur http://localhost:3001
# Test : GET http://localhost:3001/health
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Vérifier `frontend/.env` :
```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

```bash
npm start
# Application disponible sur http://localhost:3000
```

---

## Déploiement production

### Étape 1 — Déployer le Backend sur Railway

1. Créer un compte sur [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo** → sélectionner le repo du backend
3. Dans **Settings → Variables**, ajouter :

   | Variable | Valeur |
   |----------|--------|
   | `ANTHROPIC_API_KEY` | `sk-ant-votre-clé` |
   | `PORT` | `3001` |
   | `ALLOWED_ORIGIN` | *(laisser vide pour l'instant, à compléter après Vercel)* |

4. Dans **Settings → Networking** → **Generate Domain**
5. Copier l'URL générée, ex : `https://smartocr-backend-production.up.railway.app`
6. Revenir dans Variables et compléter `ALLOWED_ORIGIN` avec l'URL Vercel (étape suivante)

### Étape 2 — Déployer le Frontend sur Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. **New Project** → **Import Git Repository** → sélectionner le repo du frontend
3. Dans **Environment Variables**, ajouter :

   | Variable | Valeur |
   |----------|--------|
   | `REACT_APP_BACKEND_URL` | URL Railway de l'étape 1 |

4. Cliquer **Deploy**
5. Copier l'URL Vercel générée, ex : `https://smartocr.vercel.app`
6. Retourner sur Railway et mettre à jour `ALLOWED_ORIGIN` avec cette URL

### Vérification finale

```bash
# Tester le backend en production
curl https://smartocr-backend-production.up.railway.app/health
# → { "status": "ok", "service": "smartocr-backend" }
```

---

## Sécurité

| Mesure | Détail |
|--------|--------|
| **Clé API côté serveur** | Jamais dans le bundle JS du navigateur |
| **CORS strict** | Seul le frontend déclaré peut appeler le backend |
| **Rate limiting** | 20 requêtes / 15 min par IP |
| **Validation des inputs** | base64, mediaType et prompt vérifiés avant envoi |
| **`.gitignore`** | `.env` exclu des deux dépôts Git |

---

## Technologies

**Frontend**
- React 18 — composants fonctionnels + hooks custom
- FileReader API — encodage base64 côté client
- CSS Variables — thème sombre sans dépendance externe

**Backend**
- Express.js — serveur proxy léger
- express-rate-limit — protection contre les abus
- dotenv — gestion des variables d'environnement

**IA**
- Claude Opus Vision (`claude-opus-4-7`) — OCR multimodal
- Prompt Engineering — prompts spécialisés par mode d'extraction

---

## Auteur

**Amal** — AI Engineer Junior
