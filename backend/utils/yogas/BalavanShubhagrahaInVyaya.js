const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];

class BalavanShubhagrahaInVyaya extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.id,
      YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.name_en,
      YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.description_en
    );
  }

  isStrongBeneficPlanet(planet) {
    if (!planet || !planet.rasi) {
      return false;
    }

    const lordId = planet.rasi.lord && planet.rasi.lord.id;
    return BENEFIC_PLANET_IDS.includes(planet.id) && BENEFIC_PLANET_IDS.includes(lordId);
  }

  calculateYoga(planets, houses) {
    const dhaneshId = getLordOfHouse(2, planets, houses);
    const labheshId = getLordOfHouse(11, planets, houses);

    const planetsInVyaya = houses
      .filter((h) => h.house === 12 && BENEFIC_PLANET_IDS.includes(h.planet_id))
      .map((h) => planets.find((p) => p.id === h.planet_id))
      .filter(Boolean);

    const qualifyingPlanet = planetsInVyaya.find(
      (planet) =>
        this.isStrongBeneficPlanet(planet) &&
        planet.id !== dhaneshId &&
        planet.id !== labheshId
    );

    if (qualifyingPlanet) {
      return this.formatResult({
        id: YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.id,
        name_en: YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.name_en,
        name_mr: YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.name_mr,
        description_en: YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.description_en,
        description_mr: YOGA_TYPES.BALAVAN_SHUBHAGRAHA_IN_VYAYA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = BalavanShubhagrahaInVyaya;
