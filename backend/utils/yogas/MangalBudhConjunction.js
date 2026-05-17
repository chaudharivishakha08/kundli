const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class MangalBudhConjunction extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.id,
      YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.name_en,
      YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.description_en
    );
  }

  calculateYoga(planets, houses) {
    const mars = planets.find((p) => p.id === 4);
    const mercury = planets.find((p) => p.id === 2);

    if (mars && mercury && mars.rasi && mercury.rasi && mars.rasi.id === mercury.rasi.id) {
      return this.formatResult({
        id: YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.id,
        name_en: YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.name_en,
        name_mr: YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.name_mr,
        description_en: YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.description_en,
        description_mr: YOGA_TYPES.MANGAL_BUDH_CONJUNCTION.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = MangalBudhConjunction;
