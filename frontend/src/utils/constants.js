export const MODES = {
  raw: {
    label: 'Texte brut',
    icon: 'ti-text-size',
    tag: 'tag-purple',
    desc: 'Extraire tout le texte visible',
    ext: 'txt',
    prompt: `Extract ALL visible text from this image exactly as it appears.
Preserve the original layout, line breaks, and structure as much as possible.
Return only the raw extracted text, nothing else. No explanation, no preamble.`,
  },
  table: {
    label: 'Tableau → JSON',
    icon: 'ti-table',
    tag: 'tag-blue',
    desc: 'Structurer les tableaux en JSON',
    ext: 'json',
    prompt: `This image contains a table or structured data.
Extract it as valid JSON. Return ONLY a JSON object with a "table" key containing an array of objects,
where each object represents a row with column names as keys.
Example: {"table":[{"col1":"val","col2":"val"}]}
No explanation, no markdown fences, only valid JSON.`,
  },
  invoice: {
    label: 'Facture / Reçu',
    icon: 'ti-receipt',
    tag: 'tag-amber',
    desc: 'Extraire montants, dates, références',
    ext: 'json',
    prompt: `Extract all invoice or receipt data from this image.
Return ONLY a valid JSON object with these fields (use null for missing fields):
{
  "invoice_number": "",
  "date": "",
  "due_date": "",
  "vendor": { "name": "", "address": "", "phone": "", "email": "" },
  "client": { "name": "", "address": "" },
  "items": [{ "description": "", "qty": 0, "unit_price": 0, "total": 0 }],
  "subtotal": 0,
  "tax": 0,
  "total": 0,
  "currency": "",
  "payment_terms": "",
  "notes": ""
}
No explanation, no markdown fences, only valid JSON.`,
  },
  card: {
    label: 'Carte de visite / ID',
    icon: 'ti-id-badge-2',
    tag: 'tag-green',
    desc: 'Nom, email, téléphone, adresse',
    ext: 'json',
    prompt: `Extract all contact information from this business card, ID card, or contact document.
Return ONLY a valid JSON object (use null for missing fields):
{
  "full_name": "",
  "title": "",
  "company": "",
  "phone": [],
  "email": [],
  "website": "",
  "address": "",
  "linkedin": "",
  "other": {}
}
No explanation, no markdown fences, only valid JSON.`,
  },
  analyze: {
    label: 'Analyse intelligente',
    icon: 'ti-brain',
    tag: 'tag-pink',
    desc: 'Résumé + structure auto-détectée',
    ext: 'txt',
    prompt: `Analyze this document comprehensively. Structure your response clearly:

## Type de document
Identify what kind of document this is.

## Informations clés
List the most important information extracted.

## Données structurées
Any tables, lists, or structured data found.

## Observations
Notable details, language, quality, or anything unusual.`,
  },
};

export const TAG_COLORS = {
  'tag-purple': { bg: 'rgba(108,99,255,0.15)', color: '#8b85ff' },
  'tag-blue':   { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
  'tag-amber':  { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
  'tag-green':  { bg: 'rgba(34,197,94,0.12)',  color: '#22c55e' },
  'tag-pink':   { bg: 'rgba(236,72,153,0.12)', color: '#ec4899' },
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf'];
