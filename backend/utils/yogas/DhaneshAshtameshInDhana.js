const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class DhaneshAshtameshInDhana extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.id,
      YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.name_en,
      YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.description_en
    );
  }

  /**
   * Calculate 2nd lord with 8th lord in 2nd house
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const lordOf2ndHouseId = getLordOfHouse(2, planets, houses);
    const lordOf8thHouseId = getLordOfHouse(8, planets, houses);

    if (lordOf2ndHouseId === null || lordOf8thHouseId === null) {
      return null;
    }

    const houseOf2ndLord = houses.find((h) => h.planet_id === lordOf2ndHouseId);
    const houseOf8thLord = houses.find((h) => h.planet_id === lordOf8thHouseId);

    if (
      houseOf2ndLord &&
      houseOf8thLord &&
      houseOf2ndLord.house === 2 &&
      houseOf8thLord.house === 2
    ) {
      return this.formatResult({
        id: YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.id,
        name_en: YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.name_en,
        name_mr: YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.name_mr,
        description_mr: YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.description_mr,
        description_en: YOGA_TYPES.DHANESH_ASHTAMESH_IN_DHANA.description_en,
        found: true
      });
    }

    return null;
  }
}

module.exports = DhaneshAshtameshInDhana;
