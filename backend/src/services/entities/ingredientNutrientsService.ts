import * as ingredientNutrientsRepo from "../../repositories/ingredientNutrientsRepository";
import { Ingredient_Nutrient } from "../../models/ingredientNutrients";
import { createCrudService } from "../../utils/serviceHelpers";

// Wrap repository functions in the expected { add, update, remove } keys
const repoWrapper = {
  add: ingredientNutrientsRepo.addIngredientNutrient,
  update: ingredientNutrientsRepo.updateIngredientNutrient,
  remove: ingredientNutrientsRepo.deleteIngredientNutrient,
};

const ingredientNutrientsService = createCrudService<
  Omit<Ingredient_Nutrient, "id">,
  Partial<Ingredient_Nutrient>,
  Ingredient_Nutrient
>("Ingredient_Nutrient", repoWrapper, [
  "ingredient_id",
  "nutrient_id",
  "unit",
  "value",
]);

export const addIngredientNutrients = ingredientNutrientsService.add;
export const updateIngredientNutrients = ingredientNutrientsService.update;
export const deleteIngredientNutrients = ingredientNutrientsService.delete;
