const axios = require('axios');
const { EXALTATION_DEBILATION_CONDITIONS, janmAkshar, ASPECTS_CONFIG, rashiList, yogas } = require('../consts/consts');
const { initializeYogaRegistry, yogaRegistry } = require('../utils/yogas');


/**
 * Calculates Janmakshar (birth syllable) based on nakshatra_id and charan (pada).
 * @param {number} nakshatraId - The ID of the nakshatra (1-27)
 * @param {number} charan - The charan/pada (1-4)
 * @returns {string} The janmakshar value or null if not found
 */
function getJanmakshar(nakshatraId, charan) {
    const match = janmAkshar.find(
        (item) => (item.nakshatra_id-1) === nakshatraId && item.charan === charan
    );
    return match ? match.janmakshar : null;
}

/**
 * Calculate all registered yogas using the Yoga Registry Pattern
 * Initializes the yoga registry on first call and then uses it to calculate all yogas
 * @param {Array} planets - Array of planet data from API
 * @param {Array} houses - Array of house placements
 * @returns {Array} Array of found yogas with their details
 */
function calculateYogas(planets, houses) {
    // Initialize yoga registry if not already initialized
    if (yogaRegistry.getCount() === 0) {
        // console.log("Initializing Yoga Registry...");
        initializeYogaRegistry();
    }

    // Debug: Log available planet IDs and house placements
    // console.log("\n=== YOGA CALCULATION DEBUG ===");
    // console.log("Available planets in chart:");
    planets.forEach(p => {
        // console.log(`  - ID: ${p.id}, Name: ${p.name}`);
    });
    
    // console.log("\nHouse placements:");
    houses.forEach(h => {
        if (h.planet_id) {
            // console.log(`  - Planet ID ${h.planet_id} (${h.planet_name}) in House ${h.house}`);
        }
    });
    // console.log("==============================\n");
    // console.log("planets reg",planets);
    // console.log("houses reg",houses);
    
    

    // Calculate all registered yogas and return the results
    return yogaRegistry.calculateAllYogas(planets, houses);
}

/**
 * Enriches planet data with exaltation and debilitation information.
 * @param {Array} planetData - Your current list of planets (e.g., from a birth chart).
 */
function getPlanetaryConditions(planetData) {
  // Filter to only include actual planets (id 1-6: Sun, Moon, Mercury, Venus, Mars, Jupiter)
  const actualPlanets = planetData.filter(planet => planet.id >= 1 && planet.id <= 6);
  
  return actualPlanets.map((currentPlanet) => {
    // 1. Find the condition matching the planet_id
    const rules = EXALTATION_DEBILATION_CONDITIONS.find(
      (item) => item.planet_id === currentPlanet.id
    );

    // console.log("Planet ID:", currentPlanet.id, "Name:", currentPlanet.name, "Sign ID:", currentPlanet.rasi.id, "Sign Name:", currentPlanet.rasi.name);
    
    if (rules) {
      // console.log("Rules found - Exalted Sign ID:", rules.exalted_sign_id, "Debilitated Sign ID:", rules.debilitated_sign_id);
    } else {
      // console.log("No rules found for planet ID:", currentPlanet.id);
    }

    const isExalted = rules ? currentPlanet.rasi.id === rules.exalted_sign_id : false;
    const isDebilitated = rules ? currentPlanet.rasi.id === rules.debilitated_sign_id : false;

    // console.log("Result - Is Exalted:", isExalted, "Is Debilitated:", isDebilitated);

    // 2. Return the existing data merged with the extra data
    return {
      planet_name: currentPlanet.name,
      sign: currentPlanet.rasi.name,
      is_exalted: isExalted,
      is_debilitated: isDebilitated
    };
  });
}

function getProkeralaClientId() {
    return process.env.PROKERALA_CLIENT_ID;
}

function getProkeralaClientSecret() {
    return process.env.PROKERALA_CLIENT_SECRET;
}

function getGeocodeApiKey() {
    return process.env.GEOCODE_API_KEY;
}

