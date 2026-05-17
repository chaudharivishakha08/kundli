
const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class VenusInVirgo extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.VENUS_IN_VIRGO.id,
      YOGA_TYPES.VENUS_IN_VIRGO.name_en,
      YOGA_TYPES.VENUS_IN_VIRGO.description_en
    );
  }

  /**
   * Calculate Venus in Virgo Yoga
   * Venus (planet_id 2) in Virgo (sign_id 6) brings delay in marriage
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    // Find Venus in Virgo
   const venus = planets.find(p=> p.id === 3 && p.name =='Venus');

    if (venus && venus.rasi.id ==5 && venus.rasi.name =='Kanya' ) {
      return this.formatResult({
       id : YOGA_TYPES.VENUS_IN_VIRGO.id,
      name_en : YOGA_TYPES.VENUS_IN_VIRGO.name_en,
      name_mr : YOGA_TYPES.VENUS_IN_VIRGO.name_mr,
      description_mr : YOGA_TYPES.VENUS_IN_VIRGO.description_mr,
      description_en : YOGA_TYPES.VENUS_IN_VIRGO.description_en,
        found: true
      });
    }

    return null;
  }
}

module.exports = VenusInVirgo;
