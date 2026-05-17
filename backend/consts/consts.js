const planets = [
  'Surya', 'Chandra', 'Budh', 'Shukra', 'Mangal',
  'Brihaspati', 'Shani', 'Rahu', 'Ketu'
];

const rashiList = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha',
  'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara',
  'Kumbha', 'Meen'
];

const nakshatraList = [
  'Ashwini',
  'Bharani',
  'Krittika',
  'Rohini',
  'Mrigashira',
  'Ardra',
  'Punarvasu',
  'Pushya',
  'Ashlesha',
  'Magha',
  'Poorvaphalguni',
  'Uttaraphalguni',
  'Hasta',
  'Chitra',
  'Swati',
  'Vishakha',
  'Anuradha',
  'Jyeshtha',
  'Mula',
  'Poorvashadha',
  'Uttarashadha',
  'Shravana',
  'Dhanishtha',
  'Shatabhisha',
  'Poorvabhadrapada',
  'Uttarabhadrapada',
  'Revati'
];

const dashaYears = {
  'Surya': 6,
  'Chandra': 10,
  'Mangal': 7,
  'Rahu': 18,
  'Brihaspati': 16,
  'Shani': 19,
  'Budh': 17,
  'Ketu': 7,
  'Shukra': 20
};

// Vimshottari Dasha order
const dashaOrder = ['Ketu', 'Shukra', 'Surya', 'Chandra', 'Mangal', 'Rahu', 'Brihaspati', 'Shani', 'Budh'];



const debilatedSignEffects = [
  {
    planet: 'Surya',
    planet_mr: 'सूर्य',
    rashi: 'Tula',
    rashi_mr: 'तुळ',
    effect_en: 'Lack of self-confidence, indecisiveness',
    effect_mr: 'आत्मविश्वासाचा अभाव, निर्णय घेण्यात असमर्थता',
  },
  {
    planet: 'Chandra',
    planet_mr: 'चंद्र',
    rashi: 'Vrischika',
    rashi_mr: 'वृश्चिक',
    effect_en: 'Mental instability, emotional fluctuations',
    effect_mr: 'मानसिक अस्थिरता, भावनिक चढ-उतार',
  },
  {
    planet: 'Mangal',
    planet_mr: 'मंगळ',
    rashi: 'Karka',
    rashi_mr: 'कर्क',
    effect_en: 'Lack of action orientation, poor work ethic',
    effect_mr: 'कृतीच्या दिशेचा अभाव, कामाची सवय नसणे',
  },
  {
    planet: 'Budh',
    planet_mr: 'बुध',
    rashi: 'Meen',
    rashi_mr: 'मीन',
    effect_en: 'Confused thinking, communication issues',
    effect_mr: 'गोंधळलेली विचारशक्ती, संवादातील समस्या',
  },
  {
    planet: 'Brihaspati',
    planet_mr: 'बृहस्पती',
    rashi: 'Makara',
    rashi_mr: 'मकर',
    effect_en: 'Lack of spirituality and knowledge direction',
    effect_mr: 'आध्यात्मिकतेचा आणि ज्ञानदिशेचा अभाव',
  },
  {
    planet: 'Shukra',
    planet_mr: 'शुक्र',
    rashi: 'Kanya',
    rashi_mr: 'कन्या',
    effect_en: 'Loss of love and aesthetic appreciation',
    effect_mr: 'प्रेम आणि सौंदर्याची जाणीव कमी होणे',
  },
  {
    planet: 'Shani',
    planet_mr: 'शनी',
    rashi: 'Mesha',
    rashi_mr: 'मेष',
    effect_en: 'Lack of discipline, impulsiveness',
    effect_mr: 'शिस्तीचा अभाव, उतावळेपणा',
  },
  {
    planet: 'Rahu',
    planet_mr: 'राहू',
    rashi: 'Vrischika',
    rashi_mr: 'वृश्चिक',
    effect_en: 'Attraction towards wrong directions',
    effect_mr: 'चुकीच्या दिशेकडे आकर्षण',
  },
  {
    planet: 'Ketu',
    planet_mr: 'केतू',
    rashi: 'Vrishabha',
    rashi_mr: 'वृषभ',
    effect_en: 'Lack of spiritual awareness',
    effect_mr: 'आध्यात्मिक जाणीवेचा अभाव',
  },
];