function validateAstrologyConfig() {
    if (!getProkeralaClientId() || !getProkeralaClientSecret()) {
        throw new Error('Missing Prokerala API credentials in environment');
    }
}

function validateGeocodeConfig() {
    if (!getGeocodeApiKey()) {
        throw new Error('Missing geocode API key in environment');
    }
}

exports.getBirthChart = async (req, res) => {
    try {
        validateAstrologyConfig();
        // 1. Extract dynamic data from Frontend Body
        const { day, month, year, hour, min, lat, lon, timezone } = req.body;        

        // Validation
        if (!day || !month || !year || lat === undefined || lon === undefined) {
            return res.status(400).json({ success: false, error: "Missing required birth details." });
        }

        // 2. Format Datetime and Coordinates
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedHour = String(hour || 0).padStart(2, '0');
        const formattedMin = String(min || 0).padStart(2, '0');
        
        // Use provided timezone offset (e.g., +05:30) or default to India (+05:30)
        const offset = timezone || "+05:30"; 
        const datetime = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMin}:00${offset}`;
        const coordinates = `${lat},${lon}`;

        // 3. Get Token
        const tokenResponse = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': getProkeralaClientId(),
                'client_secret': getProkeralaClientSecret()
            })
        });
        const { access_token } = await tokenResponse.json();

        // 4. Define API Parameters using variables from req.body
        const params = new URLSearchParams({
            datetime: datetime,
            coordinates: coordinates,
            chart_type: 'rasi',
            chart_style: 'north-indian',
            ayanamsa: '1' // Lahiri
        });

        const url = `https://api.prokerala.com/v2/astrology/chart?${params.toString()}`;

        // 5. Call API
        const chartResponse = await fetch(url, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json, image/svg+xml'
            }
        });

        const contentType = chartResponse.headers.get('content-type') || '';
        let svgRaw = '';

        if (contentType.includes('application/json')) {
            const result = await chartResponse.json();
            if (result.status === 'ok') {
                svgRaw = result.data.chart;
            } else {
                return res.status(400).json({ success: false, errors: result.errors });
            }
        } else {
            svgRaw = await chartResponse.text();
        }

        // 6. Return Chart Data
        if (svgRaw) {
            const base64Svg = Buffer.from(svgRaw).toString('base64');
            const chartDataUrl = `data:image/svg+xml;base64,${base64Svg}`;

            return res.status(200).json({
                success: true,
                chartUrl: chartDataUrl,
                svgRaw: svgRaw
            });
        }

        throw new Error("No SVG data received");

    } catch (error) {
        console.error("Birth Chart Fetch Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// exports.getKundliChartData = async (req, res) => {
//     try {
//         // 1. Extract data from Frontend Body
//         const { day, month, year, hour, min, lat, lon } = req.body;

//         // Validation
//         if (!day || !month || !year || lat === undefined || lon === undefined) {
//             return res.status(400).json({ success: false, error: "Missing required birth details." });
//         }

//         // 2. Format Datetime and Coordinates
//         const formattedDay = String(day).padStart(2, '0');
//         const formattedMonth = String(month).padStart(2, '0');
//         const formattedHour = String(hour || 0).padStart(2, '0');
//         const formattedMin = String(min || 0).padStart(2, '0');
        
//         const datetime = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMin}:00+05:30`;
//         const coordinates = `${lat},${lon}`;

//         // 3. Get Token
//         const tokenResponse = await fetch('https://api.prokerala.com/token', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: new URLSearchParams({
//                 'grant_type': 'client_credentials',
//                 'client_id': CLIENT_ID,
//                 'client_secret': CLIENT_SECRET
//             })
//         });
//         const { access_token } = await tokenResponse.json();

//         // 4. Define API Parameters
//         const params = new URLSearchParams({
//             datetime: datetime,
//             coordinates: coordinates,
//             ayanamsa: '1' // Lahiri
//         });

//         // 5. Call Planet Position API
//         const planetUrl = `https://api.prokerala.com/v2/astrology/planet-position?${params.toString()}`;
        
//         const planetResponse = await fetch(planetUrl, {
//             method: 'GET',
//             headers: { 
//                 'Authorization': `Bearer ${access_token}`,
//                 'Accept': 'application/json'
//             }
//         });

//         const planetData = await planetResponse.json();
        
//         if (planetResponse.ok && planetData.status === 'ok') {

//             // 1. Find the Ascendant to determine the starting sign for House 1
//             const ascendant = planetData.data.planet_position.find(p => p.id === 100);
//             const startSignId = ascendant.rasi.id; // e.g., 1 for Vrishabha

//             // 2. Map Planets to Houses
//             const houses = planetData.data.planet_position.map(planet => {
//                 /**
//                  * Calculation: (Planet Sign - Ascendant Sign + 12) % 12 + 1
//                  * This ensures that if Ascendant is Sign 1, Sign 1 becomes House 1.
//                  */
//                 const houseNumber = ((planet.rasi.id - startSignId + 12) % 12) + 1;

//                 return {
//                     house: houseNumber,
//                     planet_id: planet.id,
//                     planet_name: planet.name,
//                     sign_id: planet.rasi.id,
//                     sign_name: planet.rasi.name
//                 };
//             });
    
//             return res.status(200).json({
//                 success: true,
//                 data: {planets : planetData.data.planet_position, 
//                     houses: houses,
//                 exaltaion_debilation: getPlanetaryConditions(planetData.data.planet_position)}
//             });
//         } else {
//             return res.status(400).json({ 
//                 success: false, 
//                 errors: planetData.errors || "Planet Position API Error" 
//             });
//         }

//     } catch (error) {
//         console.error("Kundli Fetch Error:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// };



exports.getKundliChartData = async (req, res) => {
    try {
        validateAstrologyConfig();
        const { day, month, year, hour, min, lat, lon } = req.body;

        if (!day || !month || !year || lat === undefined || lon === undefined) {
            return res.status(400).json({ success: false, error: "Missing required birth details." });
        }

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedHour = String(hour || 0).padStart(2, '0');
        const formattedMin = String(min || 0).padStart(2, '0');
        
        const datetime = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMin}:00+05:30`;
        const coordinates = `${lat},${lon}`;

        const tokenResponse = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': getProkeralaClientId(),
                'client_secret': getProkeralaClientSecret()
            })
        });
        const { access_token } = await tokenResponse.json();

        const params = new URLSearchParams({ datetime, coordinates, ayanamsa: '1' });
        const planetUrl = `https://api.prokerala.com/v2/astrology/planet-position?${params.toString()}`;
        
        const planetResponse = await fetch(planetUrl, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}`, 'Accept': 'application/json' }
        });

        const planetData = await planetResponse.json();
        
        if (planetResponse.ok && planetData.status === 'ok') {
            const rawPlanets = planetData.data.planet_position;
            const ascendant = rawPlanets.find(p => p.id === 100);
            const startSignId = ascendant.rasi.id; // House 1 Sign ID

            // 3. Map Houses (Fixed 1 to 12)
            // We create 12 house slots. Some may have multiple planets, some zero.
            const housePlacements = [];

            for (let h = 1; h <= 12; h++) {
                // Determine which Sign ID belongs to this House number
                // House 1 = startSignId, House 2 = (startSignId + 1) % 12, etc.
                const currentSignId = (startSignId + (h - 1)) % 12;
                
                // Find all planets in this sign
                const planetsInHouse = rawPlanets.filter(p => p.rasi.id === currentSignId);

                if (planetsInHouse.length > 0) {
                    planetsInHouse.forEach(planet => {
                        housePlacements.push({
                            house: h,
                            planet_id: planet.id,
                            planet_name: planet.name,
                            sign_id: planet.rasi.id,
                            sign_name: planet.rasi.name
                        });
                    });
                } else {
                    // Sign names lookup (0-indexed for convenience)
                    
                    housePlacements.push({
                        house: h,
                        planet_id: null,
                        planet_name: null,
                        sign_id: currentSignId,
                        sign_name: rashiList[currentSignId]
                    });
                }
            }

            // 4. Calculate Aspects
            const calculateAspects = () => {
                return ASPECTS_CONFIG.map(config => {
                    const sourcePlanet = housePlacements.find(hp => hp.planet_id === config.planet_id);
                    if (!sourcePlanet) return null;

                    const getTargetData = (aspectList) => {
                        const targetHouses = aspectList
                            .filter(val => val !== 0)
                            .map(asp => ((sourcePlanet.house + asp - 2) % 12) + 1);

                        const targetPlanets = housePlacements
                            .filter(hp => targetHouses.includes(hp.house) && hp.planet_id !== null && hp.planet_id !== 100)
                            .map(hp => hp.planet_name);

                        return { houses: targetHouses, planets: targetPlanets };
                    };

                    const firstAsp = getTargetData(config.first);
                    const secondAsp = getTargetData(config.second);
                    const thirdAsp = getTargetData(config.third);
                    const completeAsp = getTargetData(config.complete);

                    return {
                        planet_name: config.planet_name,
                        first_aspected_houses: firstAsp.houses,
                        first_aspected_planets: firstAsp.planets,
                        second_aspected_houses: secondAsp.houses,
                        second_aspected_planets: secondAsp.planets,
                        third_aspected_houses: thirdAsp.houses,
                        third_aspected_planets: thirdAsp.planets,
                        complete_aspected_houses: completeAsp.houses,
                        complete_aspected_planets: completeAsp.planets
                    };
                }).filter(Boolean);
            };

            const yogas = calculateYogas(planetData.data.planet_position,housePlacements);

            return res.status(200).json({
                success: true,
                data: {
                    planets: rawPlanets,
                    houses: housePlacements,
                    aspects: calculateAspects(),
                    yogas: yogas,
                    exaltation_debilitation: getPlanetaryConditions(rawPlanets)
                }
            });
        } else {
            return res.status(400).json({ success: false, errors: planetData.errors || "API Error" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getDashaData = async (req, res) => {
    try {
        validateAstrologyConfig();
        const { day, month, year, hour, min, lat, lon } = req.body;

        if (!day || !month || !year || lat === undefined || lon === undefined) {
            return res.status(400).json({ success: false, error: "Missing required birth details." });
        }

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedHour = String(hour || 0).padStart(2, '0');
        const formattedMin = String(min || 0).padStart(2, '0');
        
        const datetime = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMin}:00+05:30`;
        const coordinates = `${lat},${lon}`;

        const tokenResponse = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': getProkeralaClientId(),
                'client_secret': getProkeralaClientSecret()
            })
        });
        const tokenJson = await tokenResponse.json();
        const access_token = tokenJson.access_token;

        const params = new URLSearchParams({
            datetime: datetime,
            coordinates: coordinates,
            ayanamsa: '1'
        });

        const dashaUrl = `https://api.prokerala.com/v2/astrology/dasha-periods?${params.toString()}`;
        
        const dashaResponse = await fetch(dashaUrl, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json'
            }
        });

        const dashaData = await dashaResponse.json();
        
        if (dashaResponse.ok && dashaData.status === 'ok') {
            const now = new Date();
            const dashaPeriods = dashaData.data.dasha_periods;

            // 1. Find Current Mahadasha
            const currentMahadasha = dashaPeriods.find(m => 
                now >= new Date(m.start) && now <= new Date(m.end)
            );

            let currentAntardasha = null;
            let currentPratyantardasha = null;

            if (currentMahadasha) {
                // 2. Find Current Antardasha within that Mahadasha
                currentAntardasha = currentMahadasha.antardasha.find(a => 
                    now >= new Date(a.start) && now <= new Date(a.end)
                );

                if (currentAntardasha) {
                    // 3. Find Current Pratyantardasha within that Antardasha
                    currentPratyantardasha = currentAntardasha.pratyantardasha.find(p => 
                        now >= new Date(p.start) && now <= new Date(p.end)
                    );
                }
            }

            return res.status(200).json({
                success: true,
                currentDasha: {
                    mahadasha: currentMahadasha ? { name: currentMahadasha.name, start: currentMahadasha.start, end: currentMahadasha.end } : null,
                    antardasha: currentAntardasha ? { name: currentAntardasha.name, start: currentAntardasha.start, end: currentAntardasha.end } : null,
                    pratyantardasha: currentPratyantardasha ? { name: currentPratyantardasha.name, start: currentPratyantardasha.start, end: currentPratyantardasha.end } : null
                }
            });
        } else {
            return res.status(400).json({ success: false, errors: dashaData.errors });
        }

    } catch (error) {
        console.error("Dasha Fetch Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getBirthDetails = async (req, res) => {
    try {
        validateAstrologyConfig();
        const { day, month, year, hour, min, lat, lon } = req.body;

        if (!day || !month || !year || lat === undefined || lon === undefined) {
            return res.status(400).json({ success: false, error: "Missing required birth details." });
        }

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedHour = String(hour || 0).padStart(2, '0');
        const formattedMin = String(min || 0).padStart(2, '0');
        
        // Construct ISO datetime string
        const datetimeStr = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMin}:00+05:30`;
        const coordinates = `${lat},${lon}`;

        // 1. Get Access Token
        const tokenResponse = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': getProkeralaClientId(),
                'client_secret': getProkeralaClientSecret()
            })
        });
        const { access_token } = await tokenResponse.json();

        const params = new URLSearchParams({
            datetime: datetimeStr,
            coordinates: coordinates,
            ayanamsa: '1' // 1 for Lahiri Ayanamsa
        });

        // 2. Use birth-details endpoint instead of panchang
        const birthDetailsUrl = `https://api.prokerala.com/v2/astrology/birth-details?${params.toString()}`;
        
        const birthResponse = await fetch(birthDetailsUrl, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json'
            }
        });

        const result = await birthResponse.json();
        
        if (birthResponse.ok && result.status === 'ok') {
         
            // Calculate janmakshar based on nakshatra_id and charan
            const janmaksharValue = getJanmakshar(
                result.data.nakshatra.id,
                result.data.nakshatra.pada
            );

            // console.log("janmaksharValue:", janmaksharValue);
            
            
            return res.status(200).json({
                success: true,
                data: {birth_details:result.data,
                // You can explicitly map charan to pada for clarity
                charan: result.data.nakshatra.pada,
                janmakshar: janmaksharValue,
                full_details: result.data}
            });
        } else {
            return res.status(400).json({ success: false, errors: result.errors });
        }

    } catch (error) {
        console.error("Birth Details Fetch Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};


/**
 * Fetches latitude and longitude for a given place name using the geocoding service.
 * @param {string} placeName - The name of the city/birth place (e.g., "Mumbai").
 * @returns {Promise<{lat: string, lon: string, name: string, timezone: string}>}
 */
exports.getLocationData = async (req, res) => {
    try {
        validateGeocodeConfig();
        const { place } = req.body;

        if (!place) {
            return res.status(400).json({ success: false, error: "Place name is required" });
        }

        const data = await fetchLocationMatches(place);

        if (Array.isArray(data) && data.length > 0) {
            const bestMatch = data[0];

            return res.status(200).json({
                success: true,
                name: bestMatch.display_name,
                lat: bestMatch.lat, 
                lon: bestMatch.lon 
            });
        } else {
            return res.status(404).json({ success: false, error: "No location found." });
        }

    } catch (error) {
        console.error("Free Geocoding Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

async function fetchLocationMatches(place, limit = 5) {
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(place)}&api_key=${getGeocodeApiKey()}&limit=${limit}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'User-Agent': 'YourAppName/1.0'
        }
    });

    if (!response.ok) {
        throw new Error('Geocoding service error');
    }

    return response.json();
}

exports.getLocationSuggestions = async (req, res) => {
    try {
        validateGeocodeConfig();
        const place = (req.query.place || '').trim();

        if (place.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Please enter at least 2 characters'
            });
        }

        const matches = await fetchLocationMatches(place, 5);

        const suggestions = Array.isArray(matches)
            ? matches.map((match) => ({
                name: match.display_name,
                lat: match.lat,
                lon: match.lon
            }))
            : [];

        return res.status(200).json({
            success: true,
            suggestions
        });
    } catch (error) {
        console.error('Location Suggestions Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch location suggestions'
        });
    }
};
