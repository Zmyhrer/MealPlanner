import * as scheduledMealsRepo from "../../repositories/scheduledMealsRepository";
import { Scheduled_Meal } from "../../models/scheduledMeals";
import { createCrudService } from "../../utils/serviceHelpers";

const repoWrapper = {
  add: scheduledMealsRepo.addScheduledMeal,
  update: scheduledMealsRepo.updateScheduledMeal,
  remove: scheduledMealsRepo.deleteScheduledMeal,
};

const scheduledMealsService = createCrudService<
  Omit<Scheduled_Meal, "id">,
  Partial<Scheduled_Meal>,
  Scheduled_Meal
>("Scheduled_Meal", repoWrapper, ["meal_id", "meal_type"]);

export const addScheduledMeal = scheduledMealsService.add;
export const updateScheduledMeal = scheduledMealsService.update;
export const deleteScheduledMeal = scheduledMealsService.delete;
