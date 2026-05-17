const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];

class ShukraAheadOfRaviShubh extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.id,
      YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.name_en,
      YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.description_en
    );
  }

  isShubhState(venus) {
    if (!venus || !venus.rasi || !venus.rasi.lord) {
      return false;
    }

    return BENEFIC_PLANET_IDS.includes(venus.rasi.lord.id);
  }

  calculateYoga(planets, houses) {
    const sun = planets.find((p) => p.id === 0);
    const venus = planets.find((p) => p.id === 3);

    if (!sun || !venus || typeof sun.longitude !== 'number' || typeof venus.longitude !== 'number') {
      return null;
    }

    if (venus.longitude > sun.longitude && this.isShubhState(venus)) {
      return this.formatResult({
        id: YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.id,
        name_en: YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.name_en,
        name_mr: YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.name_mr,
        description_en: YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.description_en,
        description_mr: YOGA_TYPES.SHUKRA_AHEAD_OF_RAVI_SHUBH.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShukraAheadOfRaviShubh;
