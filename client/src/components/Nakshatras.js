import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Nakshatras = ({ language }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const nakshatrasList = [
    { name: 'Ashwini', name_mr: 'अश्विनी', deity: 'Ashwini Kumaras', deity_mr: 'अश्विनी कुमार', description: 'First Nakshatra, represents new beginnings', description_mr: 'पहिली नक्षत्र, नवीन सुरुवात दर्शवते' },
    { name: 'Bharani', name_mr: 'भरणी', deity: 'Yama', deity_mr: 'यम', description: 'Second Nakshatra, represents transformation', description_mr: 'दुसरी नक्षत्र, बदल दर्शवते' },
    { name: 'Krittika', name_mr: 'कृत्तिका', deity: 'Agni', deity_mr: 'अग्नी', description: 'Third Nakshatra, represents purification', description_mr: 'तिसरी नक्षत्र, शुद्धीकरण दर्शवते' },
    { name: 'Rohini', name_mr: 'रोहिणी', deity: 'Brahma', deity_mr: 'ब्रह्मा', description: 'Fourth Nakshatra, represents growth and fertility', description_mr: 'चौथी नक्षत्र, वाढ आणि सुफलता दर्शवते' },
    { name: 'Mrigashira', name_mr: 'मृगशिरा', deity: 'Soma', deity_mr: 'सोम', description: 'Fifth Nakshatra, represents searching and exploring', description_mr: 'पाचवी नक्षत्र, शोध आणि शोध दर्शवते' },
    { name: 'Ardra', name_mr: 'आर्द्रा', deity: 'Rudra', deity_mr: 'रुद्र', description: 'Sixth Nakshatra, represents destruction and renewal', description_mr: 'सहावी नक्षत्र, विध्वंस आणि नूतनीकरण दर्शवते' },
    { name: 'Punarvasu', name_mr: 'पुनर्वसु', deity: 'Aditi', deity_mr: 'अदिती', description: 'Seventh Nakshatra, represents return and renewal', description_mr: 'सातवी नक्षत्र, परतणे आणि नूतनीकरण दर्शवते' },
    { name: 'Pushya', name_mr: 'पुष्य', deity: 'Brihaspati', deity_mr: 'बृहस्पती', description: 'Eighth Nakshatra, represents nourishment and protection', description_mr: 'आठवी नक्षत्र, पोषण आणि संरक्षण दर्शवते' },
    { name: 'Ashlesha', name_mr: 'आश्लेषा', deity: 'Nagas', deity_mr: 'नाग', description: 'Ninth Nakshatra, represents transformation and healing', description_mr: 'नववी नक्षत्र, बदल आणि उपचार दर्शवते' },
    { name: 'Magha', name_mr: 'मघा', deity: 'Pitris', deity_mr: 'पितृ', description: 'Tenth Nakshatra, represents ancestors and tradition', description_mr: 'दहावी नक्षत्र, पूर्वज आणि परंपरा दर्शवते' }
  ];

  const getNakshatraName = (nakshatra) => language === 'mr' ? nakshatra.name_mr : nakshatra.name;
  const getDeity = (nakshatra) => language === 'mr' ? nakshatra.deity_mr : nakshatra.deity;
  const getDescription = (nakshatra) => language === 'mr' ? nakshatra.description_mr : nakshatra.description;

  const handleNakshatraClick = (nakshatra) => {
    navigate(`/nakshatra/${nakshatra.name.toLowerCase()}`, { state: { nakshatra } });
  };

  return (
    <div className="app-bg">
      <h2>{t('nakshatras_title')}</h2>
      <p className="nakshatras-intro">{t('nakshatras_intro')}</p>
      
      <div className="nakshatras-grid">
        {nakshatrasList.map((nakshatra, index) => (
          <div 
            key={index} 
            className="nakshatra-card"
            onClick={() => handleNakshatraClick(nakshatra)}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="nakshatra-name">{getNakshatraName(nakshatra)}</h3>
            <div className="nakshatra-details">
              <p><strong>{t('deity')}:</strong> {getDeity(nakshatra)}</p>
              <p><strong>{t('description')}:</strong> {getDescription(nakshatra)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nakshatras; 