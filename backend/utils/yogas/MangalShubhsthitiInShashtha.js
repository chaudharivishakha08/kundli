const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];

class MangalShubhsthitiInShashtha extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.id,
      YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.name_en,
      YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.description_en
    );
  }

  isShubhState(mars) {
    if (!mars || !mars.rasi || !mars.rasi.lord) {
      return false;
    }

    return BENEFIC_PLANET_IDS.includes(mars.rasi.lord.id);
  }

  calculateYoga(planets, houses) {
    const marsPlacement = houses.find((h) => h.planet_id === 4 && h.house === 6);
    const mars = planets.find((p) => p.id === 4);

    if (marsPlacement && this.isShubhState(mars)) {
      return this.formatResult({
        id: YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.id,
        name_en: YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.name_en,
        name_mr: YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.name_mr,
        description_en: YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.description_en,
        description_mr: YOGA_TYPES.MANGAL_SHUBHSTITI_IN_SHASHTHA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = MangalShubhsthitiInShashtha;
