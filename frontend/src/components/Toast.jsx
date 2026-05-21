import React from 'react';

const ICONS = { success: 'ti-check', danger: 'ti-x', warning: 'ti-alert-triangle' };
const COLORS = { success: 'var(--success)', danger: 'var(--danger)', warning: 'var(--warning)' };

export default function Toast({ toast }) {
  if (!toast) return null;
  const color = COLORS[toast.type] || COLORS.success;
  const icon  = ICONS[toast.type]  || ICONS.success;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      background: 'var(--bg3)',
      border: `1px solid ${color}`,
      color,
      padding: '10px 16px',
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      zIndex: 999,
      animation: 'slideIn 0.3s ease',
      boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
    }}>
      <i className={`ti ${icon}`} aria-hidden="true" />
      {toast.msg}
    </div>
  );
}
