import React from 'react'
import DoshaTable from './DoshaTable';

const PlanetPositions = ({ data = [], t }) => {
  // `data` may be an object containing grouping keys, or an array.
  const root = data && !Array.isArray(data) ? data : (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' ? data[0] : {});
  const sameHouse = (root && root.planetsInSameHouse) || {};
  const nearest = (root && (root.planetsInNearestHousesResult || root.planetsInNearestHouses)) || [];
  const opposite = (root && (root.planetsInOppositeHousesResult || root.planetsInOppositeHouses)) || [];

  if (process.env.NODE_ENV === 'development') {
    // small dev-time debug to inspect payload shape
    // eslint-disable-next-line no-console
    console.debug('PlanetPositions data/root:', data, root);
  }

  return (
    <div>
      <h4>Planet Positions</h4>

      {/* planetsInSameHouse - keyed by house (accordion per house) */}
      {/* {Object.keys(sameHouse).length > 0 && (
        <div className="group-section">
          {Object.entries(sameHouse).map(([house, planets]) => (
            <div key={house} className="group-row">
              <div className="group-label">{t ? t('house') : 'House'} {house}</div>
              <div className="group-content">{renderPlanetList(planets)}</div>
            </div>
          ))}
        </div>
      )} */}

      <DoshaTable data={sameHouse} 
                    title="Planets in Same House" />

                     <DoshaTable data={nearest} 
                    title="Planets in Nearest House" />
                     <DoshaTable data={opposite} 
                    title="Planets in Opposite House" />


      {/* fallback if no specialized groups present but generic data exists */}
      {(!Object.keys(sameHouse).length && !nearest.length && !opposite.length) && (
        <div className="no-results">{t ? t('no_results') : 'No planet grouping results'}</div>
      )}
    </div>
  )
}

export default PlanetPositions
