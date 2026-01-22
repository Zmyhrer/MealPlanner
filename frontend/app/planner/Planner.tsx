"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  WeeklyPlan,
  Recipe,
  UnitSystem,
  Ingredient,
  DayPlan,
  MealType,
  ScheduledMeal,
  DayOfWeek,
} from "@/lib/types";
import { PlannerHeader } from "./components/PlannerHeader";
import { NutrientSummaryBanner } from "./components/NutrientSummaryBanner";
import { DayColumn } from "./components/DayColumn";
import { NutrientDetailModal } from "./components/NutrientDetailModal";
import { RecipeSelectionModal } from "./components/RecipeSelectionModal";
import { DatePickerModal } from "./components/DatePickerModal";
import { usePlannerCalculations } from "./hooks/usePlannerCalculations";

interface PlannerProps {
  weeklyPlan: WeeklyPlan;
  onUpdatePlan: (plan: WeeklyPlan) => void;
  ingredients: Ingredient[];
  userRecipes: Recipe[];
  unitSystem: UnitSystem;
  onNavigate: (direction: number) => void;
  onGoToday: () => void;
  onSetDate: (date: Date) => void;
  startDayOfWeek: DayOfWeek;
}

// Helper function to convert MealType to lowercase keys
const getMealKey = (type: MealType): keyof DayPlan["meals"] => {
  switch (type) {
    case MealType.BREAKFAST:
      return "breakfast";
    case MealType.LUNCH:
      return "lunch";
    case MealType.DINNER:
      return "dinner";
    case MealType.SNACK:
      return "snacks";
    case MealType.DESSERT:
    case MealType.APPETIZER:
    case MealType.SIDE:
      return "snacks";
    default:
      // TypeScript needs this to ensure all cases are covered
      const exhaustiveCheck: never = type;
      throw new Error(`Unhandled meal type: ${exhaustiveCheck}`);
  }
};

