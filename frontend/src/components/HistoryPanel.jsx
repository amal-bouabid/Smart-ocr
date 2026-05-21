import React from 'react';
import { MODES, TAG_COLORS } from '../utils/constants';
import { formatTime, downloadFile } from '../utils/helpers';

const JSON_MODES = ['table', 'invoice', 'card'];

const s = {
  wrap: { flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 8 },
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    color: 'var(--text3)',
    textAlign: 'center',
    padding: '3rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    cursor: 'default',
    transition: 'all 0.15s',
  },
  thumb: { width: 36, height: 36, borderRadius: 6, objectFit: 'cover', border: '1px solid var(--border)' },
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  sub: { fontSize: 11, color: 'var(--text3)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 },
  iconBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    color: 'var(--text2)',
    cursor: 'pointer',
    padding: '6px 8px',
    borderRadius: 6,
    fontSize: 14,
    transition: 'all 0.15s',
    lineHeight: 1,
  },
};

function MiniTag({ mode }) {
  const m = MODES[mode];
  const colors = TAG_COLORS[m.tag];
  return (
    <span style={{
      fontSize: 10,
      fontWeight: 600,
      padding: '2px 6px',
      borderRadius: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      background: colors.bg,
      color: colors.color,
    }}>
      {m.label}
    </span>
  );
}

export default function HistoryPanel({ history }) {
  if (history.length === 0) {
    return (
      <div style={{ ...s.empty }}>
        <i className="ti ti-history" style={{ fontSize: 48, opacity: 0.3 }} aria-hidden="true" />
        <p style={{ fontSize: 14, maxWidth: 220 }}>Aucune extraction effectuée pour l'instant</p>
      </div>
    );
  }

  function handleDownload(entry) {
    const m = MODES[entry.mode];
    const isJSON = JSON_MODES.includes(entry.mode) && entry.parsed !== null;
    const content = isJSON ? JSON.stringify(entry.parsed, null, 2) : entry.text;
    const mime    = isJSON ? 'application/json' : 'text/plain';
    const base    = entry.filename.replace(/\.[^.]+$/, '');
    downloadFile(content, `${base}-ocr.${m.ext}`, mime);
  }

  return (
    <div style={s.wrap}>
      {history.map((entry) => (
        <div
          key={entry.id}
          style={s.item}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'var(--bg3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg2)'; }}
        >
          <img src={entry.thumb} alt="" style={s.thumb} />
          <div style={s.info}>
            <div style={s.name}>{entry.filename}</div>
            <div style={s.sub}>
              <MiniTag mode={entry.mode} />
              · {formatTime(entry.time)}
            </div>
          </div>
          <button
            style={s.iconBtn}
            onClick={() => handleDownload(entry)}
            title="Télécharger"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
          >
            <i className="ti ti-download" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
