/**
 * YOGA REGISTRY PATTERN - Implementation Guide
 * 
 * This file demonstrates how to:
 * 1. Create new yoga classes
 * 2. Register them with the YogaRegistry
 * 3. Use them in calculations
 * 
 * ===== HOW TO ADD A NEW YOGA =====
 * 
 * Step 1: Create a new yoga file
 * ├─ Location: backend/utils/yogas/YourYogaName.js
 * 
 * Step 2: Implement the yoga class
 * Example:
 * 
 * const BaseYoga = require('./BaseYoga');
 * 
 * class YourYogaName extends BaseYoga {
 *   constructor() {
 *     super(
 *       {id},           // Unique numeric ID
 *       'Your Yoga Name',
 *       'Description of the yoga effect'
 *     );
 *   }
 * 
 *   calculateYoga(planets, houses) {
 *     // Your custom logic here
 *     // Look for specific planet in specific house
 *     const planet = houses.find(h => h.planet_id === {id} && h.house === {house});
 * 
 *     if (planet) {
 *       return this.formatResult({
 *         planet: 'Planet Name',
 *         planet_id: {id},
 *         house: {house},
 *         effect_en: 'English effect',
 *         effect_mr: 'Marathi effect',
 *         found: true
 *       });
 *     }
 *     return null;
 *   }
 * }
 * 
 * module.exports = YourYogaName;
 * 
 * Step 3: Register the yoga in backend/utils/yogas/index.js
 * - Import the class: const YourYogaName = require('./YourYogaName');
 * - Add to yogas array: new YourYogaName()
 * 
 * Step 4: Update yoga constants
 * - Add to backend/consts/yogaConstants.js in YOGA_TYPES object
 * 
 * ===== PLANET IDs =====
 * 1 = Surya (Sun)
 * 2 = Chandra (Moon)
 * 3 = Budh (Mercury)
 * 4 = Shukra (Venus)
 * 5 = Mangal (Mars)
 * 6 = Brihaspati (Jupiter)
 * 7 = Shani (Saturn)
 * 8 = Rahu
 * 9 = Ketu
 * 100 = Ascendant (Lagna)
 * 
 * ===== HOUSE NUMBERS =====
 * 1 = Ascendant / Lagna
 * 2 = Family, Wealth
 * 3 = Siblings, Courage
 * 4 = Home, Mother, Property
 * 5 = Children, Intelligence
 * 6 = Enemies, Health, Service
 * 7 = Marriage, Relationships
 * 8 = Longevity, Inheritance
 * 9 = Fortune, Father, Spirituality
 * 10 = Career, Status, Authority
 * 11 = Gains, Friendships
 * 12 = Losses, Isolation, Spiritual Growth
 * 
 * ===== USING THE REGISTRY =====
 * 
 * In your controller:
 * 
 * const { initializeYogaRegistry, yogaRegistry } = require('../utils/yogas');
 * 
 * // Initialize registry (done once automatically in calculateYogas function)
 * initializeYogaRegistry();
 * 
 * // Calculate all yogas for a birth chart
 * const foundYogas = yogaRegistry.calculateAllYogas(planets, houses);
 * 
 * // Get specific yoga
 * const yoga = yogaRegistry.getYoga(1); // Get yoga with ID 1
 * 
 * // Get all registered yogas
 * const allYogas = yogaRegistry.getAllYogas();
 * 
 * // Get registry info
 * const info = yogaRegistry.getInfo();
 * console.log(info);
 * 
 * ===== BENEFITS OF THIS PATTERN =====
 * 
 * 1. Extensibility: Add new yogas without modifying existing code
 * 2. Maintainability: Each yoga is in its own file with clear logic
 * 3. Testability: Easy to test individual yoga calculations
 * 4. Reusability: Yoga classes can be used in multiple places
 * 5. Scalability: Registry pattern scales well with many yogas
 * 6. Single Responsibility: Each class has one job
 * 7. Open/Closed Principle: Open for extension, closed for modification
 */

// ===== EXAMPLE: COMPLETE YOGA IMPLEMENTATION =====
/*

// File: backend/utils/yogas/MoonFourthYoga.js
const BaseYoga = require('./BaseYoga');

class MoonFourthYoga extends BaseYoga {
  constructor() {
    super(
      8,
      'Moon in 4th House Yoga',
      'चंद्र चतुर्थेषु योग - घरेलू सुख'
    );
  }

  calculateYoga(planets, houses) {
    // Moon has planet_id 2
    // 4th house is the house of home and mother
    const moonInFourth = houses.find(
      (h) => h.planet_id === 2 && h.house === 4
    );

    if (moonInFourth) {
      return this.formatResult({
        planet: 'Moon',
        planet_id: 2,
        house: 4,
        effect_en: 'Brings domestic happiness and maternal comfort',
        effect_mr: 'घरेलू सुख आणि मातृ आरामदायकता आणते',
        found: true
      });
    }

    return null;
  }
}

module.exports = MoonFourthYoga;

// Then in backend/utils/yogas/index.js, add:
// const MoonFourthYoga = require('./MoonFourthYoga');
// Add to yogas array: new MoonFourthYoga()

*/

module.exports = {
  // This file is for documentation only
  // The actual implementation is in the corresponding yoga files
};
