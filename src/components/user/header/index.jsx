import React, { useState } from 'react';
import './index.scss';

const Header = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    // Add logic to change the language of your application here
  };

  return (
    <header className="header">
      <div className="header__left">Shop Here!</div>
      <div className="header__right">
        <div className="language-selector">
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
