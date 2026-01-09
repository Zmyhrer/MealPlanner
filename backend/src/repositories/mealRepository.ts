import { Meal } from "@mealplanner/shared";
import { db } from "../database/connection"; // DB connection is in ONE place

export const findAll = (): Meal[] => {
  const stmt = db.prepare("SELECT * FROM meals ORDER BY created_at DESC");
  return stmt.all() as Meal[];
};
