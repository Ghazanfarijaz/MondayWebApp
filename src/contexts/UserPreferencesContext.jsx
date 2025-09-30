// context/UserPreferencesContext.js
import { createContext, useContext, useState, useEffect } from "react";

const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    itemView: "table", // Default view
    sortPreference: "default", // Default sort preference
    dateFormat: "YYYY-MM-DD", // Default date format
  });

  useEffect(() => {
    // Load preferences from localStorage or set defaults
    const storedPreferences = JSON.parse(
      localStorage.getItem("userPreferences")
    );
    if (storedPreferences) {
      setPreferences(storedPreferences);
    }
  }, []);

  const updatePreferences = (newPreferences) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem("userPreferences", JSON.stringify(updatedPreferences));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => useContext(UserPreferencesContext);
