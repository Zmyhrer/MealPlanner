import { MealRepository } from "../../repositories/mealsRepository";
import { Meal, createMeal, updateMeal } from "../../models/meals";

export async function getAllMealService(
  repository: MealRepository,
): Promise<Meal[]> {
  return repository.findAll();
}

export async function getMealById(
  repository: MealRepository,
  id: string,
): Promise<Meal> {
  return repository.findById(id);
}

export async function createMealService(
  repository: MealRepository,
  mealInfo: Omit<Meal, "id" | "deleted_at">,
): Promise<Meal> {
  const meal = createMeal(
    mealInfo.user_id,
    mealInfo.name,
    mealInfo.serving_calories,
    mealInfo.instructions,
  );
  return repository.create(meal);
}

export async function updateMealByIdService(
  repository: MealRepository,
  id: string,
  updates: Partial<Omit<Meal, "id" | "user_id" | "deleted_at">>,
): Promise<Meal> {
  return repository.updateById(id, updates);
}

export async function softDeleteMealByIdService(
  repository: MealRepository,
  id: string,
): Promise<Meal> {
  return repository.softDeleteById(id);
}
