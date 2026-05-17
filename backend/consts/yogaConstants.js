/**
 * Yoga Constants - All registered yogas with their IDs and names
 * Each yoga should have:
 * - id: Unique identifier for the yoga
 * - name: English name of the yoga
 * - name_mr: Marathi name of the yoga (if applicable)
 * - description: Brief description of the yoga
 */

const YOGA_TYPES = {
  SATURN_THIRD: {
    id: 7,
    name_en: 'Saturn in 3rd House Yoga',
    name_mr: 'शनी पराक्रमात',
    description_en: 'If Saturn is in the 3rd house, success comes only after many disappointing events and struggles.',
    description_mr: 'शनी पराक्रमात असल्यास अनेक निराशाजनक घटनांनंतरच त्या व्यक्तीस यश मिळते.'
  },
  RAHU_MOON_CONJUCTION_ONE: {
    id: 1,
    name: 'Rahu Moon Conjuction',
    name_mr: 'चंद्र - राहू युती ',
    description_mr: 'चंद्र - राहू युती पिशाच्च त्रास, घराण्याचा दोष, मातेस कष्ट, मानसिक त्रास, चंद्राच्या भावस्थानांत उणीव इ. दर्शविते.',
    description_en: "The conjunction of the Moon and Rahu indicates trouble from spirits (supernatural distress), lineage/family defects (Gharanyacha Dosh), suffering or hardships for the mother, mental distress, and deficiencies in the houses (astrological positions) associated with the Moon, etc"
  },

  SHASHTESH_LAGNI: {
    id: 2,
    name_en: 'Shashtesh in Lagna',
    name_mr: 'षष्ठेश लग्नी',
    description_en: 'The Lord of the 6th House in the 1st House (Ascendant) is a destroyer of enemies.',
    description_mr: 'षष्ठेश लग्नी शत्रूनाशक असतो.'
  },
  VENUS_IN_VIRGO: {
    id: 3,
    name_en: 'Venus in Virgo',
    name_mr: 'कन्या राशीतील शुक्र',
    description_en: 'If Venus is in the Virgo sign, there is a delay in marriage.',
    description_mr: 'शुक्र कन्या राशीत असल्यास विवाहास विलंब होते.'
  },
  RAHU_MOON_CONJUCTION_TWO: {
    id: 4,
    name: 'Rahu Moon Conjuction',
    name_mr: 'चंद्र - राहू युती ',
    description_en: 'If the conjunction of the Moon and Rahu is present anywhere in the birth chart, one should not get involved in the complications of starting or running a business. In this regard, it is particularly inauspicious if the conjunction occurs in the 2nd, 4th, 5th, 7th, or 8th houses.',
    description_mr: "चंद्र राहू युती पत्रिकेत कुठेही असली तर धंदा करण्याचे भानगडीत पडू नये. त्यात २, ४, ५, ७ व ८ स्थानी फार अशुभ असते."
  },
  SURYA_MANGAL_BUDH_LAGNA: {
    id: 5,
    name_en: 'Sun, Mars and Mercury in Lagna',
    name_mr: 'लग्नात रवि, मंगळ, बुध ग्रहयोग',
    description_en: 'If Sun, Mars, and Mercury form a conjunction in the Ascendant, the person may appear attractive but can be deceptive, cold-hearted, highly selfish, and inclined to display self-importance. Traits may vary somewhat depending on the sign characteristics and benefic or malefic planetary influences.',
    description_mr: 'लग्नात रवि, मंगळ, बुध हे ग्रहयोग असल्यास व्यक्ती दिसायला मोहक पण मायावी, हृदयशून्य, अतिस्वार्थी, स्वतःचाच तोरा मिरवणारी असते. राशी गुणधर्म व शुभ-अशुभ ग्रहयोगानुसार थोडा फार फरक पडेल इतकेच.'
  },
  DHANESH_ASHTAMESH_IN_DHANA: {
    id: 6,
    name_en: 'Dhanesh with Ashtamesh in 2nd House',
    name_mr: 'धनात धनेशाबरोबर अष्टमेश',
    description_en: 'If the lord of the 2nd house is placed in the 2nd house together with the lord of the 8th house, it can indicate financial troubles, irregularities, and various types of monetary scandals.',
    description_mr: 'धनात धनेशाबरोबर अष्टमेश असेल तर सर्व प्रकारचे आर्थिक घोटाळे व त्रास होतात.'
  },
  LABHESH_DHANESH_IN_DHANA_WITH_SHUBH_DRISHTI: {
    id: 8,
    name_en: 'Labhesh in 2nd House with Dhanesh and Benefic Aspect',
    name_mr: 'लाभेश धनात धनेशासह शुभ दृष्ट',
    description_en: 'If the lord of the 11th house is placed in the 2nd house together with the lord of the 2nd house, and the 2nd house receives a benefic aspect, it indicates strong financial gains and wealth accumulation.',
    description_mr: 'लाभेश धनात धनेशासह शुभ दृष्ट खूप आर्थिक प्राप्ती होते.'
  },
  RAVI_BHAGYESH_IN_KENDRA_KONA_SHUBH_RASHI: {
    id: 9,
    name_en: 'Sun with Bhagyesh in Kendra/Kona in Benefic Sign',
    name_mr: 'रवि भाग्येशाबरोबर केंद्र कोनात शुभ राशीस शुभ दृष्ट',
    description_en: 'If the Sun is joined with the lord of the 9th house in a Kendra or Kona, placed in a benefic sign and receiving a benefic aspect, the person rises steadily and achieves repeated success in politics.',
    description_mr: 'रवि भाग्येशाबरोबर केंद्र कोनात शुभ राशीस शुभ दृष्ट असल्यास ती व्यक्ती राजकारणांत नित्य यशस्वी होऊन उन्नतीस जाते.'
  },
  RAVI_SHANI_CONJUNCTION: {
    id: 10,
    name_en: 'Sun-Saturn Conjunction',
    name_mr: 'रवि-शनी युती',
    description_en: 'If Sun and Saturn are in conjunction, there may be lack of paternal happiness, and a period can arise in life marked by crisis or stigma. In a female horoscope, the husband may carry Saturnine qualities.',
    description_mr: 'रवि-शनी युती असल्यास पितृसुखात कमतरता, जीवनांत आणीबाणीचा कलंक लागण्याचा काल येतो. स्त्रीच्या पत्रिकेत पती शनीच्या गुणधर्माचा लाभतो.'
  },
  SHUKRA_MANGAL_CONJUNCTION_IN_OWN_SIGNS: {
    id: 11,
    name_en: 'Venus-Mars Conjunction in Venus or Mars Sign',
    name_mr: 'शुक्र-मंगळ युती शुक्राच्या अगर मंगळाच्या गृही',
    description_en: 'If Venus and Mars are in conjunction in a sign owned by Venus or Mars, one may get a beautiful spouse and the spouse may hold influence over the husband. If unafflicted by malefic planets, marriage may happen early, smoothly, and with the desired spouse. In the 2nd and 4th houses this becomes more fruitful; the native may be pleasure-loving and spendthrift. This yoga is also considered favorable for a female native.',
    description_mr: 'शुक्राच्या अगर मंगळाच्या गृही शुक्र-मंगळ युती असल्यास पत्नी देखणी मिळते व पत्नीचे प्रभुत्व पतीवर असते. ही युती अशुभ ग्रह यांनी पिडित नसेल तर विवाहही लवकर, विनाकष्ट व अपेक्षित पत्नीशी होतो. धनात व चतुर्थात जास्त फलदायी स्वभाव, खर्चिक, विषयी असतो. स्त्रीजातकासही हा योग शुभफलदायी असतो.'
  },
  VYAYESH_PANCHAMESH_SHUBH_SAMBANDH: {
    id: 12,
    name_en: 'Vyayesh with Panchamesh or in Auspicious Relation',
    name_mr: 'व्ययेश पंचमेशाशी युतीत अगर शुभ संबंधित',
    description_en: 'If the lord of the 12th house is in conjunction with the lord of the 5th house, or if they are in an auspicious relationship, the native has deep faith in God and spirituality.',
    description_mr: 'व्ययेश पंचमेशाशी युतीत अगर शुभ संबंधित असल्यास ईश्वरावर अध्यात्मावर गाढ श्रद्धा असते.'
  },
  VYAYESH_IN_VYAYA_WITH_ASHTAMESH_SHASHTHESH: {
    id: 13,
    name_en: 'Vyayesh in 12th with Ashtamesh and Shashtesh under Benefic Aspect',
    name_mr: 'व्ययेश व्ययांत अष्टमेश व षष्ठेशासह शुभ दृष्ट',
    description_en: 'If the lord of the 12th house is placed in the 12th house together with the lords of the 8th and 6th houses, and receives a benefic aspect, the native may enjoy wealth, vehicles, luxury, and prosperity in all ways.',
    description_mr: 'व्ययेश व्ययांत अष्टमेश व षष्ठेशासह शुभ दृष्ट श्रीमंती, वाहनसुख, ऐषारामी व सर्वप्रकारे भरभराटीचे जीवन असते.'
  },
  SHANI_RAHU_IN_PANCHAM: {
    id: 14,
    name_en: 'Saturn-Rahu Yoga in 5th House',
    name_mr: 'पंचमात शनी-राहू योग',
    description_en: 'If Saturn and Rahu are together in the 5th house, intelligence, memory, and concentration may weaken. The inauspicious effect becomes stronger in a Mars sign, and education may remain incomplete.',
    description_mr: 'पंचमात शनी-राहू योग असल्यास व्यक्तीची बुद्धी, स्मरणशक्ती, एकाग्रता कमी होते. मंगळग्रही जास्त अशुभत्व असते. शिक्षण पूर्ण होत नाही.'
  },
  SHANI_MANGAL_CONJUNCTION: {
    id: 15,
    name_en: 'Saturn-Mars Conjunction',
    name_mr: 'शनी-मंगळ युती',
    description_en: 'Saturn-Mars conjunction is a harsh and intensely inauspicious yoga. Its effects vary by house, though benefic combinations may soften the result.',
    description_mr: 'शनी-मंगळ युती हा खडतर व प्रखर अशुभ योग आहे. शुभ ग्रहांच्या शुभ योगाने हे अशुभ योगही सौम्य होऊ शकतात.'
  },
  RAVI_SHANI_ASHUBH_YOGA: {
    id: 16,
    name_en: 'Sun-Saturn Inauspicious Yoga',
    name_mr: 'रवि-शनी अशुभ योग',
    description_en: 'If an inauspicious Sun-Saturn yoga is present, constriction and obstacles may arise in many areas of life. In female horoscopes, marriage may be delayed, spouses may differ strongly in personality and temperament, and the husband may face obstacles in financial progress along with physical troubles.',
    description_mr: 'रवि-शनी अशुभ योग असल्यास सर्वच बाबतीत कुंचबणा होते. स्त्रियांच्या कुंडलीत विवाहास विलंब होतो, पतीपत्नी विजोड व्यक्तिमत्त्व व स्वभावानेही, पतीस आर्थिक उन्नतीत अडथळे येवून शारीरिक त्रास होतो.'
  },
  GURU_SHANI_CONJUNCTION_SPIRITUAL: {
    id: 17,
    name_en: 'Jupiter-Saturn Conjunction in 5th, 9th or 12th',
    name_mr: 'गुरू-शनी युती ५, ९ व १२ स्थानी',
    description_en: 'Jupiter-Saturn conjunction in the 5th, 9th, or 12th house is supportive of spiritual progress.',
    description_mr: 'गुरू-शनी युती ५, ९ व १२ स्थानी आध्यात्मिक प्रगतीस पोषक असते.'
  },
  RAVI_CHANDRA_SHUBH_YOGA: {
    id: 18,
    name_en: 'Sun-Moon Auspicious Yoga',
    name_mr: 'रवि-चंद्र शुभ योग',
    description_en: 'In female horoscopes, an auspicious Sun-Moon yoga may indicate a very good-natured husband, provided both Sun and Moon are not afflicted. In male horoscopes, fortune tends to offer steady support.',
    description_mr: 'स्त्रियांचे पत्रिकेत रवि-चंद्र शुभ योग असल्यास पती अत्यंत सुस्वभावी असतो, पण रवी व चंद्रही दुषित अगर पीडित नकोत. पुरुषांचे पत्रिकेत दैव हा भाग नित्य साथ देतो.'
  },
  PAPAGRAHA_KETU_IN_SHASHTHA: {
    id: 19,
    name_en: 'Malefics and Ketu in 6th House',
    name_mr: 'षष्ठात पापग्रह, केतू',
    description_en: 'If malefic planets and Ketu are placed in the 6th house, they can help destroy enemies and debts, though they may also create certain chronic diseases.',
    description_mr: 'षष्ठात पापग्रह, केतू असतील तर शत्रुनाश व ऋणनाशाला सहाय्यभूत होतात, तसे काही दीर्घ आजारही निर्माण करतात.'
  },
  SHASHTHESH_LAGNESH_PARIVARTAN: {
    id: 20,
    name_en: 'Exchange Yoga between 6th Lord and Ascendant Lord',
    name_mr: 'षष्ठेश लग्नेश परिवर्तन योग',
    description_en: 'If the 6th lord and Ascendant lord are in mutual exchange, it supports progress in medical education.',
    description_mr: 'षष्ठेश लग्नेश परिवर्तन योग वैद्यकीय शिक्षणात प्रगती.'
  },
  SHUBHAGRAHA_IN_SHASHTHA: {
    id: 21,
    name_en: 'Benefic Planets in 6th House',
    name_mr: 'षष्ठात शुभग्रह',
    description_en: 'Even benefic planets in the 6th house can become disease-causing; in female horoscopes, the Moon can be especially troublesome.',
    description_mr: 'षष्ठात शुभग्रहही रोगकारक, स्त्रियांचेबाबत चंद्र फारच दोषकारक असतो.'
  },
  BALAVAN_SHUBHAGRAHA_IN_VYAYA: {
    id: 22,
    name_en: 'Strong Benefic Planet in 12th House excluding 2nd and 11th Lords',
    name_mr: 'व्ययांत बलवान शुभ ग्रह',
    description_en: 'A strong benefic planet in the 12th house, other than the 2nd lord and 11th lord, can support wealth accumulation.',
    description_mr: 'व्ययांत बलवान शुभ ग्रह, धनेश लाभेशाशिवाय, धनसंचय होतो.'
  },
  LABH_BHAVA_ARTHAPRAPTI: {
    id: 23,
    name_en: '11th House Wealth Path Yoga',
    name_mr: 'लाभात शुभराशी किंवा पापराशी योग',
    description_en: 'In the 11th house, benefic sign and benefic planet without malefic aspect can indicate gains through ethical means, while malefic sign and malefic planet under malefic aspect can indicate gains through unethical means.',
    description_mr: 'लाभात शुभराशी व शुभ ग्रह पापग्रह अदृष्टी-नीतिमार्गाने अर्थप्राप्ती, लाभात पापराशी व पापग्रह, पापग्रह दृष्ट-अनीतिमार्गाने अर्थप्राप्ती.'
  },
  MANGAL_IN_KARKA: {
    id: 24,
    name_en: 'Mars in Cancer',
    name_mr: 'कर्क राशीचा मंगळ',
    description_en: 'Mars in Cancer can make the native argumentative and may bring some unpleasant events related to women.',
    description_mr: 'कर्क राशीचा मंगळ स्वभाव वादविवादी असतो व स्त्रिसंबंधी काही अप्रिय घटना घडतात.'
  },
  MANGAL_BUDH_CONJUNCTION: {
    id: 25,
    name_en: 'Mars-Mercury Conjunction',
    name_mr: 'मंगळ बुधसह',
    description_en: 'If Mars is together with Mercury, the nature may become egoistic and arrogant.',
    description_mr: 'मंगळ बुधसह असेल तर स्वभाव अहंकारी गर्विष्ठ असतो.'
  },
  SHUKRA_AHEAD_OF_RAVI_SHUBH: {
    id: 26,
    name_en: 'Venus Ahead of Sun in Auspicious State',
    name_mr: 'शुक्र रविच्या पुढे शुभस्थितीत',
    description_en: 'If Venus is ahead of the Sun and placed in an auspicious state, political authority may be gained.',
    description_mr: 'शुक्र रविच्या पुढे शुभस्थितीत असेल तर राजकीय अधिकार लाभू शकतो.'
  },
  MANGAL_SHUBHSTITI_IN_SHASHTHA: {
    id: 27,
    name_en: 'Auspicious Mars in 6th House',
    name_mr: 'षष्ठात शुभस्थितीत मंगळ',
    description_en: 'If Mars is in an auspicious state in the 6th house, agriculture and animal husbandry can become beneficial.',
    description_mr: 'षष्ठात शुभस्थितीत मंगळ असेल तर शेती व्यवसाय व पशुपालन लाभदायक ठरते.'
  },
  SHUKRA_DASHAMESH_IN_DHANASTHANA: {
    id: 28,
    name_en: 'Venus as 10th Lord in 2nd House',
    name_mr: 'शुक्र दशमेश धनस्थानी',
    description_en: 'If Venus is the 10th lord and is placed in the 2nd house, excellent success may come in hotel and food-service business.',
    description_mr: 'शुक्र दशमेश असून धनस्थानी असेल तर हॉटेल व खानावळीच्या धंद्यात उत्तम यश मिळते.'
  },
  SHUKRA_MANGAL_PAPI_YOGA: {
    id: 29,
    name_en: 'Venus-Mars Conjunction in 1st, 5th, 6th, 7th or 12th',
    name_mr: 'शुक्र मंगळ युती विशिष्ट स्थानी',
    description_en: 'Venus-Mars conjunction in the 1st, 5th, 6th, 7th, or 12th house can indicate sinful tendencies of mind and moral decline.',
    description_mr: 'शुक्र मंगळ युती, १, ५, ६, ७ व १२ स्थानी मन पापी व नैतिक अध:पतन दर्शविते, ती युती अशुभ दृष्टी असू नये.'
  },
  SHANI_CHANDRA_DURGUNKARAK: {
    id: 30,
    name_en: 'Saturn-Moon Conjunction without Benefic Aspect',
    name_mr: 'शनी चंद्र युती शुभदृष्टी नसलेली',
    description_en: 'In female horoscopes, if Saturn-Moon conjunction lacks benefic aspect, it can become productive of bad qualities.',
    description_mr: 'स्त्रियांचे पत्रिकेत शनी चंद्र युती शुभदृष्टी नसेल तर दुर्गुणकारक आहे.'
  },
  MANGAL_JALRASHI_IN_PANCHAM: {
    id: 31,
    name_en: 'Watery-sign Mars in 5th with Benefic Aspect',
    name_mr: 'पंचमात शुभदृष्टीत जलराशीचा मंगळ',
    description_en: 'If Mars of a watery sign is in the 5th house under benefic aspect, it may indicate irresponsibility, addiction, laziness, and lack of mental concentration.',
    description_mr: 'पंचमात शुभदृष्टीत जलराशीचा मंगळ असेल तर बेजबाबदार व्यक्ती, व्यसनाधिनता, आळशीपणा, असून मनाची एकाग्रता नसते.'
  },
  MANGAL_JALRASHI_DOSH_FEMALE: {
    id: 32,
    name_en: 'Unafflicted-beneficless Watery-sign Mars in Female Chart',
    name_mr: 'स्त्रियांचे पत्रिकेत शुभदृष्टीरहित जलराशीचा मंगळ',
    description_en: 'In female horoscopes, watery-sign Mars without benefic aspect should not be in Mercury- or Venus-ruled signs; otherwise it indicates poor intellect.',
    description_mr: 'स्त्रियांचे पत्रिकेत शुभदृष्टीरहित जलराशीचा मंगळ हा बुध व शुक्र ग्रही असू नये, बुद्धी वाईट असते.'
  },
  MANGAL_RAHU_CONJUNCTION: {
    id: 33,
    name_en: 'Mars-Rahu Conjunction',
    name_mr: 'मंगळ-राहू युती',
    description_en: 'Mars-Rahu conjunction is generally very inauspicious in the 4th, 5th, 7th, and 12th houses; generally inauspicious in the 1st, 3rd, 6th, and 10th; and gives mixed results elsewhere.',
    description_mr: 'मंगळ-राहू युती ४, ५, ७, १२ स्थानी साधारण खूप अशुभ; १, ३, ६, १० स्थानी साधारण अशुभ, बाकी स्थानी मिश्र फले देते.'
  },

};

module.exports = {
  YOGA_TYPES
};
