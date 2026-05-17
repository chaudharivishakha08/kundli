/**
 * Base Yoga Class
 * All individual yoga classes should extend this base class
 */

class BaseYoga {
  /**
   * Initialize the yoga
   * @param {number} id - Unique identifier for the yoga
   * @param {string} name - Name of the yoga
   * @param {string} description - Description of the yoga effect
   */
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  /**
   * Calculate if the yoga exists in the birth chart
   * Must be overridden by child classes
   * @param {Array} planets - Array of planet data from API
   * @param {Array} houses - Array of house placements
   * @returns {Object|null} Yoga data if found, null otherwise
   */
  calculateYoga(planets, houses) {
    throw new Error('calculateYoga() must be implemented in child class');
  }

  /**
   * Format the result in a standard way
   * @param {Object} data - The yoga data
   * @returns {Object} Formatted yoga result
   */
  formatResult(data) {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ...data
    };
  }
}

module.exports = BaseYoga;
