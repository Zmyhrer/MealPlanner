"use client";

import { useCallback } from "react";
import { Recipe, Ingredient, UnitSystem, Nutrients } from "@/lib/types";

export const useNutrientCalculator = (
  ingredients: Ingredient[],
  unitSystem: UnitSystem
) => {
  const calculateNutrients = useCallback(
    (recipe: Recipe): Nutrients => {
      return recipe.ingredients.reduce(
        (acc, ri) => {
          const baseIng = ingredients.find((i) => i.id === ri.ingredientId);
          if (!baseIng) return acc;
          return {
            calories:
              acc.calories + baseIng.nutrientsPerUnit.calories * ri.amount,
            protein: acc.protein + baseIng.nutrientsPerUnit.protein * ri.amount,
            carbs: acc.carbs + baseIng.nutrientsPerUnit.carbs * ri.amount,
            fat: acc.fat + baseIng.nutrientsPerUnit.fat * ri.amount,
          };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
    },
    [ingredients]
  );

  const formatWeight = useCallback(
    (grams: number): string => {
      if (unitSystem === UnitSystem.IMPERIAL) {
        return (grams * 0.035274).toFixed(2);
      }
      return grams.toFixed(1);
    },
    [unitSystem]
  );

  const weightUnit = unitSystem === UnitSystem.IMPERIAL ? "oz" : "g";

  return {
    calculateNutrients,
    formatWeight,
    weightUnit,
  };
};
