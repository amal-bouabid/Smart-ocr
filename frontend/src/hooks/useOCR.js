import { useState, useCallback } from 'react';
import { extractWithClaude, tryParseJSON } from '../utils/claudeApi';
import { fileToBase64, fileToDataURL } from '../utils/helpers';
import { MODES, ACCEPTED_TYPES, MAX_FILE_SIZE } from '../utils/constants';

const JSON_MODES = ['table', 'invoice', 'card'];

export function useOCR() {
  const [file, setFile]           = useState(null);       // File object
  const [preview, setPreview]     = useState(null);       // data URL string
  const [base64, setBase64]       = useState(null);       // base64 string
  const [mode, setMode]           = useState('raw');      // current mode key
  const [loading, setLoading]     = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [results, setResults]     = useState([]);         // list of result objects
  const [history, setHistory]     = useState([]);         // same data, kept separately
  const [toast, setToast]         = useState(null);       // { msg, type }

  /* ─── File handling ─────────────────────────── */

  const loadFile = useCallback(async (f) => {
    if (!f) return;

    if (!ACCEPTED_TYPES.includes(f.type)) {
      showToast('Format non supporté. Utilisez PNG, JPG, WEBP ou PDF.', 'danger');
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      showToast('Fichier trop volumineux (max 10 MB).', 'danger');
      return;
    }

    try {
      const [dataURL, b64] = await Promise.all([fileToDataURL(f), fileToBase64(f)]);
      setFile(f);
      setPreview(dataURL);
      setBase64(b64);
    } catch (e) {
      showToast('Erreur lors de la lecture du fichier.', 'danger');
    }
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setPreview(null);
    setBase64(null);
  }, []);

  /* ─── Extract ───────────────────────────────── */

  const extract = useCallback(async () => {
    if (!base64 || !file) return;

    setLoading(true);

    const messages = [
      'Claude Vision analyse votre document…',
      'Reconnaissance des caractères…',
      'Structuration des données…',
      'Finalisation…',
    ];
    let mi = 0;
    setLoadingMsg(messages[0]);
    const interval = setInterval(() => {
      mi = Math.min(mi + 1, messages.length - 1);
      setLoadingMsg(messages[mi]);
    }, 1500);

    try {
      const { prompt } = MODES[mode];
      const mediaType  = file.type || 'image/jpeg';
      const rawText    = await extractWithClaude(base64, mediaType, prompt);
      const isJSON     = JSON_MODES.includes(mode);
      const parsed     = isJSON ? tryParseJSON(rawText) : null;

      const entry = {
        id:       Date.now(),
        filename: file.name,
        mode,
        text:     rawText,
        parsed,
        thumb:    preview,
        time:     new Date(),
      };

      setResults((prev) => [entry, ...prev]);
      setHistory((prev) => [entry, ...prev]);
      showToast('Extraction réussie !', 'success');
    } catch (err) {
      showToast('Erreur : ' + err.message, 'danger');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }, [base64, file, mode, preview]);

  /* ─── Toast ─────────────────────────────────── */

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  /* ─── Remove result ─────────────────────────── */

  const removeResult = useCallback((id) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return {
    // state
    file, preview, mode, loading, loadingMsg,
    results, history, toast,
    // actions
    loadFile, clearFile,
    setMode,
    extract,
    removeResult,
    showToast,
  };
}
