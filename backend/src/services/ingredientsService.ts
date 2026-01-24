import * as ingredientRepo from "../repositories/ingredientsRepository";
import { Ingredient } from "../models/ingredients";
import { UpdateIngredientInput } from "./types";

export async function addIngredient(name: string): Promise<Ingredient> {
  if (!name?.trim()) {
    throw new Error("Ingredient name is required");
  }
  return await ingredientRepo.addIngredient(name);
}

export async function updateIngredient(
  id: string,
  updates: UpdateIngredientInput,
): Promise<Ingredient> {
  if (!id?.trim()) {
    throw new Error("Ingredient_Nutrient id is required");
  }
  if (!updates.name) {
    throw new Error("At least one field must be provided");
  }
  return await ingredientRepo.updateIngredient(id, updates);
}

export async function deleteIngredient(id: string): Promise<Ingredient> {
  if (!id?.trim()) {
    throw new Error("Ingredient_Nutrient id is required");
  }

  const deletedUser = await ingredientRepo.deleteIngredient(id);

  if (!deletedUser) {
    throw new Error("Ingredient_Nutrient not found");
  }

  return deletedUser;
}
