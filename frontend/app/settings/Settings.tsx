"use client";

import React from "react";
import { UserPreferences } from "@/lib/types";
import { usePreferences } from "./hooks/usePreferences";
import { useDaysOfWeek } from "./hooks/useDaysOfWeek";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsSection } from "./components/SettingsSection";
import { ThemeToggle } from "./components/ThemeToggle";
import { UnitSystemToggle } from "./components/UnitSystemToggle";
import { WeekStartSelector } from "./components/WeekStartSelector";
import { DietaryTags } from "./components/DietaryTags";
import { DIETARY_TAGS } from "./constants/dietaryTags";

interface SettingsProps {
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: UserPreferences) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  const days = useDaysOfWeek();

  const {
    preferences: currentPreferences,
    updateTheme,
    updateUnitSystem,
    updateStartDayOfWeek,
    toggleDietaryRestriction,
  } = usePreferences({
    initialPreferences: preferences,
    onUpdatePreferences,
  });

  return (
    <div className="max-w-2xl space-y-8">
      <SettingsHeader />

      <SettingsSection>
        <ThemeToggle
          currentTheme={currentPreferences.theme}
          onThemeChange={updateTheme}
        />

        <UnitSystemToggle
          currentUnitSystem={currentPreferences.unitSystem}
          onUnitSystemChange={updateUnitSystem}
        />

        <WeekStartSelector
          currentStartDay={currentPreferences.startDayOfWeek}
          days={days}
          onStartDayChange={updateStartDayOfWeek}
        />

        <DietaryTags
          tags={DIETARY_TAGS}
          selectedTags={currentPreferences.dietaryRestrictions}
          onTagToggle={toggleDietaryRestriction}
        />
      </SettingsSection>
    </div>
  );
};
