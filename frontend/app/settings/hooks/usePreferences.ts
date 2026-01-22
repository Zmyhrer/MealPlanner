import { useState, useCallback } from "react";
import { UserPreferences, Theme, UnitSystem } from "@/lib/types";

interface UsePreferencesProps {
  initialPreferences: UserPreferences;
  onUpdatePreferences: (prefs: UserPreferences) => void;
}

export const usePreferences = ({
  initialPreferences,
  onUpdatePreferences,
}: UsePreferencesProps) => {
  const [preferences, setPreferences] = useState(initialPreferences);

  const updateTheme = useCallback(
    (theme: Theme) => {
      const updated = { ...preferences, theme };
      setPreferences(updated);
      onUpdatePreferences(updated);
    },
    [preferences, onUpdatePreferences]
  );

  const updateUnitSystem = useCallback(
    (unitSystem: UnitSystem) => {
      const updated = { ...preferences, unitSystem };
      setPreferences(updated);
      onUpdatePreferences(updated);
    },
    [preferences, onUpdatePreferences]
  );

  const updateStartDayOfWeek = useCallback(
    (startDayOfWeek: number) => {
      const updated = { ...preferences, startDayOfWeek };
      setPreferences(updated);
      onUpdatePreferences(updated);
    },
    [preferences, onUpdatePreferences]
  );

  const toggleDietaryRestriction = useCallback(
    (tag: string) => {
      const isActive = preferences.dietaryRestrictions.includes(tag);
      const next = isActive
        ? preferences.dietaryRestrictions.filter((t) => t !== tag)
        : [...preferences.dietaryRestrictions, tag];

      const updated = { ...preferences, dietaryRestrictions: next };
      setPreferences(updated);
      onUpdatePreferences(updated);
    },
    [preferences, onUpdatePreferences]
  );

  return {
    preferences,
    updateTheme,
    updateUnitSystem,
    updateStartDayOfWeek,
    toggleDietaryRestriction,
  };
};
