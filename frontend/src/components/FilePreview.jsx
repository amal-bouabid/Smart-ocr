import React from 'react';
import { formatSize } from '../utils/helpers';

const s = {
  wrap: { margin: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: 12 },
  img: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--bg3)',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    background: 'var(--bg3)',
    borderRadius: 8,
    border: '1px solid var(--border)',
  },
  name: {
    flex: 1,
    fontSize: 13,
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  size: { fontSize: 12, color: 'var(--text3)' },
  remove: {
    background: 'none',
    border: 'none',
    color: 'var(--text3)',
    cursor: 'pointer',
    fontSize: 18,
    lineHeight: 1,
    padding: 2,
    transition: 'color 0.2s',
  },
};

export default function FilePreview({ file, preview, onClear }) {
  return (
    <div style={s.wrap}>
      <img src={preview} alt="Aperçu du document" style={s.img} />
      <div style={s.info}>
        <i className="ti ti-file" style={{ fontSize: 18, color: 'var(--accent2)' }} aria-hidden="true" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={s.name}>{file.name}</div>
          <div style={s.size}>{formatSize(file.size)}</div>
        </div>
        <button
          style={s.remove}
          onClick={onClear}
          title="Supprimer"
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text3)')}
          aria-label="Supprimer le fichier"
        >
          <i className="ti ti-x" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
