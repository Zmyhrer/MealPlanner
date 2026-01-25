import * as mealsRepo from "../repositories/mealsRepository";
import { Meal } from "../models/meals";
import { createCrudService } from "../utils/serviceHelpers";

const repoWrapper = {
  add: mealsRepo.addMeal,
  update: mealsRepo.updateMeal,
  remove: mealsRepo.deleteMeal,
};

const mealsService = createCrudService<Omit<Meal, "id">, Partial<Meal>, Meal>(
  "Meal",
  repoWrapper,
  ["user_id", "name", "calories", "instructions"],
);

export const addMeal = mealsService.add;
export const updateMeal = mealsService.update;
export const deleteMeal = mealsService.delete;
