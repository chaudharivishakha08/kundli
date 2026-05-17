const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class ShukraMangalConjunctionOwnSigns extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.id,
      YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.name_en,
      YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.description_en
    );
  }

  /**
   * Calculate Venus-Mars conjunction in Venus or Mars owned sign
   * Venus = 3, Mars = 4
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const venus = planets.find((p) => p.id === 3);
    const mars = planets.find((p) => p.id === 4);

    if (!venus || !mars || !venus.rasi || !mars.rasi) {
      return null;
    }

    const sameSign = venus.rasi.id === mars.rasi.id;
    const signLordId = venus.rasi.lord && venus.rasi.lord.id;
    const isVenusOrMarsOwnedSign = signLordId === 3 || signLordId === 4;

    if (sameSign && isVenusOrMarsOwnedSign) {
      return this.formatResult({
        id: YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.id,
        name_en: YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.name_en,
        name_mr: YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.name_mr,
        description_en: YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.description_en,
        description_mr: YOGA_TYPES.SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShukraMangalConjunctionOwnSigns;
