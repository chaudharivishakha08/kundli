const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class ShaniRahuInPancham extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.id,
      YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.name_en,
      YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.description_en
    );
  }

  /**
   * Calculate Saturn-Rahu conjunction in 5th house
   * Saturn = 6, Rahu = 101
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const saturnInFifth = houses.find((h) => h.planet_id === 6 && h.house === 5);
    const rahuInFifth = houses.find((h) => h.planet_id === 101 && h.house === 5);

    if (saturnInFifth && rahuInFifth) {
      return this.formatResult({
        id: YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.id,
        name_en: YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.name_en,
        name_mr: YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.name_mr,
        description_en: YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.description_en,
        description_mr: YOGA_TYPES.SHANI_RAHU_IN_PANCHAM.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShaniRahuInPancham;