export const Planner: React.FC<PlannerProps> = ({
  weeklyPlan,
  onUpdatePlan,
  ingredients,
  userRecipes,
  unitSystem,
  onNavigate,
  onGoToday,
  onSetDate,
  startDayOfWeek,
}) => {
  const [activePicker, setActivePicker] = useState<{
    dayIdx: number;
    type: MealType;
    snackIdx?: number;
  } | null>(null);
  const [detailedNutrients, setDetailedNutrients] = useState<{
    title: string;
    nut: { calories: number; protein: number; carbs: number; fat: number };
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerTriggerRef = useRef<HTMLButtonElement>(null);
  const datePickerModalRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date(weeklyPlan.days[0].date);

  const {
    weeklyNutrients,
    calculateRecipeNutrients,
    formatMacro,
    macroUnit,
    getDayNutrients,
  } = usePlannerCalculations(ingredients, unitSystem, weeklyPlan);

  const selectMeal = (dayIndex: number, type: MealType, recipe: Recipe) => {
    const newDays = [...weeklyPlan.days];
    const day = { ...newDays[dayIndex] };
    const scheduled: ScheduledMeal = { recipe, servings: recipe.servings };

    const mealKey = getMealKey(type);

    if (type === MealType.SNACK) {
      const currentSnacks = day.meals.snacks || [];
      day.meals.snacks = [...currentSnacks, scheduled];
    } else {
      day.meals = { ...day.meals, [mealKey]: scheduled };
    }

    newDays[dayIndex] = day;
    onUpdatePlan({ ...weeklyPlan, days: newDays });
    setActivePicker(null);
    setSearchQuery("");
  };

  const updateServings = (
    dayIndex: number,
    type: MealType,
    servings: number,
    snackIdx?: number
  ) => {
    const newDays = [...weeklyPlan.days];
    const day = { ...newDays[dayIndex] };

    if (type === MealType.SNACK && snackIdx !== undefined) {
      const snacks = [...(day.meals.snacks || [])];
      if (snacks[snackIdx]) {
        snacks[snackIdx] = {
          ...snacks[snackIdx],
          servings: Math.max(1, servings),
        };
        day.meals.snacks = snacks;
      }
    } else {
      const mealKey = getMealKey(type);
      const meal = day.meals[mealKey];
      if (meal) {
        day.meals = {
          ...day.meals,
          [mealKey]: { ...meal, servings: Math.max(1, servings) },
        };
      }
    }

    newDays[dayIndex] = day;
    onUpdatePlan({ ...weeklyPlan, days: newDays });
  };

  const removeMeal = (dayIndex: number, type: MealType, snackIdx?: number) => {
    const newDays = [...weeklyPlan.days];
    const day = { ...newDays[dayIndex] };

    if (type === MealType.SNACK && snackIdx !== undefined) {
      const snacks = [...(day.meals.snacks || [])];
      day.meals.snacks = snacks.filter((_, i) => i !== snackIdx);
    } else {
      const mealKey = getMealKey(type);
      const nextMeals = { ...day.meals };
      delete nextMeals[mealKey];
      day.meals = nextMeals;
    }

    newDays[dayIndex] = day;
    onUpdatePlan({ ...weeklyPlan, days: newDays });
  };

  const dateRangeText = useMemo(() => {
    if (weeklyPlan.days.length === 0) return "";
    const firstDate = new Date(weeklyPlan.days[0].date);
    const lastDate = new Date(weeklyPlan.days[weeklyPlan.days.length - 1].date);

    const formatOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year:
        firstDate.getFullYear() !== lastDate.getFullYear()
          ? "numeric"
          : undefined,
    };

    const startStr = firstDate.toLocaleDateString("en-US", formatOptions);
    const endStr = lastDate.toLocaleDateString("en-US", formatOptions);

    return `${startStr} – ${endStr}`;
  }, [weeklyPlan.days]);

  const handleDatePickerClick = () => {
    setShowDatePicker((prev) => !prev);
  };

  const handleDateSelect = (date: Date) => {
    onSetDate(date);
    setShowDatePicker(false);
  };

  useEffect(() => {
    if (!showDatePicker) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Since we can't access the modal's ref directly, we can find it by class
      const datePickerModal = document.querySelector(".date-picker-modal");
      const isDatePicker = datePickerModal?.contains(target);
      const isTriggerButton = datePickerTriggerRef.current?.contains(target);

      if (!isDatePicker && !isTriggerButton) {
        setShowDatePicker(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDatePicker]);

  return (
    <div className="space-y-8 pb-20 relative">
      <PlannerHeader
        weeklyPlan={weeklyPlan}
        onNavigate={onNavigate}
        onGoToday={onGoToday}
        onOpenDatePicker={handleDatePickerClick}
        datePickerTriggerRef={datePickerTriggerRef}
        dateRangeText={dateRangeText}
      />

      {showDatePicker && (
        <DatePickerModal
          ref={datePickerModalRef}
          onSelectDate={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
          startDayOfWeek={startDayOfWeek}
          triggerRef={datePickerTriggerRef}
          currentDate={currentDate}
        />
      )}

      <NutrientSummaryBanner
        weeklyNutrients={weeklyNutrients}
        formatMacro={formatMacro}
        macroUnit={macroUnit}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-6 overflow-x-visible">
        {weeklyPlan.days.map((day, idx) => (
          <DayColumn
            key={day.date}
            day={day}
            dayIndex={idx}
            ingredients={ingredients}
            calculateRecipeNutrients={calculateRecipeNutrients}
            formatMacro={formatMacro}
            macroUnit={macroUnit}
            getDayNutrients={getDayNutrients}
            onSetDetailedNutrients={setDetailedNutrients}
            onOpenMealPicker={(type) => setActivePicker({ dayIdx: idx, type })}
            onUpdateServings={(type, servings, snackIdx) =>
              updateServings(idx, type, servings, snackIdx)
            }
            onRemoveMeal={(type, snackIdx) => removeMeal(idx, type, snackIdx)}
          />
        ))}
      </div>

      {detailedNutrients && (
        <NutrientDetailModal
          nutrients={detailedNutrients}
          formatMacro={formatMacro}
          macroUnit={macroUnit}
          onClose={() => setDetailedNutrients(null)}
        />
      )}

      {activePicker && (
        <RecipeSelectionModal
          activePicker={activePicker}
          searchQuery={searchQuery}
          userRecipes={userRecipes}
          onSearchChange={setSearchQuery}
          onSelectRecipe={(recipe) =>
            selectMeal(activePicker.dayIdx, activePicker.type, recipe)
          }
          onClose={() => {
            setActivePicker(null);
            setSearchQuery("");
          }}
        />
      )}
    </div>
  );
};
