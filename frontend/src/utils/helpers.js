/**
 * Format file size to human-readable string
 */
export function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Format a Date to HH:MM
 */
export function formatTime(date) {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Convert file to base64 string (without the data URL prefix)
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result.split(',')[1]);
    reader.onerror = () => reject(new Error('Impossible de lire le fichier'));
    reader.readAsDataURL(file);
  });
}

/**
 * Get data URL from file (for preview)
 */
export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Impossible de lire le fichier'));
    reader.readAsDataURL(file);
  });
}

/**
 * Syntax highlight JSON string → HTML string
 */
export function syntaxHighlightJSON(json) {
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        return /:$/.test(match)
          ? `<span style="color:#8b85ff">${match}</span>`
          : `<span style="color:#22c55e">${match}</span>`;
      }
      if (/true|false/.test(match)) return `<span style="color:#60a5fa">${match}</span>`;
      if (/null/.test(match)) return `<span style="color:#9090b0">${match}</span>`;
      return `<span style="color:#f59e0b">${match}</span>`;
    }
  );
}

/**
 * Escape HTML special chars
 */
export function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Trigger a file download in the browser
 */
export function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Strip JSON markdown fences if present
 */
export function stripJsonFences(text) {
  return text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
}

/**
 * Count words in a string
 */
export function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}
