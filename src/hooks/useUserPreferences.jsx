import { useEffect, useState } from "react";

function useUserPreferences() {
  const [preferences, setPreferences] = useState({
    itemView: "card", // Default view
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

  return { preferences, updatePreferences };
}

export default useUserPreferences;
