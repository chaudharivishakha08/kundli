const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const BENEFIC_PLANET_IDS = [1, 2, 3, 5];

class ShubhagrahaInShashtha extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.id,
      YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.name_en,
      YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.description_en
    );
  }

  calculateYoga(planets, houses) {
    const beneficsInSixth = houses.filter(
      (h) => BENEFIC_PLANET_IDS.includes(h.planet_id) && h.house === 6
    );

    if (beneficsInSixth.length > 0) {
      return this.formatResult({
        id: YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.id,
        name_en: YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.name_en,
        name_mr: YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.name_mr,
        description_en: YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.description_en,
        description_mr: YOGA_TYPES.SHUBHAGRAHA_IN_SHASHTHA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShubhagrahaInShashtha;
