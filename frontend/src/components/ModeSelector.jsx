import React from 'react';
import { MODES } from '../utils/constants';

const s = {
  wrap: { margin: '0 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: 6 },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--text3)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid var(--border)',
    background: 'none',
    color: 'var(--text)',
    cursor: 'pointer',
    fontFamily: 'var(--font)',
    fontSize: 13,
    textAlign: 'left',
    transition: 'all 0.15s',
    fontWeight: 500,
    width: '100%',
  },
  btnActive: {
    borderColor: 'var(--accent)',
    background: 'var(--accent-glow)',
    color: 'var(--accent2)',
  },
  desc: {
    fontSize: 11,
    color: 'var(--text3)',
    fontWeight: 400,
    marginTop: 1,
  },
};

export default function ModeSelector({ currentMode, onChange }) {
  return (
    <div style={s.wrap}>
      <div style={s.label}>Mode d'extraction</div>
      {Object.entries(MODES).map(([key, m]) => (
        <button
          key={key}
          style={{ ...s.btn, ...(currentMode === key ? s.btnActive : {}) }}
          onClick={() => onChange(key)}
          onMouseEnter={(e) => {
            if (currentMode !== key) {
              e.currentTarget.style.borderColor = 'var(--border2)';
              e.currentTarget.style.background  = 'var(--bg3)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentMode !== key) {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background  = 'none';
            }
          }}
          aria-pressed={currentMode === key}
        >
          <i className={`ti ${m.icon}`} style={{ fontSize: 16, width: 20, textAlign: 'center' }} aria-hidden="true" />
          <div>
            <div>{m.label}</div>
            <div style={s.desc}>{m.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
