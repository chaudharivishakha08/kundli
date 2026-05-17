/**
 * QUICK START GUIDE - Yoga Registry Pattern
 * 
 * This file shows a complete example of how everything works together
 */

/*

═══════════════════════════════════════════════════════════════════════════════
                    COMPLETE WORKING EXAMPLE
═══════════════════════════════════════════════════════════════════════════════

PROJECT FLOW:
─────────────

1. User sends birth details to /api/kundli endpoint

2. Backend receives request and calls getKundliChartData():

   exports.getKundliChartData = async (req, res) => {
     // ... API calls to get planet data ...
     
     // This is where the yoga calculation happens:
     const yogas = calculateYogas(
       planetData.data.planet_position,  // Array of planets
       housePlacements                     // Array of house placements
     );
     
     // Return yogas to frontend
     return res.status(200).json({
       success: true,
       data: {
         planets: rawPlanets,
         houses: housePlacements,
         yogas: yogas,  // ← Our registry-based yogas!
         // ... other data ...
       }
     });
   };

3. The calculateYogas() function:

   function calculateYogas(planets, houses) {
     // Check if registry is empty (first run)
     if (yogaRegistry.getCount() === 0) {
       initializeYogaRegistry();  // Load all yoga classes
     }
     
     // Calculate all registered yogas
     return yogaRegistry.calculateAllYogas(planets, houses);
   }

4. The Registry initialization (happens once):

   function initializeYogaRegistry() {
     const yogas = [
       new SaturnThirdYoga(),    // Creates instance
       new SaturnNinthYoga(),    // Creates instance
       new RahuFirstYoga(),      // Creates instance
       new JupiterFirstYoga(),   // Creates instance
       new VenusSeventhYoga()    // Creates instance
     ];
     
     yogaRegistry.registerMultiple(yogas);  // Registers all
   }

5. Registry calculates all yogas:

   calculateAllYogas(planets, houses) {
     const foundYogas = [];
     
     this.yogas.forEach((yoga) => {
       const result = yoga.calculateYoga(planets, houses);
       if (result) {
         foundYogas.push(result);  // Add found yoga
       }
     });
     
     return foundYogas;
   }

6. Example yoga calculation (SaturnThirdYoga):

   calculateYoga(planets, houses) {
     // Look for Saturn (id 7) in 3rd house
     const saturnInThird = houses.find(
       (h) => h.planet_id === 7 && h.house === 3
     );
     
     if (saturnInThird) {
       return this.formatResult({
         planet: 'Saturn',
         planet_id: 7,
         house: 3,
         effect_en: 'Success comes after challenges',
         effect_mr: 'शनी पराक्रमात असल्यामुळे अनेक...',
         found: true
       });
     }
     return null;  // Not found in this chart
   }

7. Response sent to frontend:

   {
     "success": true,
     "data": {
       "yogas": [
         {
           "id": 1,
           "name": "Saturn in 3rd House Yoga",
           "description": "Saturn in 3rd house brings success...",
           "planet": "Saturn",
           "planet_id": 7,
           "house": 3,
           "effect_en": "Success comes after challenges",
           "effect_mr": "शनी पराक्रमात असल्यामुळे...",
           "found": true
         },
         // More yogas if found...
       ]
     }
   }

═══════════════════════════════════════════════════════════════════════════════
                  ADDING A NEW YOGA - COMPLETE EXAMPLE
═══════════════════════════════════════════════════════════════════════════════

Let's say we want to add "Mars in 10th House Yoga" (Career Success)

STEP 1: Create backend/utils/yogas/MarsEleventhYoga.js
──────────────────────────────────────────────────────

const BaseYoga = require('./BaseYoga');

class MarsEleventhYoga extends BaseYoga {
  constructor() {
    super(
      10,                          // Unique ID (next available)
      'Mars in 11th House Yoga',   // English name
      'मंगळ एकादशेषु योग'            // Marathi name (in description)
    );
  }

  /**
   * Mars (id 5) in 11th house (gains, elder siblings)
   * Brings ambitious gains and strong relationships
   */
  calculateYoga(planets, houses) {
    // Check if Mars is in 11th house
    const marsInEleventh = houses.find(
      (h) => h.planet_id === 5 && h.house === 11
    );

    if (marsInEleventh) {
      return this.formatResult({
        planet: 'Mars',
        planet_id: 5,
        house: 11,
        effect_en: 'Dynamic gains through active pursuits and strong friendships',
        effect_mr: 'सक्रिय प्रयत्नातून नफा आणि शक्तिशाली मैत्री',
        found: true
      });
    }

    return null;
  }
}

