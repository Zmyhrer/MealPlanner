import * as ingredientsRepo from "../../repositories/ingredientsRepository";
import { Ingredient } from "../../models/ingredients";
import { createCrudService } from "../../utils/serviceHelpers";

// Wrap the repo functions to match { add(data), update(id, updates), remove(id) }
const repoWrapper = {
  add: (data: Omit<Ingredient, "id">) =>
    ingredientsRepo.addIngredient(data.name),
  update: ingredientsRepo.updateIngredient,
  remove: ingredientsRepo.deleteIngredient,
};

const ingredientsService = createCrudService<
  Omit<Ingredient, "id">,
  Partial<Ingredient>,
  Ingredient
>("Ingredient", repoWrapper, ["name"]);

export const addIngredient = ingredientsService.add;
export const updateIngredient = ingredientsService.update;
export const deleteIngredient = ingredientsService.delete;
