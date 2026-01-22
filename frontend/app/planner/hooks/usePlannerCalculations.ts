"use client";

import { useCallback, useMemo } from "react";
import {
  WeeklyPlan,
  Ingredient,
  UnitSystem,
  Recipe,
  DayPlan,
  MealType,
} from "@/lib/types";

export const usePlannerCalculations = (
  ingredients: Ingredient[],
  unitSystem: UnitSystem,
  weeklyPlan: WeeklyPlan
) => {
  const calculateRecipeNutrients = useCallback(
    (recipe: Recipe, servings: number) => {
      const scale = servings / recipe.servings;
      return recipe.ingredients.reduce(
        (acc, ri) => {
          const baseIng = ingredients.find((i) => i.id === ri.ingredientId);
          if (!baseIng) return acc;
          return {
            calories:
              acc.calories +
              baseIng.nutrientsPerUnit.calories * ri.amount * scale,
            protein:
              acc.protein +
              baseIng.nutrientsPerUnit.protein * ri.amount * scale,
            carbs:
              acc.carbs + baseIng.nutrientsPerUnit.carbs * ri.amount * scale,
            fat: acc.fat + baseIng.nutrientsPerUnit.fat * ri.amount * scale,
          };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
    },
    [ingredients]
  );

  const formatMacro = useCallback(
    (grams: number) => {
      if (unitSystem === UnitSystem.IMPERIAL) {
        return (grams * 0.035274).toFixed(1);
      }
      return Math.round(grams).toString();
    },
    [unitSystem]
  );

  const macroUnit = unitSystem === UnitSystem.IMPERIAL ? "oz" : "g";

  const getDayNutrients = useCallback(
    (day: DayPlan) => {
      const total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

      // Handle regular meals
      const regularMeals = [
        day.meals.breakfast,
        day.meals.lunch,
        day.meals.dinner,
      ];

      regularMeals.forEach((m) => {
        if (m) {
          const n = calculateRecipeNutrients(m.recipe, m.servings);
          total.calories += n.calories;
          total.protein += n.protein;
          total.carbs += n.carbs;
          total.fat += n.fat;
        }
      });

      // Handle snacks
      day.meals.snacks?.forEach((snack) => {
        const n = calculateRecipeNutrients(snack.recipe, snack.servings);
        total.calories += n.calories;
        total.protein += n.protein;
        total.carbs += n.carbs;
        total.fat += n.fat;
      });

      return total;
    },
    [calculateRecipeNutrients]
  );

  const weeklyNutrients = useMemo(() => {
    const total = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    weeklyPlan.days.forEach((day) => {
      const dn = getDayNutrients(day);
      total.calories += dn.calories;
      total.protein += dn.protein;
      total.carbs += dn.carbs;
      total.fat += dn.fat;
    });
    return total;
  }, [weeklyPlan, getDayNutrients]);

  return {
    weeklyNutrients,
    calculateRecipeNutrients,
    formatMacro,
    macroUnit,
    getDayNutrients,
  };
};
