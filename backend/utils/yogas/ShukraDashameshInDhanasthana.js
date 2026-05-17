const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class ShukraDashameshInDhanasthana extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.id,
      YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.name_en,
      YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.description_en
    );
  }

  calculateYoga(planets, houses) {
    const dashameshId = getLordOfHouse(10, planets, houses);
    const venusPlacement = houses.find((h) => h.planet_id === 3);

    if (dashameshId === 3 && venusPlacement && venusPlacement.house === 2) {
      return this.formatResult({
        id: YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.id,
        name_en: YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.name_en,
        name_mr: YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.name_mr,
        description_en: YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.description_en,
        description_mr: YOGA_TYPES.SHUKRA_DASHAMESH_IN_DHANASTHANA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShukraDashameshInDhanasthana;
