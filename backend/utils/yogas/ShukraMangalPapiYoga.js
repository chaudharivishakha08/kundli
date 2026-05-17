const { ASPECTS_CONFIG } = require('../../consts/consts');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const TARGET_HOUSES = [1, 5, 6, 7, 12];
const MALEFIC_PLANET_IDS = [0, 4, 6, 101, 102];

class ShukraMangalPapiYoga extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.id,
      YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.name_en,
      YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.description_en
    );
  }

  getAspectedHouses(sourceHouse, aspectList) {
    return aspectList
      .filter((val) => val !== 0)
      .map((asp) => ((sourceHouse + asp - 2) % 12) + 1);
  }

  hasMaleficAspectOnHouse(targetHouse, houses) {
    return ASPECTS_CONFIG.some((config) => {
      if (!MALEFIC_PLANET_IDS.includes(config.planet_id)) {
        return false;
      }

      const sourcePlanet = houses.find((h) => h.planet_id === config.planet_id);
      if (!sourcePlanet) {
        return false;
      }

      const allAspectedHouses = [
        ...this.getAspectedHouses(sourcePlanet.house, config.first),
        ...this.getAspectedHouses(sourcePlanet.house, config.second),
        ...this.getAspectedHouses(sourcePlanet.house, config.third),
        ...this.getAspectedHouses(sourcePlanet.house, config.complete)
      ];

      return allAspectedHouses.includes(targetHouse);
    });
  }

  calculateYoga(planets, houses) {
    const venusPlacement = houses.find((h) => h.planet_id === 3);
    const marsPlacement = houses.find((h) => h.planet_id === 4);

    if (!venusPlacement || !marsPlacement || venusPlacement.house !== marsPlacement.house) {
      return null;
    }

    const house = venusPlacement.house;

    if (TARGET_HOUSES.includes(house) && !this.hasMaleficAspectOnHouse(house, houses)) {
      return this.formatResult({
        id: YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.id,
        name_en: YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.name_en,
        name_mr: YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.name_mr,
        description_en: YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.description_en,
        description_mr: YOGA_TYPES.SHUKRA_MANGAL_PAPI_YOGA.description_mr,
        house,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShukraMangalPapiYoga;
