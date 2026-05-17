/**
 * Mercury in 1st House Yoga
 * ज्ञान शक्ति योग - Knowledge Power Yoga
 * 
 * When Mercury (planet of knowledge, wisdom, communication) is in the 1st house
 * (house of self and personality), it bestows great knowledge power and intelligence
 */

const { getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class ShashteshLagni extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHASHTESH_LAGNI.id,
      YOGA_TYPES.SHASHTESH_LAGNI.name_en,
      YOGA_TYPES.SHASHTESH_LAGNI.description_en
    );
  }

  /**
   * Calculate Mercury in 1st House Yoga
   * Mercury (planet_id 3) in 1st house brings knowledge and wisdom power
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    // Find Lord of 6th house in 1st house
   const lordOf6thHouseId = getLordOfHouse(6,planets,houses);
   const houseOfLord = houses.find(h => h.planet_id === lordOf6thHouseId);

    if (houseOfLord && houseOfLord.house === 1) {
      return this.formatResult({
       id : YOGA_TYPES.SHASHTESH_LAGNI.id,
      name_en : YOGA_TYPES.SHASHTESH_LAGNI.name_en,
      name_mr : YOGA_TYPES.SHASHTESH_LAGNI.name_mr,
      description_mr : YOGA_TYPES.SHASHTESH_LAGNI.description_mr,
      description_en : YOGA_TYPES.SHASHTESH_LAGNI.description_en,
        found: true
      });
    }

    return null;
  }
}

module.exports = ShashteshLagni;
