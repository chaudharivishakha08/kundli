const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const MALEFIC_PLANET_IDS = [0, 4, 6, 101, 102];

class PapagrahaKetuInShashtha extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.id,
      YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.name_en,
      YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.description_en
    );
  }

  /**
   * Calculate malefics with Ketu in 6th house
   * Ketu = 102
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const ketuInSixth = houses.find((h) => h.planet_id === 102 && h.house === 6);
    const maleficInSixth = houses.find(
      (h) => MALEFIC_PLANET_IDS.includes(h.planet_id) && h.planet_id !== 102 && h.house === 6
    );

    if (ketuInSixth && maleficInSixth) {
      return this.formatResult({
        id: YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.id,
        name_en: YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.name_en,
        name_mr: YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.name_mr,
        description_en: YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.description_en,
        description_mr: YOGA_TYPES.PAPAGRAHA_KETU_IN_SHASHTHA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = PapagrahaKetuInShashtha;
