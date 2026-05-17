import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_title": "Kundali Reader",
      "kundali": "Kundali",
      "nakshatras": "Nakshatras",
      "nakshatras_title": "Nakshatras Information",
      "nakshatras_intro": "Nakshatras are the 27 divisions of the sky in Vedic astrology. Each Nakshatra has its own deity and characteristics.",
      "deity": "Deity",
      "description": "Description",
      "back": "Back",
      "characteristics": "Characteristics",
      "compatibility": "Compatibility",
      "element": "Element",
      "ruling_planet": "Ruling Planet",
      "upload_title": "Upload your Kundali PDF",
      "submit": "Submit",
      "processing": "Processing...",
      "debilitated": "Debilitated Sign Effects",
      "exalted": "Exalted Sign Effects",
      "planet": "Planet",
      "rashi": "Rashi",
      "effect": "Effect",
      "no_results": "No results found in the PDF.",
      "language": "Language",
      "english": "English",
      "marathi": "Marathi",
      "login": "Login",
      "signup": "Signup",
      "query": "Query",
      "logout": "Logout",
      "exalted_and_debilitated": "Exalted & Debilitated Results",
      "mahadasha": "Mahadasha",
      "planet_positions": "Planet Positions"
    }
  },
  mr: {
    translation: {
      "app_title": "कुंडलीवाचक",
      "kundali": "कुंडली",
      "nakshatras": "नक्षत्रे",
      "nakshatras_title": "नक्षत्र माहिती",
      "nakshatras_intro": "नक्षत्रे ही वैदिक ज्योतिषातील आकाशाची 27 विभाग आहेत. प्रत्येक नक्षत्राचे स्वतःचे देवता आणि वैशिष्ट्ये आहेत.",
      "deity": "देवता",
      "description": "वर्णन",
      "back": "मागे",
      "characteristics": "वैशिष्ट्ये",
      "compatibility": "सुसंगतता",
      "element": "तत्त्व",
      "ruling_planet": "शासक ग्रह",
      "upload_title": "आपली कुंडली PDF अपलोड करा",
      "submit": "सबमिट",
      "processing": "प्रक्रिया सुरू आहे...",
      "debilitated": "नीच राशीचे परिणाम",
      "exalted": "उच्च राशीचे परिणाम",
      "planet": "ग्रह",
      "rashi": "राशी",
      "effect": "परिणाम",
      "no_results": "PDF मध्ये कोणतेही परिणाम आढळले नाहीत.",
      "language": "भाषा",
      "english": "इंग्रजी",
      "marathi": "मराठी",
      "login": "लॉगिन",
      "signup": "साइन अप",
      "query": "प्रश्न",
      "logout": "लॉगआउट"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "mr",
    fallbackLng: "mr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 