const EXALTATION_DEBILATION_CONDITIONS = [
  { "planet": "Surya (Sun)", "planet_id": 0, "exalted_sign_id": 0, "debilitated_sign_id": 6 },
  { "planet": "Chandra (Moon)", "planet_id": 1, "exalted_sign_id": 1, "debilitated_sign_id": 7 },
  { "planet": "Mangal (Mars)", "planet_id": 4, "exalted_sign_id": 9, "debilitated_sign_id": 3 },
  { "planet": "Budh (Mercury)", "planet_id": 2, "exalted_sign_id": 5, "debilitated_sign_id": 11 },
  { "planet": "Guru (Jupiter)", "planet_id": 5, "exalted_sign_id": 3, "debilitated_sign_id": 9 },
  { "planet": "Shukra (Venus)", "planet_id": 3, "exalted_sign_id": 11, "debilitated_sign_id": 5 },
  { "planet": "Shani (Saturn)", "planet_id": 6, "exalted_sign_id": 6, "debilitated_sign_id": 0 },
  { "planet": "Rahu", "planet_id": 101, "exalted_sign_id": 2, "debilitated_sign_id": 8 },
  { "planet": "Ketu", "planet_id": 102, "exalted_sign_id": 8, "debilitated_sign_id": 2 }
];


const exaltedSignEffects = [
  {
    planet: 'Surya',
    planet_mr: 'सूर्य',
    rashi: 'Mesha',
    rashi_mr: 'मेष',
    effect_en: 'Increases self-confidence, leadership qualities',
    effect_mr: 'आत्मविश्वास आणि नेतृत्वगुण वाढतात',
  },
  {
    planet: 'Chandra',
    planet_mr: 'चंद्र',
    rashi: 'Vrishabha',
    rashi_mr: 'वृषभ',
    effect_en: 'Mental stability, peace, and prosperity',
    effect_mr: 'मानसिक स्थिरता, शांती आणि समृद्धी',
  },
  {
    planet: 'Mangal',
    planet_mr: 'मंगळ',
    rashi: 'Makara',
    rashi_mr: 'मकर',
    effect_en: 'Courage, discipline, and perseverance',
    effect_mr: 'धैर्य, शिस्त आणि चिकाटी',
  },
  {
    planet: 'Budh',
    planet_mr: 'बुध',
    rashi: 'Kanya',
    rashi_mr: 'कन्या',
    effect_en: 'Sharp intellect, clear thinking, cleverness',
    effect_mr: 'तीक्ष्ण बुद्धिमत्ता, स्पष्ट विचार, चातुर्य',
  },
  {
    planet: 'Brihaspati',
    planet_mr: 'बृहस्पती',
    rashi: 'Karka',
    rashi_mr: 'कर्क',
    effect_en: 'Spirituality, compassion, knowledge',
    effect_mr: 'आध्यात्मिकता, करुणा, ज्ञान',
  },
  {
    planet: 'Shukra',
    planet_mr: 'शुक्र',
    rashi: 'Meen',
    rashi_mr: 'मीन',
    effect_en: 'Love, beauty, art, and happiness',
    effect_mr: 'प्रेम, सौंदर्य, कला आणि आनंद',
  },
  {
    planet: 'Shani',
    planet_mr: 'शनी',
    rashi: 'Tula',
    rashi_mr: 'तुळ',
    effect_en: 'Justice, discipline, responsibility',
    effect_mr: 'न्याय, शिस्त, जबाबदारी',
  },
  {
    planet: 'Rahu',
    planet_mr: 'राहू',
    rashi: 'Vrishabha',
    rashi_mr: 'वृषभ',
    effect_en: 'Material comfort, cleverness',
    effect_mr: 'भौतिक सुखसोयी, चातुर्य',
  },
  {
    planet: 'Ketu',
    planet_mr: 'केतू',
    rashi: 'Vrischika',
    rashi_mr: 'वृश्चिक',
    effect_en: 'Spiritual awakening, occult knowledge',
    effect_mr: 'आध्यात्मिक जागृती, गूढ ज्ञान',
  },
];

const planetTranslations = {
  Surya: { en: 'Surya', mr: 'सूर्य' },
  Chandra: { en: 'Chandra', mr: 'चंद्र' },
  Budh: { en: 'Budh', mr: 'बुध' },
  Shukra: { en: 'Shukra', mr: 'शुक्र' },
  Mangal: { en: 'Mangal', mr: 'मंगळ' },
  Brihaspati: { en: 'Brihaspati', mr: 'बृहस्पती' },
  Shani: { en: 'Shani', mr: 'शनी' },
  Rahu: { en: 'Rahu', mr: 'राहू' },
  Ketu: { en: 'Ketu', mr: 'केतू' },
};

