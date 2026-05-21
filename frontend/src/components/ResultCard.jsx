import React from 'react';
import { MODES, TAG_COLORS } from '../utils/constants';
import { syntaxHighlightJSON, escapeHtml, downloadFile, wordCount } from '../utils/helpers';

const JSON_MODES = ['table', 'invoice', 'card'];

const s = {
  card: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    overflow: 'hidden',
    animation: 'fadeIn 0.3s ease',
  },
  head: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  meta: { display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 },
  filename: {
    fontSize: 12,
    color: 'var(--text3)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  actions: { display: 'flex', gap: 6 },
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
  body: { padding: 16 },
  text: {
    fontFamily: 'var(--mono)',
    fontSize: 12.5,
    lineHeight: 1.7,
    color: 'var(--text2)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: 340,
    overflowY: 'auto',
  },
  json: {
    fontFamily: 'var(--mono)',
    fontSize: 12.5,
    lineHeight: 1.7,
    maxHeight: 340,
    overflowY: 'auto',
  },
  wordCount: { fontSize: 11, color: 'var(--text3)', marginRight: 8 },
};

function Tag({ mode }) {
  const m = MODES[mode];
  const colors = TAG_COLORS[m.tag];
  return (
    <span style={{
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 9px',
      borderRadius: 20,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      whiteSpace: 'nowrap',
      background: colors.bg,
      color: colors.color,
    }}>
      {m.label}
    </span>
  );
}

export default function ResultCard({ entry, onRemove }) {
  const { id, filename, mode, text, parsed } = entry;
  const isJSON = JSON_MODES.includes(mode) && parsed !== null;
  const wc = wordCount(text);

  function handleCopy() {
    const content = isJSON ? JSON.stringify(parsed, null, 2) : text;
    navigator.clipboard.writeText(content).catch(() => {});
  }

  function handleDownload() {
    const m = MODES[mode];
    const content  = isJSON ? JSON.stringify(parsed, null, 2) : text;
    const mime     = isJSON ? 'application/json' : 'text/plain';
    const basename = filename.replace(/\.[^.]+$/, '');
    downloadFile(content, `${basename}-ocr.${m.ext}`, mime);
  }

  const jsonHTML   = isJSON ? syntaxHighlightJSON(JSON.stringify(parsed, null, 2)) : '';
  const plainHTML  = escapeHtml(text);

  return (
    <div style={s.card}>
      <div style={s.head}>
        <div style={s.meta}>
          <Tag mode={mode} />
          <span style={s.filename}>{filename}</span>
        </div>
        <span style={s.wordCount}>{wc} mots · {text.length} chars</span>
        <div style={s.actions}>
          <button
            style={s.iconBtn}
            onClick={handleCopy}
            title="Copier"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
          >
            <i className="ti ti-copy" aria-hidden="true" />
          </button>
          <button
            style={s.iconBtn}
            onClick={handleDownload}
            title="Télécharger"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
          >
            <i className="ti ti-download" aria-hidden="true" />
          </button>
          <button
            style={s.iconBtn}
            onClick={() => onRemove(id)}
            title="Fermer"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = 'var(--danger)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div style={s.body}>
        {isJSON ? (
          <div style={s.json}>
            <pre dangerouslySetInnerHTML={{ __html: jsonHTML }} />
          </div>
        ) : (
          <div
            style={s.text}
            dangerouslySetInnerHTML={{ __html: plainHTML }}
          />
        )}
      </div>
    </div>
  );
}
