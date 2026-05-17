import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import ExaltedDelibilated from './ExaltedDelibilated';
import MahaDasha from './MahaDasha';
import PlanetPositions from './PlanetPositions';

const PdfUpload = ({ language }) => {
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('exalted');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Auto-process when language changes
  useEffect(() => {
    if (file) {
      processFile();
    }
  }, [language]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults(null);
    setError('');
  };

  const processFile = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResults(null);
    const formData = new FormData();
    formData.append('pdfFile', file);
    try {
      const response = await fetch(`http://localhost:3000/upload?language=${language}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to process PDF');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Error uploading or processing PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await processFile();
  };

  return (
    <div className="app-bg">
      <h2>{t('upload_title')}</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept="application/pdf" onChange={handleFileChange} required className="file-input" />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? t('processing') : t('submit')}
        </button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      {results && (
        <div>

          {/* Tabs to switch detailed views. */}
          <div className="tabs">
            <button className={activeTab === 'exalted' ? 'tab active' : 'tab'} onClick={() => setActiveTab('exalted')}>
              {/* {t('exalted_and_debilitated')} */}
              Exalted & Debilitated Results
            </button>
            <button className={activeTab === 'mahadasha' ? 'tab active' : 'tab'} onClick={() => setActiveTab('mahadasha')}>
              {/* {t('mahadasha')} */}
              Mahadasha
            </button>
            <button className={activeTab === 'planet_positions' ? 'tab active' : 'tab'} onClick={() => setActiveTab('planet_positions')}>
              {/* {t('planet_positions')} */}
              Planet Positions
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'exalted' && (
              <ExaltedDelibilated
                exaltedResults={results.exaltedResults || []}
                debilitatedResults={results.debilitatedResults || []}
                t={t}
              />
            )}
            {activeTab === 'mahadasha' && (
              <MahaDasha data={results.dasha || []} t={t} />
            )}
            {activeTab === 'planet_positions' && (
              <PlanetPositions
                data={results.planetPositions || results.planetPositionsResults || []}
                t={t}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUpload; 