const rashiTranslations = {
  Mesha: { en: 'Mesha', mr: 'मेष' },
  Vrishabha: { en: 'Vrishabha', mr: 'वृषभ' },
  Mithuna: { en: 'Mithuna', mr: 'मिथुन' },
  Karka: { en: 'Karka', mr: 'कर्क' },
  Simha: { en: 'Simha', mr: 'सिंह' },
  Kanya: { en: 'Kanya', mr: 'कन्या' },
  Tula: { en: 'Tula', mr: 'तुला' },
  Vrischika: { en: 'Vrischika', mr: 'वृश्चिक' },
  Dhanu: { en: 'Dhanu', mr: 'धनु' },
  Makara: { en: 'Makara', mr: 'मकर' },
  Kumbha: { en: 'Kumbha', mr: 'कुंभ' },
  Meen: { en: 'Meen', mr: 'मीन' },
};

const pritishadashtkam = [
  [5, 12],
  [7, 2],
  [11, 6],
  [3, 10],
  [1, 8],
  [9, 4],
]

const mrityushadashtkam = [
  [1, 6],
  [7, 12],
  [3, 8],
  [10, 5],
  [11, 4],
  [9, 2]
]

const shubhdvidadashakam = [
  [12, 1],
  [4, 5],
  [5, 6],
  [10, 11],
  [7, 6],
  [9, 8],
  [2, 3]
]

const ashubhdvidadashakam = [
  [11, 12],
  [1, 2],
  [3, 4],
  [7, 8],
  [9, 10]
]

const shubhnavpanchmam = [
  [1, 5],
  [2, 6],
  [3, 7],
  [5, 9],
  [7, 11],
  [8, 12],
  [9, 1],
  [10, 2]
]

const neshtnavpanchamam = [
  [4, 8],
  [6, 10],
  [11, 3],
  [12, 4]
]

