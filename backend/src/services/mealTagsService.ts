import * as mealTagsRepo from "../repositories/mealTagsRepository";
import { Meal_Tag } from "../models/mealTags";
import { createCrudService } from "../utils/serviceHelpers";

const repoWrapper = {
  add: mealTagsRepo.addMealTag,
  update: mealTagsRepo.updateMealTag,
  remove: mealTagsRepo.deleteMealTag,
};

const mealTagsService = createCrudService<
  Omit<Meal_Tag, "id">,
  Partial<Meal_Tag>,
  Meal_Tag
>("Meal_Tag", repoWrapper, ["meal_id", "tag"]);

export const addMealTag = mealTagsService.add;
export const updateMealTag = mealTagsService.update;
export const deleteMealTag = mealTagsService.delete;
