# SmartOCR — Intelligent Document Extraction System

> Portfolio Project • Junior AI Engineer  
> Intelligent OCR & Multimodal Document Analysis with AI

---

## 🌟 Overview

**SmartOCR** is an intelligent web application designed to automatically extract, analyze, and structure information from:

- images
- PDF documents
- invoices
- tables
- business cards
- administrative documents

The project leverages the multimodal capabilities of **Claude Opus Vision (Anthropic)** to visually understand documents and generate structured, usable outputs.

SmartOCR transforms unstructured documents into actionable data for AI workflows, automation systems, and analytical pipelines.

---

## ✨ Features

| Feature | Description | Export |
|---|---|---|
| 📄 Text Extraction | Intelligent OCR for visible text | `.txt` |
| 📊 Table Detection | Automatic table-to-JSON conversion | `.json` |
| 🧾 Invoice Analysis | Extract amounts, dates, references | `.json` |
| 👤 Business Card Parsing | Extract contacts and information | `.json` |
| 🧠 Smart Summarization | AI-generated summaries & insights | `.txt` |
| 📑 PDF Support | Multi-page document analysis | `.txt / .json` |
| 🌐 Modern Web Interface | Fast and intuitive upload UI | Web UI |

---

## 🧠 Use Cases

- Document automation
- Invoice digitization
- Business data extraction
- Administrative document parsing
- AI-powered OCR workflows
- Preprocessing for RAG systems
- Intelligent document structuring

---

## 🛡️ Secure Architecture

The Anthropic API key is securely stored on the backend and is never exposed to the frontend.

```text
smartocr/
├── frontend/              # React application
├── backend/               # Secure Express API
├── screenshots/           # Screenshots
├── README.md
└── .gitignore
```

---

## ⚙️ Technical Architecture

```text
User
    │
    ▼
React Frontend
    │
    ▼
Secure Express Backend
    │
    ▼
Anthropic Claude Vision API
    │
    ▼
AI Extraction & Structuring
```

---

## 🚀 Local Installation

### 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic account
- Anthropic API key

Create an API key:

https://console.anthropic.com/settings/keys

---

## 1️⃣ Backend Setup

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Copy environment variables

```bash
cp .env.example .env
```

### Configure `.env`

```env
ANTHROPIC_API_KEY=sk-ant-your-api-key
PORT=3001
ALLOWED_ORIGIN=http://localhost:3000
```

### Start backend server

```bash
npm run dev
```

Backend available at:

```text
http://localhost:3001
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Copy environment variables

```bash
cp .env.example .env
```

### Configure `.env`

```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Start frontend

```bash
npm start
```

Application available at:

```text
http://localhost:3000
```

---

## 🐳 Run with Docker

### Build and start containers

```bash
docker compose up --build
```

### Stop containers

```bash
docker compose down
```

---

## 📦 Production Deployment

### Frontend

Recommended platforms:

- Vercel
- Netlify

### Backend

Recommended platforms:

- Railway
- Render
- Fly.io

---

## 🔐 Security

### Integrated Security Features

- Backend-only API key protection
- Strict input validation
- CORS protection
- Anti-abuse rate limiting
- File upload validation
- Sensitive variables excluded from Git
- Protection against malformed requests

---

## 📁 Environment Variables

### Backend

```env
ANTHROPIC_API_KEY=
PORT=
ALLOWED_ORIGIN=
```

### Frontend

```env
REACT_APP_BACKEND_URL=
```

---

## 🛠️ Tech Stack

### Frontend

- React 18
- JavaScript ES6+
- CSS Variables
- FileReader API
- Fetch API

### Backend

- Node.js
- Express.js
- CORS
- dotenv
- express-rate-limit

### Artificial Intelligence

- Claude Opus Vision
- Anthropic API
- Multimodal AI OCR

---

## 📸 Screenshots

### Main Interface

```text
Add your screenshots inside /screenshots
```

Example:

```markdown
![Home](./screenshots/home.png)
```

---

## 📌 Example JSON Output

```json
{
  "invoice_number": "INV-2026-001",
  "date": "2026-05-20",
  "total_amount": "450.00",
  "vendor": "SmartTech Solutions"
}
```

---

## ⚡ Workflow

1. Upload document
2. Convert to base64
3. Send securely to backend
4. Claude Vision analysis
5. Intelligent extraction
6. Structured data returned

---

## 🎯 Project Goals

This project was developed as part of an AI Engineering portfolio to demonstrate:

- multimodal LLM integration
- secure AI architectures
- modern AI full-stack development
- intelligent document structuring
- backend/frontend best practices

---

## 📚 Future Improvements

- Multi-language OCR support
- CSV / Excel export
- User authentication
- Document history
- Batch processing
- Drag & drop support
- Domain-specific prompt engineering
- Document RAG pipeline

---

## 👩‍💻 Author

### Amal Bouabid

Junior AI Engineer  
Computer Engineering Graduate

#### Areas of Interest

- Artificial Intelligence
- LLM Engineering
- RAG Systems
- Computer Vision
- NLP
- Backend AI Systems

---

## 📄 License

Educational and personal portfolio project.

---

## ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🛠️ Contribute improvements

---