const janmAkshar = [
  {
    "nakshatra_en": "Ashwini",
    "nakshatra_mr": "अश्विनी",
    "charan": 1,
    "nakshatra_id": 1,
    "janmakshar": "चु"
  },
  {
    "nakshatra_en": "Ashwini",
    "nakshatra_mr": "अश्विनी",
    "charan": 2,
    "nakshatra_id": 1,
    "janmakshar": "चे"
  },
  {
    "nakshatra_en": "Ashwini",
    "nakshatra_mr": "अश्विनी",
    "charan": 3,
    "nakshatra_id": 1,
    "janmakshar": "चो"
  },
  {
    "nakshatra_en": "Ashwini",
    "nakshatra_mr": "अश्विनी",
    "charan": 4,
    "nakshatra_id": 1,
    "janmakshar": "ला"
  },
  {
    "nakshatra_en": "Bharani",
    "nakshatra_mr": "भरणी",
    "charan": 1,
    "nakshatra_id": 2,
    "janmakshar": "ली"
  },
  {
    "nakshatra_en": "Bharani",
    "nakshatra_mr": "भरणी",
    "charan": 2,
    "nakshatra_id": 2,
    "janmakshar": "लू"
  },
  {
    "nakshatra_en": "Bharani",
    "nakshatra_mr": "भरणी",
    "charan": 3,
    "nakshatra_id": 2,
    "janmakshar": "ले"
  },
  {
    "nakshatra_en": "Bharani",
    "nakshatra_mr": "भरणी",
    "charan": 4,
    "nakshatra_id": 2,
    "janmakshar": "लो"
  },
  {
    "nakshatra_en": "Krittika",
    "nakshatra_mr": "कृत्तिका",
    "charan": 1,
    "nakshatra_id": 3,
    "janmakshar": "आ  "
  },
  {
    "nakshatra_en": "Krittika",
    "nakshatra_mr": "कृत्तिका",
    "charan": 2,
    "nakshatra_id": 3,
    "janmakshar": "इ"
  },
  {
    "nakshatra_en": "Krittika",
    "nakshatra_mr": "कृत्तिका",
    "charan": 3,
    "nakshatra_id": 3,
    "janmakshar": "उ"
  },
  {
    "nakshatra_en": "Krittika",
    "nakshatra_mr": "कृत्तिका",
    "charan": 4,
    "nakshatra_id": 3,
    "janmakshar": "ए"
  },
  {
    "nakshatra_en": "Rohini",
    "nakshatra_mr": "रोहिणी",
    "charan": 1,
    "nakshatra_id": 4,
    "janmakshar": "ओ"
  },
  {
    "nakshatra_en": "Rohini",
    "nakshatra_mr": "रोहिणी",
    "charan": 2,
    "nakshatra_id": 4,
    "janmakshar": "वा"
  },
  {
    "nakshatra_en": "Rohini",
    "nakshatra_mr": "रोहिणी",
    "charan": 3,
    "nakshatra_id": 4,
    "janmakshar": "वी"
  },
  {
    "nakshatra_en": "Rohini",
    "nakshatra_mr": "रोहिणी",
    "charan": 4,
    "nakshatra_id": 4,
    "janmakshar": "वू"
  },
  {
    "nakshatra_en": "Mrigashira",
    "nakshatra_mr": "मृगशीर्ष",
    "charan": 1,
    "nakshatra_id": 5,
    "janmakshar": "वे"
  },
  {
    "nakshatra_en": "Mrigashira",
    "nakshatra_mr": "मृगशीर्ष",
    "charan": 2,
    "nakshatra_id": 5,
    "janmakshar": "वो"
  },
  {
    "nakshatra_en": "Mrigashira",
    "nakshatra_mr": "मृगशीर्ष",
    "charan": 3,
    "nakshatra_id": 5,
    "janmakshar": "का"
  },
  {
    "nakshatra_en": "Mrigashira",
    "nakshatra_mr": "मृगशीर्ष",
    "charan": 4,
    "nakshatra_id": 5,
    "janmakshar": "की"
  },
  {
    "nakshatra_en": "Ardra",
    "nakshatra_mr": "आर्द्रा",
    "charan": 1,
    "nakshatra_id": 6,
    "janmakshar": "कू"
  },
  {
    "nakshatra_en": "Ardra",
    "nakshatra_mr": "आर्द्रा",
    "charan": 2,
    "nakshatra_id": 6,
    "janmakshar": "घ"
  },
  {
    "nakshatra_en": "Ardra",
    "nakshatra_mr": "आर्द्रा",
    "charan": 3,
    "nakshatra_id": 6,
    "janmakshar": "ग"
  },
  {
    "nakshatra_en": "Ardra",
    "nakshatra_mr": "आर्द्रा",
    "charan": 4,
    "nakshatra_id": 6,
    "janmakshar": "छा"
  },
  {
    "nakshatra_en": "Punarvasu",
    "nakshatra_mr": "पुनर्वसू",
    "charan": 1,
    "nakshatra_id": 7,
    "janmakshar": "के"
  },
  {
    "nakshatra_en": "Punarvasu",
    "nakshatra_mr": "पुनर्वसू",
    "charan": 2,
    "nakshatra_id": 7,
    "janmakshar": "को"
  },
  {
    "nakshatra_en": "Punarvasu",
    "nakshatra_mr": "पुनर्वसू",
    "charan": 3,
    "nakshatra_id": 7,
    "janmakshar": "हा"
  },
  {
    "nakshatra_en": "Punarvasu",
    "nakshatra_mr": "पुनर्वसू",
    "charan": 4,
    "nakshatra_id": 7,
    "janmakshar": "ही"
  },
  {
    "nakshatra_en": "Pushya",
    "nakshatra_mr": "पुष्य",
    "charan": 1,
    "nakshatra_id": 8,
    "janmakshar": "हू"
  },
  {
    "nakshatra_en": "Pushya",
    "nakshatra_mr": "पुष्य",
    "charan": 2,
    "nakshatra_id": 8,
    "janmakshar": "हे"
  },
  {
    "nakshatra_en": "Pushya",
    "nakshatra_mr": "पुष्य",
    "charan": 3,
    "nakshatra_id": 8,
    "janmakshar": "हो"
  },
  {
    "nakshatra_en": "Pushya",
    "nakshatra_mr": "पुष्य",
    "charan": 4,
    "nakshatra_id": 8,
    "janmakshar": "डा"
  },
  {
    "nakshatra_en": "Ashlesha",
    "nakshatra_mr": "आश्लेषा",
    "charan": 1,
    "nakshatra_id": 9,
    "janmakshar": "डी"
  },
  {
    "nakshatra_en": "Ashlesha",
    "nakshatra_mr": "आश्लेषा",
    "charan": 2,
    "nakshatra_id": 9,
    "janmakshar": "डू"
  },
  {
    "nakshatra_en": "Ashlesha",
    "nakshatra_mr": "आश्लेषा",
    "charan": 3,
    "nakshatra_id": 9,
    "janmakshar": "डे"
  },
  {
    "nakshatra_en": "Ashlesha",
    "nakshatra_mr": "आश्लेषा",
    "charan": 4,
    "nakshatra_id": 9,
    "janmakshar": "डो"
  },
  {
    "nakshatra_en": "Magha",
    "nakshatra_mr": "मघा",
    "charan": 1,
    "nakshatra_id": 10,
    "janmakshar": "मा"
  },
  {
    "nakshatra_en": "Magha",
    "nakshatra_mr": "मघा",
    "charan": 2,
    "nakshatra_id": 10,
    "janmakshar": "मी"
  },
  {
    "nakshatra_en": "Magha",
    "nakshatra_mr": "मघा",
    "charan": 3,
    "nakshatra_id": 10,
    "janmakshar": "मू"
  },
  {
    "nakshatra_en": "Magha",
    "nakshatra_mr": "मघा",
    "charan": 4,
    "nakshatra_id": 10,
    "janmakshar": "मे"
  },
  {
    "nakshatra_en": "Purva Phalguni",
    "nakshatra_mr": "पूर्वा फाल्गुनी",
    "charan": 1,
    "nakshatra_id": 11,
    "janmakshar": "मो"
  },
  {
    "nakshatra_en": "Purva Phalguni",
    "nakshatra_mr": "पूर्वा फाल्गुनी",
    "charan": 2,
    "nakshatra_id": 11,
    "janmakshar": "टा"
  },
  {
    "nakshatra_en": "Purva Phalguni",
    "nakshatra_mr": "पूर्वा फाल्गुनी",
    "charan": 3,
    "nakshatra_id": 11,
    "janmakshar": "टी"
  },
  {
    "nakshatra_en": "Purva Phalguni",
    "nakshatra_mr": "पूर्वा फाल्गुनी",
    "charan": 4,
    "nakshatra_id": 11,
    "janmakshar": "टू"
  },
  {
    "nakshatra_en": "Uttara Phalguni",
    "nakshatra_mr": "उत्तरा फाल्गुनी",
    "charan": 1,
    "nakshatra_id": 12,
    "janmakshar": "टे"
  },
  {
    "nakshatra_en": "Uttara Phalguni",
    "nakshatra_mr": "उत्तरा फाल्गुनी",
    "charan": 2,
    "nakshatra_id": 12,
    "janmakshar": "टो"
  },
  {
    "nakshatra_en": "Uttara Phalguni",
    "nakshatra_mr": "उत्तरा फाल्गुनी",
    "charan": 3,
    "nakshatra_id": 12,
    "janmakshar": "पा"
  },
  {
    "nakshatra_en": "Uttara Phalguni",
    "nakshatra_mr": "उत्तरा फाल्गुनी",
    "charan": 4,
    "nakshatra_id": 12,
    "janmakshar": "पी"
  },
  {
    "song_en": "Hasta",
    "nakshatra_mr": "हस्त",
    "charan": 1,
    "nakshatra_id": 13,
    "janmakshar": "पु"
  },
  {
    "nakshatra_en": "Hasta",
    "nakshatra_mr": "हस्त",
    "charan": 2,
    "nakshatra_id": 13,
    "janmakshar": "षा"
  },
  {
    "nakshatra_en": "Hasta",
    "nakshatra_mr": "हस्त",
    "charan": 3,
    "nakshatra_id": 13,
    "janmakshar": "णा"
  },
  {
    "nakshatra_en": "Hasta",
    "nakshatra_mr": "हस्त",
    "charan": 4,
    "nakshatra_id": 13,
    "janmakshar": "ठा"
  },
  {
    "nakshatra_en": "Chitra",
    "nakshatra_mr": "चित्रा",
    "charan": 1,
    "nakshatra_id": 14,
    "janmakshar": "पे"
  },
  {
    "nakshatra_en": "Chitra",
    "nakshatra_mr": "चित्रा",
    "charan": 2,
    "nakshatra_id": 14,
    "janmakshar": "पो"
  },
  {
    "nakshatra_en": "Chitra",
    "nakshatra_mr": "चित्रा",
    "charan": 3,
    "nakshatra_id": 14,
    "janmakshar": "रा"
  },
  {
    "nakshatra_en": "Chitra",
    "nakshatra_mr": "चित्रा",
    "charan": 4,
    "nakshatra_id": 14,
    "janmakshar": "री"
  },
  {
    "nakshatra_en": "Swati",
    "nakshatra_mr": "स्वाती",
    "charan": 1,
    "nakshatra_id": 15,
    "janmakshar": "रू"
  },
  {
    "nakshatra_en": "Swati",
    "nakshatra_mr": "स्वाती",
    "charan": 2,
    "nakshatra_id": 15,
    "janmakshar": "रे"
  },
  {
    "nakshatra_en": "Swati",
    "nakshatra_mr": "स्वाती",
    "charan": 3,
    "nakshatra_id": 15,
    "janmakshar": "रो"
  },
  {
    "nakshatra_en": "Swati",
    "nakshatra_mr": "स्वाती",
    "charan": 4,
    "nakshatra_id": 15,
    "janmakshar": "ता"
  },
  {
    "nakshatra_en": "Vishakha",
    "nakshatra_mr": "विशाखा",
    "charan": 1,
    "nakshatra_id": 16,
    "janmakshar": "ती"
  },
  {
    "nakshatra_en": "Vishakha",
    "nakshatra_mr": "विशाखा",
    "charan": 2,
    "nakshatra_id": 16,
    "janmakshar": "तू"
  },
  {
    "nakshatra_en": "Vishakha",
    "nakshatra_mr": "विशाखा",
    "charan": 3,
    "nakshatra_id": 16,
    "janmakshar": "ते"
  },
  {
    "nakshatra_en": "Vishakha",
    "nakshatra_mr": "विशाखा",
    "charan": 4,
    "nakshatra_id": 16,
    "janmakshar": "तो"
  },
  {
    "nakshatra_en": "Anuradha",
    "nakshatra_mr": "अनुराधा",
    "charan": 1,
    "nakshatra_id": 17,
    "janmakshar": "ना"
  },
  {
    "nakshatra_en": "Anuradha",
    "nakshatra_mr": "अनुराधा",
    "charan": 2,
    "nakshatra_id": 17,
    "janmakshar": "नी"
  },
  {
    "nakshatra_en": "Anuradha",
    "nakshatra_mr": "अनुराधा",
    "charan": 3,
    "nakshatra_id": 17,
    "janmakshar": "नू"
  },
  {
    "nakshatra_en": "Anuradha",
    "nakshatra_mr": "अनुराधा",
    "charan": 4,
    "nakshatra_id": 17,
    "janmakshar": "ने"
  },
  {
    "nakshatra_en": "Jyeshtha",
    "nakshatra_mr": "ज्येष्ठा",
    "charan": 1,
    "nakshatra_id": 18,
    "janmakshar": "नो"
  },
  {
    "nakshatra_en": "Jyeshtha",
    "nakshatra_mr": "ज्येष्ठा",
    "charan": 2,
    "nakshatra_id": 18,
    "janmakshar": "या"
  },
  {
    "nakshatra_en": "Jyeshtha",
    "nakshatra_mr": "ज्येष्ठा",
    "charan": 3,
    "nakshatra_id": 18,
    "janmakshar": "यी"
  },
  {
    "nakshatra_en": "Jyeshtha",
    "nakshatra_mr": "ज्येष्ठा",
    "charan": 4,
    "nakshatra_id": 18,
    "janmakshar": "यू"
  },
  {
    "nakshatra_en": "Mula",
    "nakshatra_mr": "मूळ",
    "charan": 1,
    "nakshatra_id": 19,
    "janmakshar": "ये"
  },
  {
    "nakshatra_en": "Mula",
    "nakshatra_mr": "मूळ",
    "charan": 2,
    "nakshatra_id": 19,
    "janmakshar": "यो"
  },
  {
    "nakshatra_en": "Mula",
    "nakshatra_mr": "मूळ",
    "charan": 3,
    "nakshatra_id": 19,
    "janmakshar": "भा"
  },
  {
    "nakshatra_en": "Mula",
    "nakshatra_mr": "मूळ",
    "charan": 4,
    "nakshatra_id": 19,
    "janmakshar": "भी"
  },
  {
    "nakshatra_en": "Purva Ashadha",
    "nakshatra_mr": "पूर्वाषाढा",
    "charan": 1,
    "nakshatra_id": 20,
    "janmakshar": "भू"
  },
  {
    "nakshatra_en": "Purva Ashadha",
    "nakshatra_mr": "पूर्वाषाढा",
    "charan": 2,
    "nakshatra_id": 20,
    "janmakshar": "धा"
  },
  {
    "nakshatra_en": "Purva Ashadha",
    "nakshatra_mr": "पूर्वाषाढा",
    "charan": 3,
    "nakshatra_id": 20,
    "janmakshar": "फा"
  },
  {
    "nakshatra_en": "Purva Ashadha",
    "nakshatra_mr": "पूर्वाषाढा",
    "charan": 4,
    "nakshatra_id": 20,
    "janmakshar": "ढा"
  },
  {
    "nakshatra_en": "Uttara Ashadha",
    "nakshatra_mr": "उत्तराषाढा",
    "charan": 1,
    "nakshatra_id": 21,
    "janmakshar": "भे"
  },
  {
    "nakshatra_en": "Uttara Ashadha",
    "nakshatra_mr": "उत्तराषाढा",
    "charan": 2,
    "nakshatra_id": 21,
    "janmakshar": "भो"
  },
  {
    "nakshatra_en": "Uttara Ashadha",
    "nakshatra_mr": "उत्तराषाढा",
    "charan": 3,
    "nakshatra_id": 21,
    "janmakshar": "जा"
  },
  {
    "nakshatra_en": "Uttara Ashadha",
    "nakshatra_mr": "उत्तराषाढा",
    "charan": 4,
    "nakshatra_id": 21,
    "janmakshar": "जी"
  },
  {
    "nakshatra_en": "Shravana",
    "nakshatra_mr": "श्रवण",
    "charan": 1,
    "nakshatra_id": 22,
    "janmakshar": "खी"
  },
  {
    "nakshatra_en": "Shravana",
    "nakshatra_mr": "श्रवण",
    "charan": 2,
    "nakshatra_id": 22,
    "janmakshar": "खू"
  },
  {
    "nakshatra_en": "Shravana",
    "nakshatra_mr": "श्रवण",
    "charan": 3,
    "nakshatra_id": 22,
    "janmakshar": "खे"
  },
  {
    "nakshatra_en": "Shravana",
    "nakshatra_mr": "श्रवण",
    "charan": 4,
    "nakshatra_id": 22,
    "janmakshar": "खो"
  },
  {
    "nakshatra_en": "Dhanishta",
    "nakshatra_mr": "धनिष्ठा",
    "charan": 1,
    "nakshatra_id": 23,
    "janmakshar": "गा"
  },
  {
    "nakshatra_en": "Dhanishta",
    "nakshatra_mr": "धनिष्ठा",
    "charan": 2,
    "nakshatra_id": 23,
    "janmakshar": "गी"
  },
  {
    "nakshatra_en": "Dhanishta",
    "nakshatra_mr": "धनिष्ठा",
    "charan": 3,
    "nakshatra_id": 23,
    "janmakshar": "गू"
  },
  {
    "nakshatra_en": "Dhanishta",
    "nakshatra_mr": "धनिष्ठा",
    "charan": 4,
    "nakshatra_id": 23,
    "janmakshar": "गे"
  },
  {
    "nakshatra_en": "Shatabhisha",
    "nakshatra_mr": "शततारका",
    "charan": 1,
    "nakshatra_id": 24,
    "janmakshar": "गो"
  },
  {
    "nakshatra_en": "Shatabhisha",
    "nakshatra_mr": "शततारका",
    "charan": 2,
    "nakshatra_id": 24,
    "janmakshar": "सा"
  },
  {
    "nakshatra_en": "Shatabhisha",
    "nakshatra_mr": "शततारका",
    "charan": 3,
    "nakshatra_id": 24,
    "janmakshar": "सी"
  },
  {
    "nakshatra_en": "Shatabhisha",
    "nakshatra_mr": "शततारका",
    "charan": 4,
    "nakshatra_id": 24,
    "janmakshar": "सू"
  },
  {
    "nakshatra_en": "Purva Bhadrapada",
    "nakshatra_mr": "पूर्वा भाद्रपदा",
    "charan": 1,
    "nakshatra_id": 25,
    "janmakshar": "से"
  },
  {
    "nakshatra_en": "Purva Bhadrapada",
    "nakshatra_mr": "पूर्वा भाद्रपदा",
    "charan": 2,
    "nakshatra_id": 25,
    "janmakshar": "सो"
  },
  {
    "nakshatra_en": "Purva Bhadrapada",
    "nakshatra_mr": "पूर्वा भाद्रपदा",
    "charan": 3,
    "nakshatra_id": 25,
    "janmakshar": "दा"
  },
  {
    "nakshatra_en": "Purva Bhadrapada",
    "nakshatra_mr": "पूर्वा भाद्रपदा",
    "charan": 4,
    "nakshatra_id": 25,
    "janmakshar": "दी"
  },
  {
    "nakshatra_en": "Uttara Bhadrapada",
    "nakshatra_mr": "उत्तरा भाद्रपदा",
    "charan": 1,
    "nakshatra_id": 26,
    "janmakshar": "दू"
  },
  {
    "nakshatra_en": "Uttara Bhadrapada",
    "nakshatra_mr": "उत्तरा भाद्रपदा",
    "charan": 2,
    "nakshatra_id": 26,
    "janmakshar": "झा "
  },
  {
    "nakshatra_en": "Uttara Bhadrapada",
    "nakshatra_mr": "उत्तरा भाद्रपदा",
    "charan": 3,
    "nakshatra_id": 26,
    "janmakshar": "ज्ञा "
  },
  {
    "nakshatra_en": "Uttara Bhadrapada",
    "nakshatra_mr": "उत्तरा भाद्रपदा",
    "charan": 4,
    "nakshatra_id": 26,
    "janmakshar": "था "
  },
  {
    "nakshatra_en": "Revati",
    "nakshatra_mr": "रेवती",
    "charan": 1,
    "nakshatra_id": 27,
    "janmakshar": "दे"
  },
  {
    "nakshatra_en": "Revati",
    "nakshatra_mr": "रेवती",
    "charan": 2,
    "nakshatra_id": 27,
    "janmakshar": "दो"
  },
  {
    "nakshatra_en": "Revati",
    "nakshatra_mr": "रेवती",
    "charan": 3,
    "nakshatra_id": 27,
    "janmakshar": "चा"
  },
  {
    "nakshatra_en": "Revati",
    "nakshatra_mr": "रेवती",
    "charan": 4,
    "nakshatra_id": 27,
    "janmakshar": "ची"
  }
]

