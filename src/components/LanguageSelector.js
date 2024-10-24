import React from 'react';

const LanguageSelector = ({ language, onLanguageChange }) => {
  const languages = [
    { 
      code: 'EN', 
      name: 'English', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg'
    },
    { 
      code: 'FI', 
      name: 'Finnish', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/fi.svg'
    },
    { 
      code: 'AR', 
      name: 'Arabic', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/sa.svg'
    },
  ];

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`language-button ${language === lang.code ? 'active' : ''}`}
          onClick={() => onLanguageChange(lang.code)}
        >
          <img 
            src={lang.flag} 
            alt={`${lang.name} flag`} 
            className="flag-icon" 
          />
          <span className="language-name">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
