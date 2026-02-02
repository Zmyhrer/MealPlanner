import {
  Ingredient,
  updateIngredient,
  createIngredient,
} from "../../models/ingredients";
import { IngredientRepository } from "../../repositories/ingredientsRepository";

export async function getAllIngredientsService(
  repository: IngredientRepository,
): Promise<Ingredient[]> {
  return repository.findAll();
}

export async function getIngredientByIdService(
  repository: IngredientRepository,
  id: string,
): Promise<Ingredient> {
  return repository.findById(id);
}

export async function createIngredientService(
  repository: IngredientRepository,
  name: string,
): Promise<Ingredient> {
  const ingredient = createIngredient(name);
  return repository.create(ingredient);
}

export async function updateIngredienByIdService(
  repository: IngredientRepository,
  id: string,
  name: string,
): Promise<Ingredient> {
  const validUpdate = updateIngredient(name);
  return repository.updateById(id, validUpdate);
}

export async function softDeleteIngredientByIdService(
  repository: IngredientRepository,
  id: string,
): Promise<Ingredient> {
  return repository.softDeleteById(id);
}
