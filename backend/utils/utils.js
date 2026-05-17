const { rashiList, nakshatraList, dashaOrder, dashaYears, pritishadashtkam, mrityushadashtkam, shubhdvidadashakam, ashubhdvidadashakam, shubhnavpanchmam, neshtnavpanchamam } = require("../consts/consts");
const { checkReversiblePair } = require("../consts/helper/helper");

/**
 * Converts a planet→Rashi map to a planet→Rashi number map
 * @param {Map<string, string>} planetRashiMap - Map of planets to Rashi names
 * @returns {Map<string, number>} - Map of planets to Rashi numbers (1-based)
 */
function convertRashiMapToNumbers(planetRashiMap) {
  const planetRashiNumberMap = new Map();

  for (const [planet, rashi] of planetRashiMap.entries()) {
    const index = rashiList.findIndex(r => r === rashi);
    if (index !== -1) {
      planetRashiNumberMap.set(planet, index + 1); // 1-based number
    } else {
      console.warn(`Rashi "${rashi}" for planet "${planet}" not found in rashiList`);
    }
  }

  return planetRashiNumberMap;
}

/**
 * Processes a map of planet positions (Rashi/House numbers) to find houses
 * containing multiple planets, and returns a list of unique two-planet
 * conjunction pairs for those houses, with a placeholder for Dosha analysis.
 *
 * @param {Map<string, number>} planetRashiNumberMap A Map where key is the planet name
 * (string) and value is the Rashi/House number (1-12).
 * @returns {Object[]} An array of objects, each representing a unique two-planet
 * conjunction pair found in a single house.
 */
function findPlanetsInSameHouseObj(planetRashiNumberMap) {
    const houseMap = new Map();
    const conjunctionPairs = [];

    // 1. Map planets to houses
    // Result: Map { 1: ['Mars'], 12: ['Surya', 'Budh', 'Shukra', 'Rahu'], ... }
    for (const [planet, houseNumber] of planetRashiNumberMap.entries()) {
        if (!houseMap.has(houseNumber)) {
            houseMap.set(houseNumber, []);
        }
        houseMap.get(houseNumber).push(planet);
    }

    // 2. Iterate through houses and generate unique pairs
    for (const [house, planets] of houseMap.entries()) {
        // Only process houses with two or more planets
        if (planets.length > 1) {
            const numPlanets = planets.length;

            // Generate all unique, unordered combinations (pairs)
            for (let i = 0; i < numPlanets; i++) {
                const planet1 = planets[i];

                // Start 'j' from 'i + 1' to avoid duplicate pairs (e.g., [Surya, Budh] and [Budh, Surya])
                // and to prevent a planet pairing with itself.
                for (let j = i + 1; j < numPlanets; j++) {
                    const planet2 = planets[j];

                    conjunctionPairs.push({
                        house: house,
                        planet1: planet1,
                        planet2: planet2,
                        // Placeholder for the Dosha analysis result
                        dosha: null 
                    });
                }
            }
        }
    }

    // console.log("Generated Conjunction Pairs:", conjunctionPairs);
    return conjunctionPairs;
}


/**
 * Finds groups of planets that are in adjacent houses (difference of 1 or 1 and 12)
 * and generates unique planet pairs between those adjacent houses.
 *
 * @param {Map<string, number>} planetRashiNumberMap - Map of planets to Rashi numbers (1-12)
 * @returns {Array<{house1: number, house2: number, planet1: string, planet2: string, dosha: null}>}
 * An array of objects, each representing a single planet pair across two adjacent houses.
 */
function findPlanetsInNearestHouses(planetRashiNumberMap) {
    const houseMap = new Map();
    const adjacentPairs = [];

    // Step 1: Group planets by house number
    for (const [planet, houseNumber] of planetRashiNumberMap.entries()) {
        if (!houseMap.has(houseNumber)) {
            houseMap.set(houseNumber, []);
        }
        houseMap.get(houseNumber).push(planet);
    }

    // Step 2: Extract and sort all house numbers present
    const housesPresent = Array.from(houseMap.keys());

    // Helper function to generate all combinations between two planet lists
    // Note: The houses array will be [smallerHouse, largerHouse] for consistency
    const generatePairs = (h1, pList1, h2, pList2) => {
        // Determine the canonical order for the houses array: [smaller, larger]
        // This is primarily for consistency in the output structure.
        const [smallerHouse, largerHouse] = h1 < h2 ? [h1, h2] : [h2, h1];
        
        // Use the original lists based on h1 and h2 for planet pairing
        const list1 = houseMap.get(h1);
        const list2 = houseMap.get(h2);

        for (const p1 of list1) {
            for (const p2 of list2) {
                // Determine which planet belongs to the 'smallerHouse' and which to the 'largerHouse'
                // This preserves the planet-to-house association clearly
                const planetInSmallerHouse = (h1 === smallerHouse) ? p1 : p2;
                const planetInLargerHouse = (h1 === largerHouse) ? p1 : p2;

                adjacentPairs.push({
                    house: [smallerHouse, largerHouse], // Combined house array
                    planet1: planetInSmallerHouse,
                    planet2: planetInLargerHouse,
                    dosha: null // Placeholder for later analysis
                });
            }
        }
    };

    // Step 3: Find adjacent pairs (H, H+1) and generate combinations
    for (const house of housesPresent) {
        // Check for the next consecutive house
        const nextHouse = house + 1;

        if (houseMap.has(nextHouse)) {
            // house is H, nextHouse is H+1. h1 will be house, h2 will be nextHouse.
            generatePairs(house, houseMap.get(house), nextHouse, houseMap.get(nextHouse));
        }
    }

    // Step 4: Handle the wrap-around adjacency (House 1 and House 12)
    if (houseMap.has(1) && houseMap.has(12)) {
        // h1=1, h2=12. generatePairs will store them as [1, 12]
        generatePairs(1, houseMap.get(1), 12, houseMap.get(12));
    }

    // console.log("Adjacent House Planet Pairs (Modified Structure):", adjacentPairs);
    return adjacentPairs;
}

/**
 * Finds groups of planets that are in opposite houses (difference = 6)
 * and generates unique planet pairs between those opposite houses.
 *
 * @param {Map<string, number>} planetRashiNumberMap - Map of planets to Rashi numbers (1-12)
 * @returns {Array<{house1: number, house2: number, planet1: string, planet2: string, dosha: null}>}
 * An array of objects, each representing a single planet pair across two opposite houses.
 */
function findPlanetsInOppositeHouses(planetRashiNumberMap) {
    const houseMap = new Map();
    const oppositePairs = [];
    const processedPairs = new Set(); // To prevent duplicates (e.g., check 1-7 and then 7-1)

    // Step 1: Group planets by house number
    for (const [planet, houseNumber] of planetRashiNumberMap.entries()) {
        if (!houseMap.has(houseNumber)) {
            houseMap.set(houseNumber, []);
        }
        houseMap.get(houseNumber).push(planet);
    }

    // Step 2: Iterate through houses and find opposite pairs
    for (const [house, planetsInHouse] of houseMap.entries()) {
        // Calculate the house exactly 6 houses away (opposite house)
        const oppositeHouse = house <= 6 ? house + 6 : house - 6;

        // Create a unique key for the pair, always sorted (e.g., '1-7', not '7-1')
        const key = [house, oppositeHouse].sort((a, b) => a - b).join("-");

        // Check if the opposite house has planets AND we haven't processed this pair yet
        if (houseMap.has(oppositeHouse) && !processedPairs.has(key)) {
            const oppositePlanets = houseMap.get(oppositeHouse);

            // Use the sorted houses for consistent output (smallerHouse < largerHouse)
            const smallerHouse = Math.min(house, oppositeHouse); // e.g., 1
            const largerHouse = Math.max(house, oppositeHouse);  // e.g., 7

            // Determine which planet list corresponds to the smaller house
            const planetsInSmallerHouse = (house === smallerHouse) ? planetsInHouse : oppositePlanets;
            const planetsInLargerHouse = (house === largerHouse) ? planetsInHouse : oppositePlanets;

            // Generate all cross-combinations (pairs) of planets between the two houses
            for (const p1 of planetsInSmallerHouse) {
                for (const p2 of planetsInLargerHouse) {
                    oppositePairs.push({
                        house: [smallerHouse, largerHouse], // Combined house array: [1, 7]
                        planet1: p1,
                        planet2: p2,
                        dosha: null // Placeholder for later analysis
                    });
                }
            }
            
            // Mark this house pair as processed
            processedPairs.add(key);
        }
    }

    // // console.log("Opposite House Planet Pairs (Modified Structure):", oppositePairs);
    return oppositePairs;
}

/**
 * Extracts date/time strings from a block of text and returns array of YYYY-MM-DD strings.
 * Matches common formats like "23 Mar 2025, Sunday, 22:24", "23/03/2025 22:24", "2025-03-23 22:24"
 */
function extractDatesFromText(text) {
  if (!text) return [];

  const results = [];

  const monthMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };

  // Pattern 1: 23 Mar 2025, ... 22:24 (day month year [optional weekday] [optional time])
  const monthNameRegex = /\b(\d{1,2})\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[,\s]+(\d{4})(?:[,\s]+[A-Za-z]+)?(?:[,\s]+(\d{1,2}:\d{2}))?/gi;

  // Pattern 2: dd/mm/yyyy or dd-mm-yyyy with optional time
  const numericRegex = /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:[,\s]+(\d{1,2}:\d{2}))?/g;

  // Pattern 3: yyyy-mm-dd with optional time
  const isoLikeRegex = /\b(\d{4})[\-](\d{1,2})[\-](\d{1,2})(?:[T\s](\d{1,2}:\d{2}))?/g;

  let m;

  while ((m = monthNameRegex.exec(text)) !== null) {
    try {
      const day = parseInt(m[1], 10);
      const mon = m[2].slice(0,3).toLowerCase();
      const year = parseInt(m[3], 10);
      const timePart = m[4];
      const monthIndex = monthMap[mon];
      let hour = 0, minute = 0;
      if (timePart) {
        const [h, mm] = timePart.split(':').map(Number);
        hour = h; minute = mm;
      }
      const dt = new Date(year, monthIndex, day, hour, minute);
      if (!isNaN(dt)) {
        results.push({ date: dt, index: m.index });
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  while ((m = numericRegex.exec(text)) !== null) {
    try {
      const day = parseInt(m[1], 10);
      const month = parseInt(m[2], 10);
      const year = parseInt(m[3], 10);
      const timePart = m[4];
      let hour = 0, minute = 0;
      if (timePart) {
        const [h, mm] = timePart.split(':').map(Number);
        hour = h; minute = mm;
      }
      const dt = new Date(year, month - 1, day, hour, minute);
      if (!isNaN(dt)) {
        results.push({ date: dt, index: m.index });
      }
    } catch (e) {}
  }

  while ((m = isoLikeRegex.exec(text)) !== null) {
    try {
      const year = parseInt(m[1], 10);
      const month = parseInt(m[2], 10);
      const day = parseInt(m[3], 10);
      const timePart = m[4];
      let hour = 0, minute = 0;
      if (timePart) {
        const [h, mm] = timePart.split(':').map(Number);
        hour = h; minute = mm;
      }
      const dt = new Date(year, month - 1, day, hour, minute);
      if (!isNaN(dt)) {
        results.push({ date: dt, index: m.index });
      }
    } catch (e) {}
  }

  // Sort by appearance in text
  results.sort((a, b) => a.index - b.index);

  // Map to YYYY-MM-DD strings, remove duplicates while preserving order
  const seen = new Set();
  const formatted = [];
  for (const r of results) {
    const dt = r.date;
    const y = dt.getFullYear();
    const mth = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const s = `${y}-${mth}-${day}`;
    if (!seen.has(s)) {
      seen.add(s);
      formatted.push(s);
    }
  }

  return formatted;
}
function getCurrentDashaFromNakshatra(nakshatraName, pada, birthDate, currentDate = new Date()) {
  const nakshatraIndex = nakshatraList.indexOf(nakshatraName);
  if (nakshatraIndex === -1) {
    throw new Error('Invalid Nakshatra name');
  }

  const birthNakshatraLord = dashaOrder[nakshatraIndex % 9];
  const mahadashaDuration = dashaYears[birthNakshatraLord] * 365.25 * 24*60*60*1000; // in ms
  const fractionElapsed = (pada - 1) / 4;
  const mahadashaStart = new Date(birthDate.getTime() - fractionElapsed * mahadashaDuration);
  const mahadashaEnd = new Date(mahadashaStart.getTime() + mahadashaDuration);

  // Determine current Mahadasha
  let currentMahadasha = birthNakshatraLord;
  let tempStart = mahadashaStart;
  while (tempStart < currentDate) {
    const tempEnd = new Date(tempStart.getTime() + dashaYears[currentMahadasha] * 365.25*24*60*60*1000);
    if (currentDate >= tempStart && currentDate < tempEnd) {
      break;
    }
    const nextIndex = (dashaOrder.indexOf(currentMahadasha) + 1) % 9;
    currentMahadasha = dashaOrder[nextIndex];
    tempStart = tempEnd;
  }

  // Antardasha calculation
  const antardashaDurations = dashaOrder.map(p => (dashaYears[p] / dashaYears[currentMahadasha]) * (mahadashaEnd - mahadashaStart));
  let antardashaStart = mahadashaStart;
  let currentAntardasha = dashaOrder[0];

  for (let i = 0; i < antardashaDurations.length; i++) {
    const antardashaEnd = new Date(antardashaStart.getTime() + antardashaDurations[i]);
    if (currentDate >= antardashaStart && currentDate < antardashaEnd) {
      currentAntardasha = dashaOrder[i];
      return {
        mahadasha: currentMahadasha,
        mahadashaStart,
        mahadashaEnd,
        antardasha: currentAntardasha,
        antardashaStart,
        antardashaEnd
      };
    }
    antardashaStart = antardashaEnd;
  }

  return null;
}

/**
 * Helper function to extract the Rashi from the PDF text.
 * @param {string} pdfText The entire text content extracted from the PDF.
 * @returns {string | null} The extracted Rashi name or null if not found.
 */
function extractRashi(pdfText) {
    if (!pdfText) return null;

    // Split text into lines, trim whitespace, and remove empty lines
    const lines = pdfText.split('\n').map(l => l.trim()).filter(Boolean);

    for (const line of lines) {
        // Check for 'Rashi' at the start of the line (case-insensitive search)
        // If your PDF text might have 'Rashi: Vrishabha' or similar, you can use
        // if (line.toLowerCase().includes("rashi")) { ... }
        if (line.startsWith("Rashi" || " राशि")) {
            // Find the Rashi name from the rashiList that exists in the current line
            const rashi = rashiList.find(r => line.includes(r));
            if (rashi) {
                return rashi;
            }
        }
    }
    return null; // Return null if Rashi is not found
}

/**
 * Returns the index (position number, 1-based) of a Rashi name in the list.
 * @param {string} rashi The Rashi name (e.g., 'Vrishabha'). Case-sensitive.
 * @returns {number | null} The 1-based index (1 to 12) or null if not found.
 */
function getRashiNumber(rashi) {
    // 1. Find the 0-based index of the Rashi in the array
    const index = rashiList.indexOf(rashi);

    // 2. Check if the Rashi was found
    if (index === -1) {
        // Rashi not found in the list
        return null; 
    }

    // 3. Convert the 0-based index to a 1-based number
    return index + 1;
}

function isPritishadashtkamYogaPresent(pair) {
    // The generic function is called with the specific list
    return checkReversiblePair(pair, pritishadashtkam);
}

  /**
 * Checks if the given Rashi number pair constitutes a Mrityu Shadashtkam yoga.
 */
function isMrityushadashtkamYogaPresent(pair) {
  return checkReversiblePair(pair, mrityushadashtkam);
}

/**
 * Checks if the given Rashi number pair constitutes a Shubh Dwidwadashakam yoga (Auspicious 2/12).
 */
function isShubhdvidadashakamYogaPresent(pair) {
  return checkReversiblePair(pair, shubhdvidadashakam);
}

/**
 * Checks if the given Rashi number pair constitutes an Ashubh Dwidwadashakam yoga (Inauspicious 2/12).
 */
function isAshubhdvidadashakamYogaPresent(pair) {
  return checkReversiblePair(pair, ashubhdvidadashakam);
}

/**
 * Checks if the given Rashi number pair constitutes a Shubh Navpanchamam yoga (Auspicious 9/5).
 */
function isShubhnavpanchamamYogaPresent(pair) {
  return checkReversiblePair(pair, shubhnavpanchmam);
}

/**
 * Checks if the given Rashi number pair constitutes a Nesht Navpanchamam yoga (Inauspicious 9/5).
 */
function isNeshtnavpanchamamYogaPresent(pair) {
  return checkReversiblePair(pair, neshtnavpanchamam);
}

function getMatchMakingYog(maleRashi, femaleRashi){
  const maleRashiNum = getRashiNumber(maleRashi);
  const femaleRashiNum = getRashiNumber(femaleRashi); 
  return {
    pritishadashtkam: isPritishadashtkamYogaPresent([maleRashiNum, femaleRashiNum]),
    mrityushadashtkam: isMrityushadashtkamYogaPresent([maleRashiNum, femaleRashiNum]),
    shubhdvidadashakam: isShubhdvidadashakamYogaPresent([maleRashiNum, femaleRashiNum]),
    ashubhdvidadashakam: isAshubhdvidadashakamYogaPresent([maleRashiNum, femaleRashiNum]),  
  shubhnavpanchamam: isShubhnavpanchamamYogaPresent([maleRashiNum, femaleRashiNum]),
  neshtnavpanchamam: isNeshtnavpanchamamYogaPresent([maleRashiNum, femaleRashiNum]) 
}
}


module.exports = {
  convertRashiMapToNumbers,
  findPlanetsInSameHouseObj,
  findPlanetsInNearestHouses,
  findPlanetsInOppositeHouses,
  extractDatesFromText,
  getCurrentDashaFromNakshatra,
  extractRashi,
  getRashiNumber,
  getMatchMakingYog
};
