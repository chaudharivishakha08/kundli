const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class MangalInKarka extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.MANGAL_IN_KARKA.id,
      YOGA_TYPES.MANGAL_IN_KARKA.name_en,
      YOGA_TYPES.MANGAL_IN_KARKA.description_en
    );
  }

  calculateYoga(planets, houses) {
    const mars = planets.find((p) => p.id === 4);

    if (mars && mars.rasi && mars.rasi.id === 3) {
      return this.formatResult({
        id: YOGA_TYPES.MANGAL_IN_KARKA.id,
        name_en: YOGA_TYPES.MANGAL_IN_KARKA.name_en,
        name_mr: YOGA_TYPES.MANGAL_IN_KARKA.name_mr,
        description_en: YOGA_TYPES.MANGAL_IN_KARKA.description_en,
        description_mr: YOGA_TYPES.MANGAL_IN_KARKA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = MangalInKarka;
