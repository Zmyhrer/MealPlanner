import { Recipe, Ingredient, UnitSystem, Nutrients } from "@/lib/types";

export const calculateRecipeNutrients = (
  recipe: Recipe,
  ingredients: Ingredient[]
): Nutrients => {
  return recipe.ingredients.reduce(
    (acc, ri) => {
      const baseIng = ingredients.find((i) => i.id === ri.ingredientId);
      if (!baseIng) return acc;
      return {
        calories: acc.calories + baseIng.nutrientsPerUnit.calories * ri.amount,
        protein: acc.protein + baseIng.nutrientsPerUnit.protein * ri.amount,
        carbs: acc.carbs + baseIng.nutrientsPerUnit.carbs * ri.amount,
        fat: acc.fat + baseIng.nutrientsPerUnit.fat * ri.amount,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

export const formatWeight = (grams: number, unitSystem: UnitSystem): string => {
  if (unitSystem === UnitSystem.IMPERIAL) {
    return (grams * 0.035274).toFixed(2);
  }
  return grams.toFixed(1);
};

export const getWeightUnit = (unitSystem: UnitSystem): string => {
  return unitSystem === UnitSystem.IMPERIAL ? "oz" : "g";
};

export const getCommonUnits = (unitSystem: UnitSystem): string[] => {
  const baseUnits = [
    "cup",
    "tsp",
    "tbsp",
    "entire",
    "unit",
    "slice",
    "piece",
    "clove",
    "can",
    "bottle",
  ];

  return unitSystem === UnitSystem.METRIC
    ? [...baseUnits, "g", "kg", "ml", "l"]
    : [...baseUnits, "oz", "lb", "fl oz"];
};

export const validateRecipeForm = (
  title: string,
  ingredients: Array<{ name: string }>,
  instructions: string[]
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!title.trim()) errors.push("Recipe title is required");
  if (ingredients.some((i) => !i.name.trim()))
    errors.push("All ingredients must have a name");
  if (instructions.some((i) => !i.trim()))
    errors.push("All instructions must have content");

  return {
    isValid: errors.length === 0,
    errors,
  };
};
