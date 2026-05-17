/**
 * Saturn in 3rd House Yoga
 * शनी पराक्रमात
 */

const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class SaturnThirdYoga extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SATURN_THIRD.id,
      YOGA_TYPES.SATURN_THIRD.name_en,
      YOGA_TYPES.SATURN_THIRD.description_en
    );
  }

  /**
   * Calculate Saturn in 3rd House Yoga
   * Looks for Saturn (planet_id 7) in the 3rd house
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const saturnInThird = houses.find((h) => h.planet_id === 7 && h.house === 3);

    if (saturnInThird) {
      return this.formatResult({
        id: YOGA_TYPES.SATURN_THIRD.id,
        name_en: YOGA_TYPES.SATURN_THIRD.name_en,
        name_mr: YOGA_TYPES.SATURN_THIRD.name_mr,
        description_en: YOGA_TYPES.SATURN_THIRD.description_en,
        description_mr: YOGA_TYPES.SATURN_THIRD.description_mr,
        planet: 'Saturn',
        planet_id: 7,
        house: 3,
        effect_en: 'Success comes after many challenging events',
        effect_mr: YOGA_TYPES.SATURN_THIRD.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = SaturnThirdYoga;
