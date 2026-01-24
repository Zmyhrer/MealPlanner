import * as ingredientNutrientsRepo from "../repositories/ingredientNutrientsRepository";
import { Ingredient_Nutrient } from "../models/ingredientNutrients";
import { UpdateIngredientNutrientInput } from "./types";

export async function addIngredientNutrients(
  ingredient_id: string,
  nutrient_id: string,
  unit: string,
  value: number,
): Promise<Ingredient_Nutrient> {
  if (!ingredient_id?.trim()) {
    throw new Error("Ingredient_Nutrient ingredient_id is required");
  }
  if (!nutrient_id?.trim()) {
    throw new Error("Ingredient_Nutrient nutrient_id is required");
  }
  if (!unit?.trim()) {
    throw new Error("Ingredient_Nutrient unit is required");
  }
  if (value === null || value === undefined || Number.isNaN(value)) {
    throw new Error("Ingredient_Nutrient value is required");
  }
  return await ingredientNutrientsRepo.addIngredientNutrient(
    ingredient_id,
    nutrient_id,
    unit,
    value,
  );
}

export async function UpdateIngredientNutrients(
  id: string,
  updates: UpdateIngredientNutrientInput,
): Promise<Ingredient_Nutrient> {
  if (!id?.trim()) {
    throw new Error("Ingredient_Nutrient id is required");
  }
  if (
    !updates.ingredient_id &&
    !updates.nutrient_id &&
    !updates.unit &&
    !updates.value
  ) {
    throw new Error("At least one field must be provided");
  }
  return await ingredientNutrientsRepo.UpdateIngredientNutrient(id, updates);
}

export async function deleteIngredientNutrients(
  id: string,
): Promise<Ingredient_Nutrient> {
  if (!id?.trim()) {
    throw new Error("Ingredient_Nutrient id is required");
  }

  const deletedUser =
    await ingredientNutrientsRepo.deleteIngredientNutrient(id);

  if (!deletedUser) {
    throw new Error("Ingredient_Nutrient not found");
  }

  return deletedUser;
}
