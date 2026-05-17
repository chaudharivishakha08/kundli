const { ASPECTS_CONFIG } = require('../../consts/consts');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];
const WATER_SIGN_IDS = [3, 7, 11];

class MangalJalrashiDoshFemale extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.id,
      YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.name_en,
      YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.description_en
    );
  }

  getAspectedHouses(sourceHouse, aspectList) {
    return aspectList
      .filter((val) => val !== 0)
      .map((asp) => ((sourceHouse + asp - 2) % 12) + 1);
  }

  hasBeneficAspectOnHouse(targetHouse, houses) {
    return ASPECTS_CONFIG.some((config) => {
      if (!BENEFIC_PLANET_IDS.includes(config.planet_id)) return false;
      const sourcePlanet = houses.find((h) => h.planet_id === config.planet_id);
      if (!sourcePlanet) return false;
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
    const mars = planets.find((p) => p.id === 4);
    const marsPlacement = houses.find((h) => h.planet_id === 4);
    const mercury = planets.find((p) => p.id === 2);
    const venus = planets.find((p) => p.id === 3);
    const hasMercuryOrVenusAssociation =
      (mercury && mars && mercury.rasi && mars.rasi && mercury.rasi.id === mars.rasi.id) ||
      (venus && mars && venus.rasi && mars.rasi && venus.rasi.id === mars.rasi.id);

    if (
      mars &&
      mars.rasi &&
      WATER_SIGN_IDS.includes(mars.rasi.id) &&
      marsPlacement &&
      !this.hasBeneficAspectOnHouse(marsPlacement.house, houses) &&
      hasMercuryOrVenusAssociation
    ) {
      return this.formatResult({
        id: YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.id,
        name_en: YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.name_en,
        name_mr: YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.name_mr,
        description_en: YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.description_en,
        description_mr: YOGA_TYPES.MANGAL_JALRASHI_DOSH_FEMALE.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = MangalJalrashiDoshFemale;
