const { ASPECTS_CONFIG } = require('../../consts/consts');
const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];
const KENDRA_KONA_HOUSES = [1, 4, 5, 7, 9, 10];

class RaviBhagyeshKendraKonaShubhRashi extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.id,
      YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.name_en,
      YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.description_en
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

  isBeneficSign(house, planets, houses) {
    const housePlacement = houses.find((h) => h.house === house);
    if (!housePlacement) {
      return false;
    }

    const signPlanet = planets.find((p) => p.id === housePlacement.planet_id);
    if (!signPlanet || !signPlanet.rasi || !signPlanet.rasi.lord) {
      return false;
    }

    return BENEFIC_PLANET_IDS.includes(signPlanet.rasi.lord.id);
  }

  calculateYoga(planets, houses) {
    const bhagyeshId = getLordOfHouse(9, planets, houses);
    if (bhagyeshId === null) {
      return null;
    }

    const sunPlacement = houses.find((h) => h.planet_id === 0);
    const bhagyeshPlacement = houses.find((h) => h.planet_id === bhagyeshId);

    if (!sunPlacement || !bhagyeshPlacement) {
      return null;
    }

    const sameHouse = sunPlacement.house === bhagyeshPlacement.house;
    const isKendraKona = KENDRA_KONA_HOUSES.includes(sunPlacement.house);
    const hasBeneficAspect = this.hasBeneficAspectOnHouse(sunPlacement.house, houses);
    const isInBeneficSign = this.isBeneficSign(sunPlacement.house, planets, houses);

    if (sameHouse && isKendraKona && hasBeneficAspect && isInBeneficSign) {
      return this.formatResult({
        id: YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.id,
        name_en: YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.name_en,
        name_mr: YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.name_mr,
        description_mr: YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.description_mr,
        description_en: YOGA_TYPES.RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI.description_en,
        found: true
      });
    }

    return null;
  }
}

module.exports = RaviBhagyeshKendraKonaShubhRashi;
