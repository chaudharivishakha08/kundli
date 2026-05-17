const { YOGA_TYPES } = require('../../consts/yogaConstants');
const BaseYoga = require('./BaseYoga');

const HOUSE_EFFECTS = {
  1: {
    description_en: 'Generally inauspicious in the 1st house.',
    description_mr: 'प्रथम स्थानी साधारण अशुभ.'
  },
  3: {
    description_en: 'In the 3rd house it can be harmful to brothers and sisters.',
    description_mr: 'तृतीय स्थानी बंधू भगिनींना घातक.'
  },
  4: {
    description_en: 'In the 4th house it is highly inauspicious and destructive to domestic happiness.',
    description_mr: 'चतुर्थस्थानी खूप अशुभ, सुखस्थानावर नाश.'
  },
  5: {
    description_en: 'In the 5th house it is very inauspicious, harms progeny matters, and is especially adverse for women.',
    description_mr: 'पंचमस्थानी संतती वैगुण्य; पंचमात युती स्त्रियांना फारच अशुभ.'
  },
  6: {
    description_en: 'In the 6th house it is generally inauspicious and may indicate terrible disease.',
    description_mr: 'षष्ठस्थानी साधारण अशुभ, भयानक आजार.'
  },
  7: {
    description_en: 'In the 7th house it is very inauspicious and may indicate multiple marriage tendencies or premarital relations.',
    description_mr: 'सप्तमात खूप अशुभ, बहुभार्या योग-विवाहपूर्व प्रेमसंबंध.'
  },
  8: {
    description_en: 'In the 8th house it gives mixed results with ill health and medium longevity.',
    description_mr: 'अष्टमस्थानी अनारोग्य, आयु मध्यम.'
  },
  9: {
    description_en: 'In the 9th house it gives mixed results with failure in ambition.',
    description_mr: 'नवम स्थानी महत्त्वाकांक्षेत अपयश.'
  },
  10: {
    description_en: 'In the 10th house it is generally inauspicious for profession.',
    description_mr: 'दशमात व्यवसायाबाबत साधारण अशुभ.'
  },
  12: {
    description_en: 'In the 12th house it is very inauspicious.',
    description_mr: 'व्ययात खूप अशुभ.'
  }
};

class MangalRahuConjunction extends BaseYoga {
  constructor() {
    super(
      YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.id,
      YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.name_en,
      YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.description_en
    );
  }

  calculateYoga(planets, houses) {
    const marsPlacement = houses.find((h) => h.planet_id === 4);
    const rahuPlacement = houses.find((h) => h.planet_id === 101);

    if (!marsPlacement || !rahuPlacement || marsPlacement.house !== rahuPlacement.house) {
      return null;
    }

    const house = marsPlacement.house;
    const effect = HOUSE_EFFECTS[house] || {
      description_en: 'This conjunction gives mixed results in this house.',
      description_mr: 'बाकी स्थानी मिश्र फले देते.'
    };

    return this.formatResult({
      id: YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.id,
      name_en: YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.name_en,
      name_mr: YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.name_mr,
      description_en: effect.description_en,
      description_mr: effect.description_mr,
      base_description_en: YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.description_en,
      base_description_mr: YOGA_TYPES.MANGAL_RAHU_CONJUNCTION.description_mr,
      house,
      found: true
    });
  }
}

module.exports = MangalRahuConjunction;
