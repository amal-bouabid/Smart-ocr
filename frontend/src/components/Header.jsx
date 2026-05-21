import React from 'react';

const styles = {
  header: {
    borderBottom: '1px solid var(--border)',
    padding: '0 2rem',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'var(--bg2)',
    flexShrink: 0,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  logoIcon: {
    width: 32,
    height: 32,
    background: 'var(--accent)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    fontSize: 11,
    background: 'var(--accent-glow)',
    color: 'var(--accent2)',
    border: '1px solid rgba(108,99,255,0.3)',
    padding: '3px 10px',
    borderRadius: 20,
    fontWeight: 500,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  subtitle: {
    fontSize: 12,
    color: 'var(--text3)',
  },
};

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <i className="ti ti-scan" style={{ color: 'white', fontSize: 18 }} aria-hidden="true" />
        </div>
        SmartOCR
      </div>
      <div style={styles.right}>
        <span style={styles.badge}>
          <i className="ti ti-cpu" style={{ fontSize: 11, marginRight: 4 }} aria-hidden="true" />
          Claude Vision API
        </span>
        <span style={styles.subtitle}>AI Engineer Project · Amal</span>
      </div>
    </header>
  );
}
