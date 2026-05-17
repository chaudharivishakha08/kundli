const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class RaviShaniConjunction extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.RAVI_SHANI_CONJUNCTION.id,
      YOGA_TYPES.RAVI_SHANI_CONJUNCTION.name_en,
      YOGA_TYPES.RAVI_SHANI_CONJUNCTION.description_en
    );
  }

  /**
   * Calculate Sun-Saturn conjunction
   * Sun = 0, Saturn = 6
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const sun = planets.find((p) => p.id === 0);
    const saturn = planets.find((p) => p.id === 6);

    if (!sun || !saturn) {
      return null;
    }

    if (sun.rasi && saturn.rasi && sun.rasi.id === saturn.rasi.id) {
      return this.formatResult({
        id: YOGA_TYPES.RAVI_SHANI_CONJUNCTION.id,
        name_en: YOGA_TYPES.RAVI_SHANI_CONJUNCTION.name_en,
        name_mr: YOGA_TYPES.RAVI_SHANI_CONJUNCTION.name_mr,
        description_en: YOGA_TYPES.RAVI_SHANI_CONJUNCTION.description_en,
        description_mr: YOGA_TYPES.RAVI_SHANI_CONJUNCTION.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = RaviShaniConjunction;
