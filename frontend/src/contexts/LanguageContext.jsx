import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [primaryLanguage, setPrimaryLanguage] = useState(null);
  const [secondaryLanguage, setSecondaryLanguage] = useState(null);

  const value = {
    primaryLanguage,
    secondaryLanguage,
    setPrimaryLanguage,
    setSecondaryLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);