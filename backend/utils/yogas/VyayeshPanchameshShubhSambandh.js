const { shubhdvidadashakam, shubhnavpanchmam } = require('../../consts/consts');
const { checkReversiblePair, getLordOfHouse } = require('../../consts/helper/helper');
const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

class VyayeshPanchameshShubhSambandh extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.id,
      YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.name_en,
      YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.description_en
    );
  }

  isShubhSambandh(vyayeshPlanet, panchameshPlanet) {
    if (!vyayeshPlanet.rasi || !panchameshPlanet.rasi) {
      return false;
    }

    const vyayeshRashiNumber = vyayeshPlanet.rasi.id + 1;
    const panchameshRashiNumber = panchameshPlanet.rasi.id + 1;
    const pair = [vyayeshRashiNumber, panchameshRashiNumber];

    return (
      checkReversiblePair(pair, shubhdvidadashakam) ||
      checkReversiblePair(pair, shubhnavpanchmam)
    );
  }

  calculateYoga(planets, houses) {
    const vyayeshId = getLordOfHouse(12, planets, houses);
    const panchameshId = getLordOfHouse(5, planets, houses);

    if (vyayeshId === null || panchameshId === null) {
      return null;
    }

    const vyayeshPlanet = planets.find((p) => p.id === vyayeshId);
    const panchameshPlanet = planets.find((p) => p.id === panchameshId);
    const vyayeshPlacement = houses.find((h) => h.planet_id === vyayeshId);
    const panchameshPlacement = houses.find((h) => h.planet_id === panchameshId);

    if (!vyayeshPlanet || !panchameshPlanet || !vyayeshPlacement || !panchameshPlacement) {
      return null;
    }

    const isConjunction = vyayeshPlacement.house === panchameshPlacement.house;
    const isShubhRelated = this.isShubhSambandh(vyayeshPlanet, panchameshPlanet);

    if (isConjunction || isShubhRelated) {
      return this.formatResult({
        id: YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.id,
        name_en: YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.name_en,
        name_mr: YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.name_mr,
        description_en: YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.description_en,
        description_mr: YOGA_TYPES.VYAYESH_PANCHAMESH_SHUBH_SAMBANDH.description_mr,
        found: true
      });
    }

    return null;
  }
}

module.exports = VyayeshPanchameshShubhSambandh;
