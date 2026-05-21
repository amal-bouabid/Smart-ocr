import { stripJsonFences } from './helpers';

// En dev  : http://localhost:3001
// En prod : URL de votre backend déployé (Railway, Render, etc.)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

/**
 * Envoie une image + prompt au backend proxy,
 * qui se charge lui-même d'appeler l'API Anthropic.
 * La clé API n'est JAMAIS exposée côté client.
 *
 * @param {string} base64Data  - base64-encoded image (sans préfixe data URL)
 * @param {string} mediaType   - MIME type, ex: 'image/jpeg'
 * @param {string} prompt      - Prompt d'instruction pour Claude
 * @returns {Promise<string>}  - Texte brut retourné par Claude
 */
export async function extractWithClaude(base64Data, mediaType, prompt) {
  const response = await fetch(`${BACKEND_URL}/api/ocr`, {
    method  : 'POST',
    headers : { 'Content-Type': 'application/json' },
    body    : JSON.stringify({ base64: base64Data, mediaType, prompt }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error || `Erreur serveur ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}

/**
 * Tente de parser la réponse Claude en JSON (pour les modes structurés).
 * Retourne l'objet parsé ou null si le JSON est invalide.
 */
export function tryParseJSON(text) {
  try {
    return JSON.parse(stripJsonFences(text));
  } catch {
    return null;
  }
}
