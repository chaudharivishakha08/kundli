const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const SPIRITUAL_HOUSES = [5, 9, 12];

class GuruShaniConjunctionSpiritual extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.id,
      YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.name_en,
      YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.description_en
    );
  }

  /**
   * Calculate Jupiter-Saturn conjunction in 5th, 9th, or 12th house
   * Jupiter = 5, Saturn = 6
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const jupiterPlacement = houses.find((h) => h.planet_id === 5);
    const saturnPlacement = houses.find((h) => h.planet_id === 6);

    if (!jupiterPlacement || !saturnPlacement) {
      return null;
    }

    if (
      jupiterPlacement.house === saturnPlacement.house &&
      SPIRITUAL_HOUSES.includes(jupiterPlacement.house)
    ) {
      return this.formatResult({
        id: YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.id,
        name_en: YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.name_en,
        name_mr: YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.name_mr,
        description_en: YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.description_en,
        description_mr: YOGA_TYPES.GURU_SHANI_CONJUNCTION_SPIRITUAL.description_mr,
        house: jupiterPlacement.house,
        found: true
      });
    }

    return null;
  }
}

module.exports = GuruShaniConjunctionSpiritual;
