import React from 'react';

/**
 * Reusable table component for displaying conjunctions, grouped by house.
 * Accepts multiple input shapes:
 * - Array of objects: [{ house, planet1, planet2, dosha }, ...]
 * - Object grouped by house where value is array of planet names: { 12: ['Surya','Budh', ...], ... }
 * - Object grouped by house where value is array of entry objects: { 12: [{planet1,planet2,dosha}, ...], ... }
 * The component normalizes all shapes into a grouped object and renders per-house tables.
 */
const DoshaTable = ({ data = [], title = 'Dosha Table' }) => {
    // normalize incoming data into a flat array of entries
    const normalizeToEntries = (raw) => {
        if (!raw) return [];
        // If it's already an array of entries, return as-is
        if (Array.isArray(raw)) return raw;

        // If it's an object grouped by house
        if (typeof raw === 'object') {
            const res = [];
            for (const [houseKey, val] of Object.entries(raw)) {
                // values are array
                if (Array.isArray(val)) {
                    if (val.length === 0) continue;
                    // array of strings => list of planet names in same house
                    if (typeof val[0] === 'string') {
                        // generate all unique pairs (i<j)
                        for (let i = 0; i < val.length; i++) {
                            for (let j = i + 1; j < val.length; j++) {
                                res.push({ house: houseKey, planet1: val[i], planet2: val[j], dosha: null });
                            }
                        }
                    } else if (typeof val[0] === 'object') {
                        // array of objects; ensure each entry has house
                        val.forEach((it) => {
                            res.push({ ...it, house: houseKey });
                        });
                    }
                }
            }
            return res;
        }
        return [];
    };

    const entries = normalizeToEntries(data);

    if (!entries || entries.length === 0) {
        return <div className="no-results">No dosha data available.</div>;
    }

    // Sort entries by smallest house number (handles arrays)
    const sorted = entries.slice().sort((a, b) => {
        const aH = Array.isArray(a.house) ? Math.min(...a.house.map(Number)) : Number(a.house);
        const bH = Array.isArray(b.house) ? Math.min(...b.house.map(Number)) : Number(b.house);
        return (aH || 0) - (bH || 0);
    });

    const formatHouseCell = (house) => {
        if (house == null) return '-';
        if (Array.isArray(house)) return house.join(', ');
        return String(house);
    };

    return (
        <div className="dosha-table-section">
            <h3 style={{ marginTop: 0 }}>{title}</h3>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>House</th>
                        <th>Planet 1</th>
                        <th>Planet 2</th>
                        <th>Dosha Created due to This Planet Positions</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((entry, idx) => (
                        <tr key={`${formatHouseCell(entry.house)}-${entry.planet1}-${entry.planet2}-${idx}`} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td>{formatHouseCell(entry.house)}</td>
                            <td>{entry.planet1 || '-'}</td>
                            <td>{entry.planet2 || '-'}</td>
                            <td>{entry.dosha  || ''}</td>

                            {/* <td>{entry.dosha == null || entry.dosha === '' ? '❌' : (entry.dosha === true || entry.dosha === 'true' ? '✅' : String(entry.dosha))}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

/**
 * Groups an array of conjunction objects by their 'house' property.
 * @param {Array<Object>} data 
 * @returns {Object<string, Array<Object>>}
 */
const groupDataByHouse = (data) => {
    return data.reduce((acc, item) => {
        let houses = item.house;
        if (houses == null) return acc;
        // support house as array
        if (!Array.isArray(houses)) houses = [houses];
        houses.forEach((h) => {
            const key = String(h);
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
        });
        return acc;
    }, {});
};

export default DoshaTable;