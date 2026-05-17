const { shubhdvidadashakam, shubhnavpanchmam } = require('../../consts/consts');
const { checkReversiblePair } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class RaviChandraShubhYoga extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.id,
      YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.name_en,
      YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.description_en
    );
  }

  isShubhRelation(sun, moon) {
    if (!sun.rasi || !moon.rasi) {
      return false;
    }

    const pair = [sun.rasi.id + 1, moon.rasi.id + 1];

    return (
      checkReversiblePair(pair, shubhdvidadashakam) ||
      checkReversiblePair(pair, shubhnavpanchmam)
    );
  }

  isAfflicted(planet) {
    if (!planet || !planet.rasi || !planet.rasi.lord) {
      return true;
    }

    const lordId = planet.rasi.lord.id;
    return lordId === 4 || lordId === 6 || lordId === 101 || lordId === 102;
  }

  calculateYoga(planets, houses) {
    const sun = planets.find((p) => p.id === 0);
    const moon = planets.find((p) => p.id === 1);

    if (!sun || !moon) {
      return null;
    }

    const isShubhRelated = this.isShubhRelation(sun, moon);
    const sunAfflicted = this.isAfflicted(sun);
    const moonAfflicted = this.isAfflicted(moon);

    if (isShubhRelated && !sunAfflicted && !moonAfflicted) {
      return this.formatResult({
        id: YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.id,
        name_en: YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.name_en,
        name_mr: YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.name_mr,
        description_en: YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.description_en,
        description_mr: YOGA_TYPES.RAVI_CHANDRA_SHUBH_YOGA.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = RaviChandraShubhYoga;