const ASPECTS_CONFIG = [
  { "planet_name": "Sun", "planet_id": 0, "first": [3, 10], "second": [5, 9], "third": [4, 8], "complete": [7] },
  { "planet_name": "Moon", "planet_id": 1, "first": [3, 10], "second": [5, 9], "third": [4, 8], "complete": [7] },
  { "planet_name": "Mars", "planet_id": 4, "first": [3, 10], "second": [5, 9], "third": [0], "complete": [4, 8, 7] },
  { "planet_name": "Mercury", "planet_id": 2, "first": [3, 10], "second": [5, 9], "third": [4, 8], "complete": [7] },
  { "planet_name": "Jupiter", "planet_id": 5, "first": [3, 10], "second": [0], "third": [4, 8], "complete": [5, 9, 7] },
  { "planet_name": "Venus", "planet_id": 3, "first": [3, 10], "second": [5, 9], "third": [4, 8], "complete": [7] },
  { "planet_name": "Saturn", "planet_id": 6, "first": [0], "second": [5, 9], "third": [4, 8], "complete": [3, 10, 7] },
  { "planet_name": "Rahu", "planet_id": 101, "first": [3, 10], "second": [5, 9], "third": [4, 8], "complete": [7] },
  { "planet_name": "Ketu", "planet_id": 102, "first": [3, 10], "second": [5, 9], "third": [4, 8], "complete": [7] }
];

const PLANET_NAME_ID_MAP = {
  MOON: 1,
  SUN: 0,
  RAHU: 101
}


module.exports = {
  planets,
  rashiList,
  debilatedSignEffects,
  exaltedSignEffects,
  planetTranslations,
  rashiTranslations,
  nakshatraList,
  dashaOrder,
  dashaYears,
  pritishadashtkam,
  mrityushadashtkam,
  shubhdvidadashakam,
  ashubhdvidadashakam,
  shubhnavpanchmam,
  neshtnavpanchamam, EXALTATION_DEBILATION_CONDITIONS,
  janmAkshar, ASPECTS_CONFIG,
  PLANET_NAME_ID_MAP
};  