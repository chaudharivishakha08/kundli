const { ashubhdvidadashakam, neshtnavpanchamam } = require('../../consts/consts');
const { checkReversiblePair } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class RaviShaniAshubhYoga extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.id,
      YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.name_en,
      YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.description_en
    );
  }

  isAshubhRelation(sun, saturn) {
    if (!sun.rasi || !saturn.rasi) {
      return false;
    }

    const pair = [sun.rasi.id + 1, saturn.rasi.id + 1];

    return (
      checkReversiblePair(pair, ashubhdvidadashakam) ||
      checkReversiblePair(pair, neshtnavpanchamam)
    );
  }

  calculateYoga(planets, houses) {
    const sun = planets.find((p) => p.id === 0);
    const saturn = planets.find((p) => p.id === 6);

    if (!sun || !saturn) {
      return null;
    }

    const isConjunction = sun.rasi && saturn.rasi && sun.rasi.id === saturn.rasi.id;
    const isAshubhRelated = this.isAshubhRelation(sun, saturn);

    if (isConjunction || isAshubhRelated) {
      return this.formatResult({
        id: YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.id,
        name_en: YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.name_en,
        name_mr: YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.name_mr,
        description_en: YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.description_en,
        description_mr: YOGA_TYPES.RAVI_SHANI_ASHUBH_YOGA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = RaviShaniAshubhYoga;
