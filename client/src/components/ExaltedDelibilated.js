import React from 'react'

const ExaltedDelibilated = ({ exaltedResults = [], debilitatedResults = [], t }) => {
  return (
    <div>
      <div>
        <h4>{t ? t('exalted') : 'Exalted'}</h4>
        {exaltedResults.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>{t ? t('planet') : 'Planet'}</th>
                <th>{t ? t('rashi') : 'Rashi'}</th>
                <th>{t ? t('effect') : 'Effect'}</th>
              </tr>
            </thead>
            <tbody>
              {exaltedResults.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{item.planet}</td>
                  <td>{item.rashi}</td>
                  <td>{item.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">{t ? t('no_results') : 'No exalted results'}</div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <h4>{t ? t('debilitated') : 'Debilitated'}</h4>
        {debilitatedResults.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>{t ? t('planet') : 'Planet'}</th>
                <th>{t ? t('rashi') : 'Rashi'}</th>
                <th>{t ? t('effect') : 'Effect'}</th>
              </tr>
            </thead>
            <tbody>
              {debilitatedResults.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{item.planet}</td>
                  <td>{item.rashi}</td>
                  <td>{item.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">{t ? t('no_results') : 'No debilitated results'}</div>
        )}
      </div>
    </div>
  )
}

export default ExaltedDelibilated
