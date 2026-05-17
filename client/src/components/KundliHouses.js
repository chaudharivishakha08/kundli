import React, { useState } from 'react';

const PLANETS = ['Surya', 'Chandra', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani','Rahu','Ketu'];
const HOUSES = Array.from({ length: 12 }, (_, i) => i + 1);
const RASHIS_MARATHI = ['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];

const KundliHouses = ({ onChange }) => {
  const [selections, setSelections] = useState({});
  const [moonRashi, setMoonRashi] = useState(null); // Index 0-11

  const handleSelect = (planet, house) => {
    const next = { ...selections, [planet]: house };
    setSelections(next);
  };

  const handleRashiSelect = (index) => {
    setMoonRashi(index);
  };

  const handleSubmitAll = () => {
    // 1. Validation: Ensure Moon's house and Moon's Rashi are selected
    const moonHouse = selections['Chandra'];
    
    if (!moonHouse || moonRashi === null) {
      alert("Please select Chandra's House and Moon Rashi first!");
      return;
    }

    // 2. Calculate Lagna (Rashi in the 1st House)
    // Formula: (MoonRashiIndex + 1) - MoonHouse + 1
    // We add 12 before modulo to handle negative results
    let lagnaRashiNo = ((moonRashi + 1) - moonHouse + 12) % 12;
    if (lagnaRashiNo === 0) lagnaRashiNo = 12;

    // 3. Generate the completed Payload
    const finalSelections = Object.entries(selections).map(([planet, house]) => {
      // Calculate Rashi for this specific planet's house
      let planetRashiIndex = (lagnaRashiNo + house - 2) % 12;
      
      return {
        planet: planet,
        house: house,
        rashi_no: planetRashiIndex + 1,
        rashi_mr: RASHIS_MARATHI[planetRashiIndex]
      };
    });

    const payload = {
      lagna_rashi_no: lagnaRashiNo,
      lagna_rashi_mr: RASHIS_MARATHI[lagnaRashiNo - 1],
      planets: finalSelections
    };

    // console.log('Final Kundli Payload:', payload);
    if (typeof onChange === 'function') onChange(payload);
  };

  const handleReset = () => {
    setSelections({});
    setMoonRashi(null);
    if (typeof onChange === 'function') onChange(null);
  };

  return (
    <div className="kundli-container">
      <h3 style={{ marginBottom: 12 }}>Kundli Houses</h3>
      
      <div className="kundli-layout">
        {/* Left: Planets Grid */}
        <div className="kundli-planets-section">
          <div className="kundli-grid">
            {PLANETS.map((planet) => (
              <div key={planet} className="planet-row">
                <div className="planet-name">{planet}</div>
                <div className="houses-grid">
                  {HOUSES.map((n) => {
                    const selected = selections[planet] === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        className={`house-circle ${selected ? 'selected' : ''}`}
                        onClick={() => handleSelect(planet, n)}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Rashi Selection */}
        <div className="kundli-rashi-section">
          <h4 style={{ marginTop: 0, marginBottom: 8 }}>चंद्र राशी</h4>
          <div className="rashi-grid-vertical">
            {RASHIS_MARATHI.map((r, idx) => (
              <button
                key={r}
                type="button"
                className={`rashi-circle ${moonRashi === idx ? 'selected' : ''}`}
                onClick={() => handleRashiSelect(idx)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="kundli-actions" style={{ marginTop: 12 }}>
        <button onClick={handleSubmitAll} style={{ marginRight: 10 }}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default KundliHouses;