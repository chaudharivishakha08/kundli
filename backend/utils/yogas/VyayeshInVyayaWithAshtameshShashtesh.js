const { ASPECTS_CONFIG } = require('../../consts/consts');
const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];

class VyayeshInVyayaWithAshtameshShashtesh extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.id,
      YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.name_en,
      YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.description_en
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
    const vyayeshId = getLordOfHouse(12, planets, houses);
    const ashtameshId = getLordOfHouse(8, planets, houses);
    const shashteshId = getLordOfHouse(6, planets, houses);

    if (vyayeshId === null || ashtameshId === null || shashteshId === null) {
      return null;
    }

    const vyayeshPlacement = houses.find((h) => h.planet_id === vyayeshId);
    const ashtameshPlacement = houses.find((h) => h.planet_id === ashtameshId);
    const shashteshPlacement = houses.find((h) => h.planet_id === shashteshId);
    const hasBeneficAspect = this.hasBeneficAspectOnHouse(12, houses);

    if (
      vyayeshPlacement &&
      ashtameshPlacement &&
      shashteshPlacement &&
      vyayeshPlacement.house === 12 &&
      ashtameshPlacement.house === 12 &&
      shashteshPlacement.house === 12 &&
      hasBeneficAspect
    ) {
      return this.formatResult({
        id: YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.id,
        name_en: YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.name_en,
        name_mr: YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.name_mr,
        description_en: YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.description_en,
        description_mr: YOGA_TYPES.VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = VyayeshInVyayaWithAshtameshShashtesh;
