import React, { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import FilePreview from './components/FilePreview';
import ModeSelector from './components/ModeSelector';
import ResultCard from './components/ResultCard';
import HistoryPanel from './components/HistoryPanel';
import Toast from './components/Toast';
import { useOCR } from './hooks/useOCR';

const s = {
  app:         { display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' },
  main:        { display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' },
  panelLeft:   { borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg2)', overflow: 'hidden' },
  panelRight:  { display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' },
  panelHeader: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--text2)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    flexShrink: 0,
  },
  scrollable:  { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' },
  tabs:        { display: 'flex', borderBottom: '1px solid var(--border)', flexShrink: 0 },
  tab:         { padding: '12px 20px', fontSize: 13, fontWeight: 500, color: 'var(--text3)', cursor: 'pointer', borderBottom: '2px solid transparent', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 },
  tabActive:   { color: 'var(--accent2)', borderBottomColor: 'var(--accent)' },
  extractBtn:  {
    margin: '0 1.5rem 1.5rem',
    padding: 13,
    borderRadius: 10,
    border: 'none',
    background: 'var(--accent)',
    color: '#fff',
    fontFamily: 'var(--font)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    color: 'var(--text3)',
    textAlign: 'center',
    padding: '2rem',
  },
  loading: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    color: 'var(--text2)',
  },
  resultList: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  badge: {
    fontSize: 11,
    background: 'var(--bg4)',
    color: 'var(--text3)',
    padding: '1px 7px',
    borderRadius: 10,
    marginLeft: 4,
  },
};

export default function App() {
  const {
    file, preview, mode, loading, loadingMsg,
    results, history, toast,
    loadFile, clearFile, setMode,
    extract, removeResult,
  } = useOCR();

  const [activeTab, setActiveTab] = useState('results');

  async function handleExtract() {
    setActiveTab('results');
    await extract();
  }

  return (
    <div style={s.app}>
      <Header />

      <main style={s.main}>
        {/* ── Left Panel ── */}
        <div style={s.panelLeft}>
          <div style={s.panelHeader}>
            <i className="ti ti-upload" aria-hidden="true" />
            Document source
          </div>

          {!file ? (
            <UploadZone onFile={loadFile} />
          ) : (
            <>
              {/* scrollable section: preview + modes */}
              <div style={{ ...s.scrollable, overflowY: 'auto', padding: '1.5rem 0 0' }}>
                <FilePreview file={file} preview={preview} onClear={clearFile} />
                <div style={{ height: 16 }} />
                <ModeSelector currentMode={mode} onChange={setMode} />
              </div>

              {/* Extract button always at bottom */}
              <button
                style={{
                  ...s.extractBtn,
                  ...(loading ? { background: 'var(--bg4)', color: 'var(--text3)', cursor: 'not-allowed' } : {}),
                }}
                onClick={handleExtract}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="ti ti-refresh spin" aria-hidden="true" />
                    Analyse en cours…
                  </>
                ) : (
                  <>
                    <i className="ti ti-sparkles" aria-hidden="true" />
                    Extraire avec Claude Vision
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* ── Right Panel ── */}
        <div style={s.panelRight}>
          <div style={s.tabs}>
            <div
              style={{ ...s.tab, ...(activeTab === 'results' ? s.tabActive : {}) }}
              onClick={() => setActiveTab('results')}
            >
              <i className="ti ti-file-text" style={{ fontSize: 14 }} aria-hidden="true" />
              Résultats
            </div>
            <div
              style={{ ...s.tab, ...(activeTab === 'history' ? s.tabActive : {}) }}
              onClick={() => setActiveTab('history')}
            >
              <i className="ti ti-history" style={{ fontSize: 14 }} aria-hidden="true" />
              Historique
              <span style={s.badge}>{history.length}</span>
            </div>
          </div>

          {/* Results tab */}
          {activeTab === 'results' && (
            <>
              {loading && (
                <div style={s.loading}>
                  <i className="ti ti-refresh spin" style={{ fontSize: 32, color: 'var(--accent2)' }} aria-hidden="true" />
                  <div style={{ fontSize: 14, fontWeight: 500 }}>
                    Analyse en cours
                    <span className="pulse-dots"><span>.</span><span>.</span><span>.</span></span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{loadingMsg}</div>
                </div>
              )}

              {!loading && results.length === 0 && (
                <div style={s.empty}>
                  <i className="ti ti-scan" style={{ fontSize: 48, opacity: 0.3 }} aria-hidden="true" />
                  <p style={{ fontSize: 14, maxWidth: 240 }}>
                    Importez un document et choisissez un mode d'extraction pour commencer
                  </p>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div style={s.resultList}>
                  {results.map((entry) => (
                    <ResultCard key={entry.id} entry={entry} onRemove={removeResult} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* History tab */}
          {activeTab === 'history' && (
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <HistoryPanel history={history} />
            </div>
          )}
        </div>
      </main>

      <Toast toast={toast} />
    </div>
  );
}
