const { ASPECTS_CONFIG } = require('../../consts/consts');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];

class ShaniChandraDurgunkarak extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.id,
      YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.name_en,
      YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.description_en
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
    const saturn = planets.find((p) => p.id === 6);
    const moon = planets.find((p) => p.id === 1);

    if (!saturn || !moon || !saturn.rasi || !moon.rasi || saturn.rasi.id !== moon.rasi.id) {
      return null;
    }

    const moonPlacement = houses.find((h) => h.planet_id === 1);
    if (!moonPlacement) {
      return null;
    }

    if (!this.hasBeneficAspectOnHouse(moonPlacement.house, houses)) {
      return this.formatResult({
        id: YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.id,
        name_en: YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.name_en,
        name_mr: YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.name_mr,
        description_en: YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.description_en,
        description_mr: YOGA_TYPES.SHANI_CHANDRA_DURGUNKARAK.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShaniChandraDurgunkarak;
