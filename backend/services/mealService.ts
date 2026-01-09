import fs from "fs";
import path from "path";
import { Meal } from "../../shared/types/meal";

const DATA_PATH = path.join(__dirname, "../data/meals.json");

export function getAllMeals(): Meal[] {
  if (!fs.existsSync(DATA_PATH)) return [];
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

export function getMealById(id: string): Meal | undefined {
  return getAllMeals().find((m) => m.id === id);
}

export function addMeal(meal: Omit<Meal, "id">): Meal {
  const meals = getAllMeals();
  const newMeal: Meal = { ...meal, id: Date.now().toString() };

  meals.push(newMeal);
  fs.writeFileSync(DATA_PATH, JSON.stringify(meals, null, 2));

  return newMeal;
}