module.exports = MarsEleventhYoga;


STEP 2: Update backend/utils/yogas/index.js
────────────────────────────────────────────

const { yogaRegistry } = require('./YogaRegistry');

// Import all yoga classes
const SaturnThirdYoga = require('./SaturnThirdYoga');
const SaturnNinthYoga = require('./SaturnNinthYoga');
const RahuFirstYoga = require('./RahuFirstYoga');
const JupiterFirstYoga = require('./JupiterFirstYoga');
const VenusSeventhYoga = require('./VenusSeventhYoga');
const MarsEleventhYoga = require('./MarsEleventhYoga');  // ← ADD THIS

function initializeYogaRegistry() {
  const yogas = [
    new SaturnThirdYoga(),
    new SaturnNinthYoga(),
    new RahuFirstYoga(),
    new JupiterFirstYoga(),
    new VenusSeventhYoga(),
    new MarsEleventhYoga()  // ← ADD THIS
  ];

  yogaRegistry.registerMultiple(yogas);
  // ...
}

module.exports = {
  initializeYogaRegistry,
  yogaRegistry
};


STEP 3: Update backend/consts/yogaConstants.js
──────────────────────────────────────────────

const YOGA_TYPES = {
  // ... existing yogas ...
  MARS_ELEVENTH: {
    id: 10,
    name: 'Mars in 11th House Yoga',
    name_mr: 'मंगळ एकादशेषु योग',
    description: 'Dynamic gains through active pursuits and strong friendships'
  }
};

module.exports = { YOGA_TYPES };


DONE! That's it. No other code needs to be modified.

When the next yoga calculation happens:
1. Registry will automatically load your new yoga class
2. It will call calculateYoga() for all yogas including MarsEleventhYoga
3. If the birth chart has Mars in 11th house, it will be included in results
4. Frontend receives the complete yoga data automatically

═══════════════════════════════════════════════════════════════════════════════
                        TESTING YOUR YOGA
═══════════════════════════════════════════════════════════════════════════════

You can test by sending a request with a birth time where Mars is in 11th house:

POST /api/kundli
{
  "day": 15,
  "month": 6,
  "year": 1990,
  "hour": 10,
  "min": 30,
  "lat": "19.0760",
  "lon": "72.8777"
}

If Mars is in 11th house, the response will include:
{
  "yogas": [
    {
      "id": 10,
      "name": "Mars in 11th House Yoga",
      "description": "Dynamic gains through active pursuits...",
      "planet": "Mars",
      "planet_id": 5,
      "house": 11,
      "effect_en": "Dynamic gains through active pursuits...",
      "effect_mr": "सक्रिय प्रयत्नातून नफा आणि शक्तिशाली मैत्री",
      "found": true
    }
  ]
}

═══════════════════════════════════════════════════════════════════════════════
                      COMMON MISTAKES TO AVOID
═══════════════════════════════════════════════════════════════════════════════

❌ DON'T: Forget to extend BaseYoga
   ✓ DO: class YourYoga extends BaseYoga

❌ DON'T: Import in utils instead of index.js
   ✓ DO: Import and register in backend/utils/yogas/index.js

❌ DON'T: Return undefined or empty object
   ✓ DO: Return null if yoga not found, else return this.formatResult({...})

❌ DON'T: Use same ID for multiple yogas
   ✓ DO: Use unique IDs (1, 2, 3, 4, etc.)

❌ DON'T: Hardcode planet names
   ✓ DO: Refer to the planet IDs list above

❌ DON'T: Hardcode house numbers
   ✓ DO: Refer to the house meanings list above

═══════════════════════════════════════════════════════════════════════════════
                      DEBUGGING TIPS
═══════════════════════════════════════════════════════════════════════════════

1. Check registry initialization:
   console.log(yogaRegistry.getInfo());

2. Check specific yoga:
   const yoga = yogaRegistry.getYoga(1);
   console.log(yoga.calculateYoga(planets, houses));

3. Check all registered yogas:
   const all = yogaRegistry.getAllYogas();
   console.log(all.length, 'yogas registered');

4. Check houses array structure:
   console.log(JSON.stringify(houses, null, 2));

5. Check planets array structure:
   console.log(JSON.stringify(planets, null, 2));

═══════════════════════════════════════════════════════════════════════════════

For detailed implementation guide, see: IMPLEMENTATION_GUIDE.md
For complete overview, see: README.md

*/
