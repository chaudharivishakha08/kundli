/**
 * Saturn in 3rd House Yoga
 * शनी तृतीयेषु योग
 */

const { PLANET_NAME_ID_MAP } = require('../../consts/consts');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class RahuMoonConjuctionOne extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.RAHU_MOON_CONJUCTION_ONE.id,
      YOGA_TYPES.RAHU_MOON_CONJUCTION_ONE.name,
      YOGA_TYPES.RAHU_MOON_CONJUCTION_ONE.description_en
    );
  }

  /**
   * Calculate Rahu Moon Conjuction
   * Looks for Rahu and Moon in the same house
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    // Find Rahu and Moon
    const rahu = planets.find(
      (p) => p.id === PLANET_NAME_ID_MAP.RAHU 
    );
    console.log("rahu",rahu);
    

    const moon = planets.find((p) => p.id === PLANET_NAME_ID_MAP.MOON);
    console.log("moon",moon);

    // Check if both planets exist before accessing their properties
    if (!rahu || !moon) {
      return null;
    }

    console.log("rahi",rahu.rasi.id,moon.rasi.id);
    
    if (rahu.rasi.id === moon.rasi.id) {
      return this.formatResult({
        description_en:  'If the conjunction of the Moon and Rahu is present anywhere in the birth chart, one should not get involved in the complications of starting or running a business. In this regard, it is particularly inauspicious if the conjunction occurs in the 2nd, 4th, 5th, 7th, or 8th houses.',
        description_mr: 'चंद्र राहू युती पत्रिकेत कुठेही असली तर धंदा करण्याचे भानगडीत पडू नये. त्यात २, ४, ५, ७ व ८ स्थानी फार अशुभ असते.',
        found: true
      });
    }

    return null;
  }
}

module.exports = RahuMoonConjuctionOne;
