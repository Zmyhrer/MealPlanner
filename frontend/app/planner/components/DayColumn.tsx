"use client";

import {
  DayPlan,
  Ingredient,
  Recipe,
  MealType,
  ScheduledMeal,
} from "@/lib/types";
import { DayHeader } from "./DayHeader";
import { MealCard } from "./MealCard";
import { SnackSection } from "./SnackSection";

interface DayColumnProps {
  day: DayPlan;
  dayIndex: number;
  ingredients: Ingredient[];
  calculateRecipeNutrients: (
    recipe: Recipe,
    servings: number
  ) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  formatMacro: (grams: number) => string;
  macroUnit: string;
  getDayNutrients: (day: DayPlan) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onSetDetailedNutrients: (nutrients: {
    title: string;
    nut: { calories: number; protein: number; carbs: number; fat: number };
  }) => void;
  onOpenMealPicker: (type: MealType) => void;
  onUpdateServings: (
    type: MealType,
    servings: number,
    snackIdx?: number
  ) => void;
  onRemoveMeal: (type: MealType, snackIdx?: number) => void;
}

const getMealKey = (type: MealType): keyof DayPlan["meals"] => {
  switch (type) {
    case MealType.BREAKFAST:
      return "breakfast";
    case MealType.LUNCH:
      return "lunch";
    case MealType.DINNER:
      return "dinner";
    case MealType.SNACKS:
      return "snacks";
  }
};

// Type guard to check if value is ScheduledMeal (not array)
const isScheduledMeal = (value: any): value is ScheduledMeal => {
  return (
    value &&
    typeof value === "object" &&
    "recipe" in value &&
    "servings" in value
  );
};

export const DayColumn: React.FC<DayColumnProps> = ({
  day,
  dayIndex,
  ingredients,
  calculateRecipeNutrients,
  formatMacro,
  macroUnit,
  getDayNutrients,
  onSetDetailedNutrients,
  onOpenMealPicker,
  onUpdateServings,
  onRemoveMeal,
}) => {
  const dayNutrients = getDayNutrients(day);

  // Create a type for regular meals (excluding SNACKS)
  type RegularMealType = MealType.BREAKFAST | MealType.LUNCH | MealType.DINNER;

  const regularMealTypes: RegularMealType[] = [
    MealType.BREAKFAST,
    MealType.LUNCH,
    MealType.DINNER,
  ];

  return (
    <div className="flex flex-col gap-5">
      <DayHeader
        date={day.date}
        nutrients={dayNutrients}
        formatMacro={formatMacro}
        onClick={() =>
          onSetDetailedNutrients({
            title: `Day Summary: ${new Date(day.date).toLocaleDateString(
              "en-US",
              { weekday: "long" }
            )}`,
            nut: dayNutrients,
          })
        }
      />

      {regularMealTypes.map((type) => {
        const mealKey = getMealKey(type);
        const mealValue = day.meals[mealKey];
        const meal = isScheduledMeal(mealValue) ? mealValue : null;
        const nutrients = meal
          ? calculateRecipeNutrients(meal.recipe, meal.servings)
          : null;

        return (
          <MealCard
            key={type}
            type={type}
            meal={meal}
            nutrients={nutrients}
            formatMacro={formatMacro}
            onView={() =>
              meal &&
              onSetDetailedNutrients({
                title: `${type}: ${meal.recipe.title}`,
                nut: calculateRecipeNutrients(meal.recipe, meal.servings),
              })
            }
            onEdit={() => onOpenMealPicker(type)}
            onUpdateServings={(servings) => onUpdateServings(type, servings)}
            onRemove={() => onRemoveMeal(type)}
          />
        );
      })}

      <SnackSection
        snacks={day.meals.snacks || []}
        calculateRecipeNutrients={calculateRecipeNutrients}
        onAddSnack={() => onOpenMealPicker(MealType.SNACKS)}
        onViewSnack={(snack, index) => {
          const snut = calculateRecipeNutrients(snack.recipe, snack.servings);
          onSetDetailedNutrients({
            title: `Snack: ${snack.recipe.title}`,
            nut: snut,
          });
        }}
        onUpdateServings={(index, servings) =>
          onUpdateServings(MealType.SNACKS, servings, index)
        }
        onRemoveSnack={(index) => onRemoveMeal(MealType.SNACKS, index)}
      />
    </div>
  );
};
