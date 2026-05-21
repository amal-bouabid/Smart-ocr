require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3001;

/* ── Middleware ─────────────────────────────────────────── */

app.use(express.json({ limit: '15mb' }));

app.use(cors({
  origin : process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  methods: ['POST', 'GET'],
}));

// Rate limiting : 20 extractions / 15 min par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max     : 20,
  message : { error: 'Trop de requêtes, réessayez dans 15 minutes.' },
});
app.use('/api', limiter);

/* ── Route principale : proxy vers Anthropic ────────────── */

app.post('/api/ocr', async (req, res) => {
  const { base64, mediaType, prompt } = req.body;

  if (!base64 || !mediaType || !prompt) {
    return res.status(400).json({ error: 'Paramètres manquants : base64, mediaType, prompt.' });
  }
  if (!base64.match(/^[A-Za-z0-9+/=]+$/)) {
    return res.status(400).json({ error: 'base64 invalide.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY manquante dans .env');
    return res.status(500).json({ error: 'Configuration serveur incorrecte.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method : 'POST',
      headers: {
        'Content-Type'     : 'application/json',
        'x-api-key'        : apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model     : 'claude-sonnet-4-6',
        max_tokens: 2048,
        messages  : [{
          role   : 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
            { type: 'text',  text: prompt },
          ],
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err?.error?.message || 'Erreur Anthropic API' });
    }

    const data = await response.json();
    const text = data.content.map(b => b.text || '').join('');
    return res.json({ text, usage: data.usage || {} });

  } catch (err) {
    console.error('Erreur proxy OCR :', err.message);
    return res.status(500).json({ error: 'Erreur serveur interne.' });
  }
});

/* ── Health check ───────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'smartocr-backend' }));

/* ── Start ──────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`SmartOCR backend démarré → http://localhost:${PORT}`);
  console.log(`CORS autorisé pour      → ${process.env.ALLOWED_ORIGIN || 'http://localhost:3000'}`);
});
