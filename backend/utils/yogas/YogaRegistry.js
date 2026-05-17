/**
 * Yoga Registry
 * Manages registration and retrieval of yoga classes
 * Implements the Registry Pattern for extensibility
 */

class YogaRegistry {
  constructor() {
    this.yogas = new Map(); // Map to store yoga instances by ID
  }

  /**
   * Register a yoga class instance
   * @param {BaseYoga} yogaInstance - Instance of a yoga class extending BaseYoga
   * @throws {Error} If yoga with same ID already exists
   */
  register(yogaInstance) {
    console.log("yogaInstance",yogaInstance);
    
    if (!yogaInstance.id || !yogaInstance.name || !yogaInstance.calculateYoga) {
      throw new Error(
        `Invalid yoga instance. Must have id, name, and calculateYoga method ${yogaInstance}`
      );
    }

    if (this.yogas.has(yogaInstance.id)) {
      throw new Error(
        `Yoga with ID ${yogaInstance.id} already registered`
      );
    }

    this.yogas.set(yogaInstance.id, yogaInstance);
    // console.log(`✓ Registered yoga: ${yogaInstance.name} (ID: ${yogaInstance.id})`);
  }

  /**
   * Register multiple yoga instances at once
   * @param {Array<BaseYoga>} yogaInstances - Array of yoga instances
   */
  registerMultiple(yogaInstances) {
    yogaInstances.forEach((yoga) => this.register(yoga));
  }

  /**
   * Get a registered yoga by ID
   * @param {number} id - Yoga ID
   * @returns {BaseYoga|undefined} Yoga instance or undefined if not found
   */
  getYoga(id) {
    return this.yogas.get(id);
  }

  /**
   * Get all registered yogas
   * @returns {Array<BaseYoga>} Array of all registered yoga instances
   */
  getAllYogas() {
    return Array.from(this.yogas.values());
  }

  /**
   * Get count of registered yogas
   * @returns {number} Number of registered yogas
   */
  getCount() {
    return this.yogas.size;
  }

  /**
   * Calculate all registered yogas for a birth chart
   * Iterates through all registered yogas and calls their calculateYoga method
   * @param {Array} planets - Array of planet data from API
   * @param {Array} houses - Array of house placements
   * @returns {Array} Array of found yogas
   */
  calculateAllYogas(planets, houses) {
    const foundYogas = [];

    this.yogas.forEach((yoga) => {
      try {
        const result = yoga.calculateYoga(planets, houses);
        if (result) {
          foundYogas.push(result);
        }
      } catch (error) {
        console.error(
          `Error calculating yoga ${yoga.name}:`,
          error.message
        );
      }
    });

    return foundYogas;
  }

  /**
   * Unregister a yoga by ID (useful for testing or dynamic deregistration)
   * @param {number} id - Yoga ID to unregister
   * @returns {boolean} True if yoga was unregistered, false if not found
   */
  unregister(id) {
    return this.yogas.delete(id);
  }

  /**
   * Clear all registered yogas (useful for resetting in tests)
   */
  clear() {
    this.yogas.clear();
  }

  /**
   * Get registry info for debugging
   * @returns {Object} Object containing registry information
   */
  getInfo() {
    const yogasList = Array.from(this.yogas.values()).map((yoga) => ({
      id: yoga.id,
      name: yoga.name,
      description: yoga.description
    }));

    return {
      count: this.yogas.size,
      yogas: yogasList
    };
  }
}

// Create and export a singleton instance
const yogaRegistry = new YogaRegistry();

module.exports = { YogaRegistry, yogaRegistry };
