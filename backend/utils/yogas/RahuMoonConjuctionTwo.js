/**
 * Saturn in 3rd House Yoga
 * शनी तृतीयेषु योग
 */

const { PLANET_NAME_ID_MAP } = require('../../consts/consts');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class RahuMoonConjuctionTwo extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.RAHU_MOON_CONJUCTION_TWO.id,
      YOGA_TYPES.RAHU_MOON_CONJUCTION_TWO.name,
      YOGA_TYPES.RAHU_MOON_CONJUCTION_TWO.description_en
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
    // Find Rahu in houses
    const rahu = planets.find(
      (p) => p.id === PLANET_NAME_ID_MAP.RAHU
    );

    const moon = planets.find((p) => p.id === PLANET_NAME_ID_MAP.MOON);

    // Check if both planets exist before accessing their properties
    if (!rahu || !moon) {
      return null;
    }

    if (rahu.rasi.id === moon.rasi.id) {
      return this.formatResult({
        description_en: 'The conjunction of the Moon and Rahu indicates trouble from spirits (supernatural distress), lineage/family defects (Gharanyacha Dosh), suffering or hardships for the mother, mental distress, and deficiencies in the houses (astrological positions) associated with the Moon, etc',
        description_mr: 'चंद्र - राहू युती पिशाच्च त्रास, घराण्याचा दोष, मातेस कष्ट, मानसिक त्रास, चंद्राच्या भावस्थानांत उणीव इ. दर्शविते.',
        found: true
      });
    }

    return null;
  }
}

module.exports = RahuMoonConjuctionTwo;
