import * as mealIngredientsRepo from "../repositories/mealIngredientsRepository";
import { Meal_Ingredient } from "../models/mealIngredients";
import { createCrudService } from "../utils/serviceHelpers";

const repoWrapper = {
  add: mealIngredientsRepo.addMealIngredient,
  update: mealIngredientsRepo.updateMealIngredient,
  remove: mealIngredientsRepo.deleteMealIngredient,
};

const mealIngredientsService = createCrudService<
  Omit<Meal_Ingredient, "id">,
  Partial<Meal_Ingredient>,
  Meal_Ingredient
>("Meal_Ingredient", repoWrapper, [
  "meal_id",
  "ingredient_id",
  "quantity",
  "unit",
]);

export const addMealIngredient = mealIngredientsService.add;
export const updateMealIngredient = mealIngredientsService.update;
export const deleteMealIngredient = mealIngredientsService.delete;
