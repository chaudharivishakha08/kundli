const { ASPECTS_CONFIG } = require('../../consts/consts');
const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];

class LabheshDhaneshInDhanaWithShubhDrishti extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.id,
      YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.name_en,
      YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.description_en
    );
  }

  getAspectedHouses(sourceHouse, aspectList) {
    return aspectList
      .filter((val) => val !== 0)
      .map((asp) => ((sourceHouse + asp - 2) % 12) + 1);
  }

  hasBeneficAspectOnHouse(targetHouse, houses) {
    return ASPECTS_CONFIG.some((config) => {
      if (!BENEFIC_PLANET_IDS.includes(config.planet_id)) {
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
    const lordOf2ndHouseId = getLordOfHouse(2, planets, houses);
    const lordOf11thHouseId = getLordOfHouse(11, planets, houses);

    if (lordOf2ndHouseId === null || lordOf11thHouseId === null) {
      return null;
    }

    const houseOf2ndLord = houses.find((h) => h.planet_id === lordOf2ndHouseId);
    const houseOf11thLord = houses.find((h) => h.planet_id === lordOf11thHouseId);
    const hasBeneficAspect = this.hasBeneficAspectOnHouse(2, houses);

    if (
      houseOf2ndLord &&
      houseOf11thLord &&
      houseOf2ndLord.house === 2 &&
      houseOf11thLord.house === 2 &&
      hasBeneficAspect
    ) {
      return this.formatResult({
        id: YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.id,
        name_en: YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.name_en,
        name_mr: YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.name_mr,
        description_mr: YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.description_mr,
        description_en: YOGA_TYPES.LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI.description_en,
        found: true
      });
    }

    return null;
  }
}

module.exports = LabheshDhaneshInDhanaWithShubhDrishti;
