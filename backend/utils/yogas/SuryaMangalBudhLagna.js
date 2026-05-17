const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class SuryaMangalBudhLagna extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.id,
      YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.name_en,
      YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.description_en
    );
  }

  /**
   * Calculate Sun, Mars and Mercury conjunction in Lagna
   * Sun = 0, Mercury = 2, Mars = 4
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const sunInLagna = houses.find((h) => h.planet_id === 0 && h.house === 1);
    const mercuryInLagna = houses.find((h) => h.planet_id === 2 && h.house === 1);
    const marsInLagna = houses.find((h) => h.planet_id === 4 && h.house === 1);

    if (sunInLagna && mercuryInLagna && marsInLagna) {
      return this.formatResult({
        id: YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.id,
        name_en: YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.name_en,
        name_mr: YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.name_mr,
        description_mr: YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.description_mr,
        description_en: YOGA_TYPES.SURYA_MANGAL_BUDH_LAGNA.description_en,
        found: true
      });
    }

    return null;
  }
}

module.exports = SuryaMangalBudhLagna;
