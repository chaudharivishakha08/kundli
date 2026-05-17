const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const HOUSE_EFFECTS = {
  1: {
    description_en: 'In the 1st house, it may indicate untimely death, serious illness, and inauspicious effects on profession and family life.',
    description_mr: 'लग्नात: अकाल मृत्यू अगर गंभीर आजार, धंदात कुटुंबास अशुभ.'
  },
  2: {
    description_en: 'In the 2nd house, it may cause increase in debt.',
    description_mr: 'धनात: ऋणवृद्धी.'
  },
  3: {
    description_en: 'In the 3rd house, siblings may suffer troubles, untimely death, widowhood, and related distress.',
    description_mr: 'पराक्रमात: बंधूंना, बहिणींना त्रास, अकाल मृत्यू, वैधव्य इ.'
  },
  4: {
    description_en: 'In the 4th house, there may be lack of happiness from mother, vehicle, and home.',
    description_mr: 'सुखभावात: माता, वाहन, घर यांच्या सुखात कमतरता.'
  },
  5: {
    description_en: 'In the 5th house, there may be deficiency in progeny happiness.',
    description_mr: 'पंचमात: संततीसुखात उणीव.'
  },
  6: {
    description_en: 'In the 6th house, it can destroy enemies, but may also bring danger to one’s own life.',
    description_mr: 'षष्ठात: शत्रुनाश, स्वतःच्या जीवासही धोका.'
  },
  7: {
    description_en: 'In the 7th house, married life may suffer and life may remain full of struggles.',
    description_mr: 'सप्तमात: पत्नीसुखात उणीव, संघर्षाचे नित्य जीवन.'
  },
  8: {
    description_en: 'In the 8th house, it may bring financial difficulty and crises.',
    description_mr: 'अष्टमात: आर्थिक अडचण, संकटे.'
  },
  9: {
    description_en: 'In the 9th house, there may be lack of paternal happiness and loss of reputation.',
    description_mr: 'भाग्यात: पितृसुखात उणीव, अपकीर्ती.'
  },
  10: {
    description_en: 'In the 10th house, it may bring destruction in profession, loss of honour, and harm to paternal happiness.',
    description_mr: 'दशमात: धंद्यात नाश, मानहानी, पितृसुख हानी.'
  },
  11: {
    description_en: 'In the 11th house, there may be deficiency in progeny happiness and friends may turn into enemies.',
    description_mr: 'लाभात: संतती सुखात कमतरता, मित्रशत्रू होतात.'
  },
  12: {
    description_en: 'In the 12th house, it may bring poverty, increasing debt, and punishment from authorities.',
    description_mr: 'व्ययांत: दारिद्र्य, कर्जवाढ, राजदंड.'
  }
};

class ShaniMangalConjunction extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.id,
      YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.name_en,
      YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.description_en
    );
  }

  /**
   * Calculate Saturn-Mars conjunction by house
   * Saturn = 6, Mars = 4
   * @param {Array} planets - Array of planet data
   * @param {Array} houses - Array of house placements
   * @returns {Object|null}
   */
  calculateYoga(planets, houses) {
    const saturnPlacement = houses.find((h) => h.planet_id === 6);
    const marsPlacement = houses.find((h) => h.planet_id === 4);

    if (!saturnPlacement || !marsPlacement) {
      return null;
    }

    if (saturnPlacement.house !== marsPlacement.house) {
      return null;
    }

    const house = saturnPlacement.house;
    const houseEffect = HOUSE_EFFECTS[house];

    if (!houseEffect) {
      return null;
    }

    return this.formatResult({
      id: YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.id,
      name_en: YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.name_en,
      name_mr: YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.name_mr,
      description_en: houseEffect.description_en,
      description_mr: houseEffect.description_mr,
      base_description_en: YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.description_en,
      base_description_mr: YOGA_TYPES.SHANI_MANGAL_CONJUNCTION.description_mr,
      house,
      found: true
    });
  }
}

module.exports = ShaniMangalConjunction;
