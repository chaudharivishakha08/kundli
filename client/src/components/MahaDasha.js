import React from 'react'

const fmtDate = (iso) => {
  if (!iso) return '-';
  const dt = typeof iso === 'string' ? new Date(iso) : iso;
  try {
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(dt);
  } catch (e) {
    return dt.toLocaleDateString();
  }
}

const renderDasha = (d = {}, t) => {
  const maha = d.mahadasha || d.MahaDasha || d.mahadashaName || d.name || d.mahadasha || d.planet || '-';
  const mahaStart = d.mahadashaStart || d.start || d.from || d.mahadasha_from;
  const mahaEnd = d.mahadashaEnd || d.end || d.to || d.mahadasha_to;

  const anti = d.antardasha || d.antarDasha || d.sub || d.antardashaName || '-';
  const antiStart = d.antardashaStart || d.antarStart || d.subStart;
  const antiEnd = d.antardashaEnd || d.antarEnd || d.subEnd;

  return (
    <div key={`${maha}-${mahaStart}`}> 
      <div className="dasha-card">
        <div className="dasha-header">
          <div className="dasha-title">{t ? t('mahadasha') : 'Maha Dasha'} — {maha}</div>
          <div className="dasha-period">{fmtDate(mahaStart)} — {fmtDate(mahaEnd)}</div>
        </div>
        <div className="dasha-body">
          <div className="dasha-row">
            <div className="dasha-label">{t ? t('start') : 'Start'}</div>
            <div className="dasha-value">{fmtDate(mahaStart)}</div>
          </div>
          <div className="dasha-row">
            <div className="dasha-label">{t ? t('end') : 'End'}</div>
            <div className="dasha-value">{fmtDate(mahaEnd)}</div>
          </div>
        </div>
      </div>

      <div className="antardasha-card">
        <div className="dasha-header">
          <div className="dasha-title">{t ? t('antardasha') : 'Antardasha'} — {anti}</div>
          <div className="dasha-period">{fmtDate(antiStart)} — {fmtDate(antiEnd)}</div>
        </div>
        <div className="dasha-body">
          <div className="dasha-row">
            <div className="dasha-label">{t ? t('start') : 'Start'}</div>
            <div className="dasha-value">{fmtDate(antiStart)}</div>
          </div>
          <div className="dasha-row">
            <div className="dasha-label">{t ? t('end') : 'End'}</div>
            <div className="dasha-value">{fmtDate(antiEnd)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MahaDasha = ({ data = [], t }) => {
  const items = Array.isArray(data) ? data : [data];
  if (!items.length) return <div className="no-results">{t ? t('no_results') : 'No MahaDasha data'}</div>;

  return (
    <div>
      {items.map((d) => renderDasha(d, t))}
    </div>
  )
}

export default MahaDasha
