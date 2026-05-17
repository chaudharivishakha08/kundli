const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class ShashteshLagneshParivartan extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.id,
      YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.name_en,
      YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.description_en
    );
  }

  /**
   * Calculate exchange between 6th lord and Ascendant lord
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const lagneshId = getLordOfHouse(1, planets, houses);
    const shashteshId = getLordOfHouse(6, planets, houses);

    if (lagneshId === null || shashteshId === null) {
      return null;
    }

    const lagneshPlacement = houses.find((h) => h.planet_id === lagneshId);
    const shashteshPlacement = houses.find((h) => h.planet_id === shashteshId);

    if (
      lagneshPlacement &&
      shashteshPlacement &&
      lagneshPlacement.house === 6 &&
      shashteshPlacement.house === 1
    ) {
      return this.formatResult({
        id: YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.id,
        name_en: YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.name_en,
        name_mr: YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.name_mr,
        description_en: YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.description_en,
        description_mr: YOGA_TYPES.SHASHTHESH_LAGNESH_PARIVARTAN.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShashteshLagneshParivartan;
