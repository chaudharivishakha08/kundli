/**
 * Checks if a given two-number pair exists within a list of pairs,
 * ignoring the order of the numbers in the pair (e.g., [A, B] matches [B, A]).
 *
 * @param {number[]} pair An array containing exactly two numbers (e.g., [12, 5]).
 * @param {number[][]} constantList The list of pre-defined pairs to check against.
 * @returns {boolean} True if the pair (or its reverse) is found, otherwise false.
 */
function checkReversiblePair(pair, constantList) {
  if (!Array.isArray(pair) || pair.length !== 2) {
    console.error("Input 'pair' must be an array of exactly two numbers.");
    return false;
  }

  const [a, b] = pair;

  for (const existingPair of constantList) {
    const [x, y] = existingPair;

    // Check for match in either order: (a, b) vs (x, y) OR (a, b) vs (y, x)
    if ((a === x && b === y) || (a === y && b === x)) {
      return true;
    }
  }

  return false;
}

/**
 * Get the lord (ruler) of a specific house
 * 
 * Process:
 * 1. Find the house object from houses array matching the houseNumber
 * 2. Get the planet_id from that house object
 * 3. Find the planet object from planets array with that planet_id
 * 4. Return the sign lord ID from planet.rasi.lord.id
 * 
 * @param {number} houseNumber - The house number (1-12)
 * @param {Array} planets - Array of planet objects from API
 * @param {Array} houses - Array of house placement objects
 * @returns {number|null} The lord ID of the house, or null if not found
 * 
 * @example
 * const lordId = getLordOfHouse(1, planets, houses);
 * // Returns the planet ID that rules the sign in the 1st house
 */
function getLordOfHouse(houseNumber, planets, houses) {
  try {
    // Step 1: Find the house object by matching houseNumber
    const houseObj = houses.find(h => h.house === houseNumber);
    
    if (!houseObj) {
      console.warn(`House ${houseNumber} not found in houses array`);
      return null;
    }

    // Step 2: Get the planet_id from the house object
    const planetId = houseObj.planet_id;
    
    if (planetId === null || planetId === undefined) {
      console.warn(`No planet_id found for house ${houseNumber}`);
      return null;
    }

    // Step 3: Find the planet object with matching planet_id
    const planetObj = planets.find(p => p.id === planetId);
    
    if (!planetObj) {
      console.warn(`Planet with ID ${planetId} not found in planets array`);
      return null;
    }

    // Step 4: Return the rasi lord ID
    if (!planetObj.rasi || !planetObj.rasi.lord || planetObj.rasi.lord.id === undefined) {
      console.warn(`No rasi lord found for planet ${planetObj.name} in house ${houseNumber}`);
      return null;
    }

    const lordId = planetObj.rasi.lord.id;
    
    // console.log(`House ${houseNumber} Lord: ${planetObj.rasi.lord.name} (ID: ${lordId})`);
    
    return lordId;
  } catch (error) {
    console.error(`Error in getLordOfHouse for house ${houseNumber}:`, error);
    return null;
  }
}

module.exports = {
  checkReversiblePair,
  getLordOfHouse
}