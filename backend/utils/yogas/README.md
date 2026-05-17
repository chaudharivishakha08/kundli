/**
 * YOGA REGISTRY PATTERN - IMPLEMENTATION SUMMARY
 * 
 * This document provides an overview of the yoga registry pattern implementation
 * for the Kundli application.
 */

/*

═══════════════════════════════════════════════════════════════════════════════
                          FOLDER STRUCTURE
═══════════════════════════════════════════════════════════════════════════════

backend/
├── utils/
│   └── yogas/                           [NEW DIRECTORY]
│       ├── BaseYoga.js                  [Base class for all yogas]
│       ├── YogaRegistry.js              [Registry pattern implementation]
│       ├── index.js                     [Yoga initialization & export]
│       ├── SaturnThirdYoga.js           [Example yoga - Saturn in 3rd]
│       ├── SaturnNinthYoga.js           [Example yoga - Saturn in 9th]
│       ├── RahuFirstYoga.js             [Example yoga - Rahu in 1st]
│       ├── JupiterFirstYoga.js          [Example yoga - Jupiter in 1st]
│       ├── VenusSeventhYoga.js          [Example yoga - Venus in 7th]
│       └── IMPLEMENTATION_GUIDE.md      [How to add new yogas]
├── consts/
│   ├── consts.js                        [Existing constants]
│   └── yogaConstants.js                 [NEW - Yoga names and IDs]
└── controllers/
    └── kundli.js                        [Updated with registry integration]

═══════════════════════════════════════════════════════════════════════════════
                         CLASS HIERARCHY
═══════════════════════════════════════════════════════════════════════════════

BaseYoga (Abstract Base Class)
  ├── SaturnThirdYoga
  ├── SaturnNinthYoga
  ├── RahuFirstYoga
  ├── JupiterFirstYoga
  ├── VenusSeventhYoga
  └── [More yogas can be added following this pattern]

YogaRegistry (Manages all yoga instances)
  └── Singleton instance exported as 'yogaRegistry'

═══════════════════════════════════════════════════════════════════════════════
                       WORKFLOW & DATA FLOW
═══════════════════════════════════════════════════════════════════════════════

1. APPLICATION STARTUP
   └─> kundli.js is loaded
       └─> imports { initializeYogaRegistry, yogaRegistry } from utils/yogas
   
2. YOGA CALCULATION REQUEST
   └─> calculateYogas(planets, houses) is called
       ├─> Checks if registry is empty (getCount() === 0)
       │   └─> If empty: calls initializeYogaRegistry()
       │       ├─> Imports all yoga classes
       │       ├─> Creates instances of each yoga
       │       ├─> Registers them with registry
       │       └─> Logs registration info
       │
       └─> Calls yogaRegistry.calculateAllYogas(planets, houses)
           └─> Iterates through all registered yogas
               ├─> Calls yoga.calculateYoga(planets, houses) for each
               ├─> Collects found yogas in array
               └─> Returns array of matched yogas

3. RESPONSE TO CLIENT
   └─> Returns array of found yogas with complete details
       (id, name, description, planet, house, effects, etc.)

═══════════════════════════════════════════════════════════════════════════════
                        KEY FEATURES
═══════════════════════════════════════════════════════════════════════════════

✓ REGISTRY PATTERN:
  - Centralized management of all yogas
  - Dynamic registration and deregistration
  - Extensible without modifying core code

✓ SINGLE RESPONSIBILITY:
  - Each yoga class handles its own calculation logic
  - BaseYoga handles common formatting
  - YogaRegistry handles registration and iteration

✓ MAINTAINABILITY:
  - Easy to debug individual yogas
  - Clear separation of concerns
  - Each yoga is independent

✓ SCALABILITY:
  - Add unlimited new yogas
  - Registry automatically manages them
  - No hardcoded yoga lists

✓ CONSISTENCY:
  - All yogas follow same structure
  - Standardized output format
  - Unified error handling

═══════════════════════════════════════════════════════════════════════════════
                       HOW TO ADD A NEW YOGA
═══════════════════════════════════════════════════════════════════════════════

3 SIMPLE STEPS:

STEP 1: Create new file (backend/utils/yogas/YourYogaName.js)
────────────────────────────────────────────────────────────

const BaseYoga = require('./BaseYoga');

class YourYogaName extends BaseYoga {
  constructor() {
    super(
      {id},                    // Unique numeric ID
      'Your Yoga Name',        // English name
      'Yoga description'       // Description
    );
  }

  calculateYoga(planets, houses) {
    // Your logic: Check for specific planet in specific house
    const found = houses.find(h => h.planet_id === {id} && h.house === {house});
    
    if (found) {
      return this.formatResult({
        planet: 'Planet Name',
        planet_id: {id},
        house: {house},
        effect_en: 'English effect description',
        effect_mr: 'मराठी प्रभाव वर्णन',
        found: true
      });
    }
    return null;  // Yoga not found in chart
  }
}

module.exports = YourYogaName;


STEP 2: Register in backend/utils/yogas/index.js
─────────────────────────────────────────────────

// Add import
const YourYogaName = require('./YourYogaName');

// Add to yogas array in initializeYogaRegistry function
const yogas = [
  new SaturnThirdYoga(),
  // ... other yogas ...
  new YourYogaName()  // ← Add here
];


STEP 3: Add to yoga constants (backend/consts/yogaConstants.js)
─────────────────────────────────────────────────────────────

const YOGA_TYPES = {
  // ... existing yogas ...
  YOUR_YOGA: {
    id: {id},
    name: 'Your Yoga Name',
    name_mr: 'आपल्या योग नाव',
    description: 'Your yoga description'
  }
};

═══════════════════════════════════════════════════════════════════════════════
                      AVAILABLE PLANET IDs
═══════════════════════════════════════════════════════════════════════════════

 1 = Sun (Surya) - सूर्य
 2 = Moon (Chandra) - चंद्र
 3 = Mercury (Budh) - बुध
 4 = Venus (Shukra) - शुक्र
 5 = Mars (Mangal) - मंगळ
 6 = Jupiter (Brihaspati) - बृहस्पती
 7 = Saturn (Shani) - शनी
 8 = Rahu - राहु
 9 = Ketu - केतू
100 = Ascendant (Lagna) - लग्न

═══════════════════════════════════════════════════════════════════════════════
                         HOUSE MEANINGS
═══════════════════════════════════════════════════════════════════════════════

 1 = Self, Appearance, Life - आत्म, दिसावट, जीवन
 2 = Family, Wealth, Speech - कुटुंब, संपत्ती, वाणी
 3 = Siblings, Courage, Travel - भाऊ-बहिणी, धाडस, प्रवास
 4 = Home, Mother, Property - घर, माता, मालमत्ता
 5 = Children, Intelligence, Creativity - मुले, बुद्धिमत्ता, रचनात्मकता
 6 = Enemies, Health, Service - शत्रू, आरोग्य, सेवा
 7 = Marriage, Partnerships, Business - विवाह, भागीदारी, व्यापार
 8 = Longevity, Inheritance, Secrets - आयुष्य, वारस, रहस्ये
 9 = Fortune, Father, Spirituality - भाग्य, वडील, आध्यात्मिकता
10 = Career, Status, Public Life - व्यवसाय, स्थिती, सार्वजनिक जीवन
11 = Gains, Friendships, Elder - नफा, मैत्री, मोठे भाऊ-बहिणी
12 = Losses, Isolation, Spiritual Growth - नुकसान, एकांतता, आध्यात्मिक विकास

═══════════════════════════════════════════════════════════════════════════════
                      USAGE IN CONTROLLERS
═══════════════════════════════════════════════════════════════════════════════

// In kundli.js getKundliChartData function:

// The calculateYogas function is automatically called and integrated:
const yogas = calculateYogas(planetData.data.planet_position, housePlacements);

// Returns array like:
[
  {
    id: 1,
    name: 'Saturn in 3rd House Yoga',
    description: 'Saturn in 3rd house brings success after challenges',
    planet: 'Saturn',
    planet_id: 7,
    house: 3,
    effect_en: 'Success comes after many challenging events',
    effect_mr: 'शनी पराक्रमात असल्यामुळे अनेक निराशाजनक घटनांनंतरच त्या व्यक्तिस यश मिळते.',
    found: true
  },
  // ... more found yogas ...
]

═══════════════════════════════════════════════════════════════════════════════
                       ADVANTAGES
═══════════════════════════════════════════════════════════════════════════════

✓ Clean Architecture: Follows SOLID principles
✓ Easy to Test: Each yoga can be tested independently
✓ Easy to Extend: Add new yogas without touching existing code
✓ Easy to Maintain: Clear code organization and separation
✓ Easy to Debug: Each yoga is isolated in its own file
✓ Type-Safe: Can add TypeScript definitions if needed
✓ Flexible: Registry can be used in multiple places
✓ Documented: Implementation guide included

═══════════════════════════════════════════════════════════════════════════════

For more details, see IMPLEMENTATION_GUIDE.md in the same directory.

*/
