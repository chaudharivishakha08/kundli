const { ASPECTS_CONFIG } = require('../../consts/consts');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];
const MALEFIC_PLANET_IDS = [0, 4, 6, 101, 102];

const SIGN_LORD_BY_SIGN_ID = {
  0: 4,
  1: 3,
  2: 2,
  3: 1,
  4: 0,
  5: 2,
  6: 3,
  7: 4,
  8: 5,
  9: 6,
  10: 6,
  11: 5
};

class LabhBhavaArthaprapti extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.id,
      YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.name_en,
      YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.description_en
    );
  }

  getAspectedHouses(sourceHouse, aspectList) {
    return aspectList
      .filter((val) => val !== 0)
      .map((asp) => ((sourceHouse + asp - 2) % 12) + 1);
  }

  hasAspectOnHouse(targetHouse, houses, planetIds) {
    return ASPECTS_CONFIG.some((config) => {
      if (!planetIds.includes(config.planet_id)) {
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

  getLabhSignLordId(houses) {
    const labhHouse = houses.find((h) => h.house === 11 && h.sign_id !== null && h.sign_id !== undefined);
    if (!labhHouse) {
      return null;
    }

    return SIGN_LORD_BY_SIGN_ID[labhHouse.sign_id] ?? null;
  }

  calculateYoga(planets, houses) {
    const eleventhHousePlanets = houses.filter(
      (h) => h.house === 11 && h.planet_id !== null && h.planet_id !== undefined && h.planet_id !== 100
    );

    if (eleventhHousePlanets.length === 0) {
      return null;
    }

    const labhSignLordId = this.getLabhSignLordId(houses);
    if (labhSignLordId === null) {
      return null;
    }

    const isBeneficSign = BENEFIC_PLANET_IDS.includes(labhSignLordId);
    const isMaleficSign = MALEFIC_PLANET_IDS.includes(labhSignLordId);
    const hasMaleficAspect = this.hasAspectOnHouse(11, houses, MALEFIC_PLANET_IDS);

    const beneficPlanetInLabh = eleventhHousePlanets.find((h) => BENEFIC_PLANET_IDS.includes(h.planet_id));
    const maleficPlanetInLabh = eleventhHousePlanets.find((h) => MALEFIC_PLANET_IDS.includes(h.planet_id));

    if (isBeneficSign && beneficPlanetInLabh && !hasMaleficAspect) {
      return this.formatResult({
        id: YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.id,
        name_en: YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.name_en,
        name_mr: YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.name_mr,
        description_en: 'Benefic sign and benefic planet in the 11th house without malefic aspect indicate gains through ethical means.',
        description_mr: 'लाभात शुभराशी व शुभ ग्रह पापग्रह अदृष्टी असल्यास नीतिमार्गाने अर्थप्राप्ती होते.',
        variant: 'ethical_gain',
        found: true
      });
    }

    if (isMaleficSign && maleficPlanetInLabh && hasMaleficAspect) {
      return this.formatResult({
        id: YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.id,
        name_en: YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.name_en,
        name_mr: YOGA_TYPES.LABH_BHAVA_ARTHAPRAPTI.name_mr,
        description_en: 'Malefic sign and malefic planet in the 11th house under malefic aspect indicate gains through unethical means.',
        description_mr: 'लाभात पापराशी व पापग्रह, पापग्रह दृष्ट असल्यास अनीतिमार्गाने अर्थप्राप्ती होते.',
        variant: 'unethical_gain',
        found: true
      });
    }

    return null;
  }
}

module.exports = LabhBhavaArthaprapti;
