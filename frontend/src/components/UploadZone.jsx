import React, { useRef, useState } from 'react';
import { formatSize } from '../utils/helpers';

const s = {
  zone: {
    margin: '1.5rem',
    border: '1.5px dashed var(--border2)',
    borderRadius: 12,
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'var(--bg3)',
    userSelect: 'none',
  },
  zoneDrag: {
    borderColor: 'var(--accent)',
    background: 'var(--accent-glow)',
  },
  icon: { fontSize: 36, color: 'var(--accent2)', marginBottom: 12 },
  title: { fontSize: 15, fontWeight: 600, marginBottom: 6 },
  sub: { fontSize: 13, color: 'var(--text3)' },
};

export default function UploadZone({ onFile }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }

  function handleChange(e) {
    const f = e.target.files[0];
    if (f) onFile(f);
    e.target.value = '';
  }

  return (
    <div
      style={{ ...s.zone, ...(drag ? s.zoneDrag : {}) }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      aria-label="Zone de dépôt de fichier"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <div style={s.icon}><i className="ti ti-cloud-upload" aria-hidden="true" /></div>
      <div style={s.title}>Déposer une image ou PDF</div>
      <div style={s.sub}>PNG, JPG, WEBP, PDF · Max 10 MB</div>
    </div>
  );
}
