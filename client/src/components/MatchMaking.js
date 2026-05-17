import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';

const Matchmaking = ({ language }) => {
  const { t, i18n } = useTranslation();
  const [maleFile, setMaleFile] = useState(null);
  const [femaleFile, setFemaleFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (i18n && language) i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleMaleChange = (e) => {
    // console.log("male file",(e.target.files[0]));
    
    setMaleFile(e.target.files[0]);
    setResults(null);
    setError('');
  };

  const handleFemaleChange = (e) => {
    // console.log("female file",(e.target.files[0]));

    setFemaleFile(e.target.files[0]);
    setResults(null);
    setError('');
  };

const processFiles = async () => {
  if (!maleFile || !femaleFile) {
    setError(t('please_upload_both') || 'Please upload both male and female kundli.');
    return;
  }
  setLoading(true);
  setError('');
  setResults(null);

  const formData = new FormData();
  
  formData.append('malePdf', maleFile); 
  formData.append('femalePdf', femaleFile);
  
  try {
    const resp = await fetch(`http://localhost:3000/match-making?language=${language}`, {
      method: 'POST',
      body: formData,
    });
    
    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: 'Upload failed with an unknown error.' }));
      throw new Error(errorData.error || `Upload failed with status ${resp.status}`);
    }
    
    const data = await resp.json();
    // console.log("data",data);
    
    setResults(data);
  } catch (err) {
    console.error("Matchmaking error:", err.message);
    setError(err.message || t('matchmaking_error') || 'Error uploading or processing kundli files.');
  } finally {
    setLoading(false);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    await processFiles();
  };

  const formatYogName = (key) => {
    if (!key) return '';
    // replace underscores, camelCase split, then capitalize
    const withSpaces = key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  const renderMatchTable = (matchObj) => {
    const entries = Object.entries(matchObj || {});
    if (!entries.length) return <div className="no-results">{t('no_match_data') || 'No match data available.'}</div>;
    return (
      <table className="results-table">
        <thead>
          <tr>
            <th>{t('yog') || 'Yog'}</th>
            <th>{t('exists') || 'Exists'}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([k, v], idx) => (
            <tr key={k} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{formatYogName(k)}</td>
              <td style={{ fontSize: 18 }}>{v ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="app-bg">
      {/* <h3>{t('matchmaking_title') || 'Matchmaking'}</h3> */}
      <h3>Matchmaking</h3>  
      <form onSubmit={handleSubmit} className="upload-form matchmaking-form">
        <div className="file-row">
          <label className="file-label">
            {/* {t('male_kundli') || 'Male Kundli'} */}
            {'Male Kundli'}
            <input type="file" accept="application/pdf" onChange={handleMaleChange} required className="file-input matchmaking-file" />
          </label>
          <label className="file-label">
            {/* {t('female_kundli') || 'Female Kundli'} */}
            {'Female Kundli'}
            <input type="file" accept="application/pdf" onChange={handleFemaleChange} required className="file-input matchmaking-file" />
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="submit" className="submit-btn" disabled={loading}>
            {'Submit'}
            {/* {loading ? (t('processing') || 'Processing...') : (t('submit') || 'Submit')} */}
          </button>
        </div>
      </form>

      {error && <div className="error-msg">{error}</div>}

      {results && (
        <div className="result-block">
          {/* <h4>{t('matchmaking_result') || 'Matchmaking Result'}</h4> */}
          <h4>Matchmaking Result</h4>
          {(() => {
            const match = results.matchMakingResult || results.matchmakingResult || results.matchMaking || results.matchingResult;
            return match ? renderMatchTable(match) : <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(results, null, 2)}</pre>;
          })()}
        </div>
      )}
    </div>
  );
};

export default Matchmaking;

