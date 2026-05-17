import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../App.css';

const NakshatraDetail = ({ language }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // The nakshatra data is passed via route state
  const nakshatra = location.state?.nakshatra;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const nakshatraDetails = {
    Ashwini: {
      name: 'Ashwini',
      name_mr: 'अश्विनी',
      deity: 'Ashwini Kumaras',
      deity_mr: 'अश्विनी कुमार',
      description: 'First Nakshatra, represents new beginnings',
      description_mr: 'पहिली नक्षत्र, नवीन सुरुवात दर्शवते',
      characteristics: 'Quick, energetic, healing abilities, new ventures',
      characteristics_mr: 'वेगवान, ऊर्जावान, उपचार क्षमता, नवीन उपक्रम',
      compatibility: 'Bharani, Krittika, Rohini',
      compatibility_mr: 'भरणी, कृत्तिका, रोहिणी',
      element: 'Fire',
      element_mr: 'अग्नी',
      rulingPlanet: 'Ketu',
      rulingPlanet_mr: 'केतू',
      longDescription: "Ashwini is the first Nakshatra in the zodiac, spanning from 0°00' to 13°20' in Aries. It is symbolized by a horse's head and represents the beginning of all things. People born under this Nakshatra are known for their quick thinking, healing abilities, and pioneering spirit.",
      longDescription_mr: "अश्विनी ही राशिचक्रातील पहिली नक्षत्र आहे, मेष राशीत 0°00' ते 13°20' पर्यंत पसरलेली आहे. ही घोड्याच्या डोक्याने दर्शविली जाते आणि सर्व गोष्टींची सुरुवात दर्शवते. या नक्षत्राखाली जन्मलेले लोक त्यांच्या वेगवान विचार, उपचार क्षमता आणि अग्रगण्य भावनेसाठी ओळखले जातात."
    },
    Bharani: {
      name: 'Bharani',
      name_mr: 'भरणी',
      deity: 'Yama',
      deity_mr: 'यम',
      description: 'Second Nakshatra, represents transformation',
      description_mr: 'दुसरी नक्षत्र, बदल दर्शवते',
      characteristics: 'Transformative, justice-oriented, disciplined',
      characteristics_mr: 'परिवर्तनशील, न्यायप्रिय, शिस्तबद्ध',
      compatibility: 'Ashwini, Krittika, Rohini',
      compatibility_mr: 'अश्विनी, कृत्तिका, रोहिणी',
      element: 'Earth',
      element_mr: 'पृथ्वी',
      rulingPlanet: 'Venus',
      rulingPlanet_mr: 'शुक्र',
      longDescription: "Bharani is the second Nakshatra, spanning from 13°20' to 26°40' in Aries. It is symbolized by the female reproductive organ and represents the power of transformation and justice. People born under this Nakshatra are known for their strong sense of justice and transformative abilities.",
      longDescription_mr: "भरणी ही दुसरी नक्षत्र आहे, मेष राशीत 13°20' ते 26°40' पर्यंत पसरलेली आहे. ही स्त्री प्रजनन अवयवाने दर्शविली जाते आणि बदल आणि न्यायाची शक्ती दर्शवते. या नक्षत्राखाली जन्मलेले लोक त्यांच्या मजबूत न्यायभावना आणि परिवर्तन क्षमतेसाठी ओळखले जातात."
    },
    Krittika: {
      name: 'Krittika',
      name_mr: 'कृत्तिका',
      deity: 'Agni',
      deity_mr: 'अग्नी',
      description: 'Third Nakshatra, represents purification',
      description_mr: 'तिसरी नक्षत्र, शुद्धीकरण दर्शवते',
      characteristics: 'Purifying, sharp, leadership qualities',
      characteristics_mr: 'शुद्धीकरण, तीक्ष्ण, नेतृत्वगुण',
      compatibility: 'Ashwini, Bharani, Rohini',
      compatibility_mr: 'अश्विनी, भरणी, रोहिणी',
      element: 'Fire',
      element_mr: 'अग्नी',
      rulingPlanet: 'Sun',
      rulingPlanet_mr: 'सूर्य',
      longDescription: "Krittika is the third Nakshatra, spanning from 26°40' in Aries to 10°00' in Taurus. It is symbolized by a razor or flame and represents purification and sharpness. People born under this Nakshatra are known for their sharp intellect and leadership qualities.",
      longDescription_mr: "कृत्तिका ही तिसरी नक्षत्र आहे, मेष राशीत 26°40' ते वृषभ राशीत 10°00' पर्यंत पसरलेली आहे. ही रेझर किंवा ज्योतीने दर्शविली जाते आणि शुद्धीकरण आणि तीक्ष्णता दर्शवते. या नक्षत्राखाली जन्मलेले लोक त्यांच्या तीक्ष्ण बुद्धिमत्ता आणि नेतृत्वगुणांसाठी ओळखले जातात."
    },
    Rohini: {
      name: 'Rohini',
      name_mr: 'रोहिणी',
      deity: 'Brahma',
      deity_mr: 'ब्रह्मा',
      description: 'Fourth Nakshatra, represents growth and fertility',
      description_mr: 'चौथी नक्षत्र, वाढ आणि सुफलता दर्शवते',
      characteristics: 'Fertile, creative, artistic, growth-oriented',
      characteristics_mr: 'सुफल, सर्जनशील, कलात्मक, वाढीची दिशा',
      compatibility: 'Ashwini, Bharani, Krittika',
      compatibility_mr: 'अश्विनी, भरणी, कृत्तिका',
      element: 'Earth',
      element_mr: 'पृथ्वी',
      rulingPlanet: 'Moon',
      rulingPlanet_mr: 'चंद्र',
      longDescription: "Rohini is the fourth Nakshatra, spanning from 10°00' to 23°20' in Taurus. It is symbolized by a cart or chariot and represents growth, fertility, and creativity. People born under this Nakshatra are known for their artistic abilities and growth-oriented nature.",
      longDescription_mr: "रोहिणी ही चौथी नक्षत्र आहे, वृषभ राशीत 10°00' ते 23°20' पर्यंत पसरलेली आहे. ही गाडी किंवा रथाने दर्शविली जाते आणि वाढ, सुफलता आणि सर्जनशीलता दर्शवते. या नक्षत्राखाली जन्मलेले लोक त्यांच्या कलात्मक क्षमता आणि वाढीच्या दिशेने असलेल्या स्वभावासाठी ओळखले जातात."
    },
    Mrigashira: {
      name: 'Mrigashira',
      name_mr: 'मृगशिरा',
      deity: 'Soma',
      deity_mr: 'सोम',
      description: 'Fifth Nakshatra, represents searching and exploring',
      description_mr: 'पाचवी नक्षत्र, शोध आणि शोध दर्शवते',
      characteristics: 'Exploratory, curious, research-oriented',
      characteristics_mr: 'शोधक, जिज्ञासू, संशोधनप्रिय',
      compatibility: 'Ardra, Punarvasu, Pushya',
      compatibility_mr: 'आर्द्रा, पुनर्वसु, पुष्य',
      element: 'Fire',
      element_mr: 'अग्नी',
      rulingPlanet: 'Mars',
      rulingPlanet_mr: 'मंगळ',
      longDescription: "Mrigashira is the fifth Nakshatra, spanning from 23°20' in Taurus to 6°40' in Gemini. It is symbolized by a deer head and represents searching, exploring, and curiosity. People born under this Nakshatra are known for their research-oriented nature and exploratory spirit.",
      longDescription_mr: "मृगशिरा ही पाचवी नक्षत्र आहे, वृषभ राशीत 23°20' ते मिथुन राशीत 6°40' पर्यंत पसरलेली आहे. ही हरीणाच्या डोक्याने दर्शविली जाते आणि शोध, शोध आणि जिज्ञासा दर्शवते. या नक्षत्राखाली जन्मलेले लोक त्यांच्या संशोधनप्रिय स्वभाव आणि शोधक भावनेसाठी ओळखले जातात."
    }
  };

  if (!nakshatra) {
    // Handle case where state is not passed (e.g., direct navigation)
    // You might want to fetch details based on `id` from `useParams`
    return <div>{t('loading')}...</div>;
  }

  const getDetail = (key) => {
    const detailKey = nakshatra.name;
    const detail = nakshatraDetails[detailKey];
    if (!detail) return '';
    
    return language === 'mr' ? detail[key + '_mr'] : detail[key];
  };

  const getNakshatraName = () => language === 'mr' ? nakshatra.name_mr : nakshatra.name;

  return (
    <div className="nakshatra-detail-container">
      <div className="nakshatra-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← {t('back')}
        </button>
        <h2 className="nakshatra-detail-title">{getNakshatraName()}</h2>
      </div>
      
      <div className="nakshatra-detail-layout">
        <div className="nakshatra-image-section">
          <div className="nakshatra-image-placeholder">
            <div className="image-placeholder-text">
              {getNakshatraName()}
            </div>
          </div>
        </div>
        
        <div className="nakshatra-content-section">
          <div className="nakshatra-description">
            <p>{getDetail('longDescription')}</p>
          </div>
          
          <div className="nakshatra-details-grid">
            <div className="detail-card">
              <h3>{t('deity')}</h3>
              <p>{getDetail('deity')}</p>
            </div>
            
            <div className="detail-card">
              <h3>{t('element')}</h3>
              <p>{getDetail('element')}</p>
            </div>
            
            <div className="detail-card">
              <h3>{t('ruling_planet')}</h3>
              <p>{getDetail('rulingPlanet')}</p>
            </div>
            
            <div className="detail-card">
              <h3>{t('compatibility')}</h3>
              <p>{getDetail('compatibility')}</p>
            </div>
            
            <div className="detail-card">
              <h3>{t('characteristics')}</h3>
              <p>{getDetail('characteristics')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NakshatraDetail; 