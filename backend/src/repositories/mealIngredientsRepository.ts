import pool from "../database/connection";
import { Meal_Ingredient } from "../models/mealIngredients";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "meal_ingredients" as const;
const COLUMNS = ["meal_id", "ingredient_id", "quantity", "unit"] as const;

export async function addMealIngredient(
  data: Omit<Meal_Ingredient, "id">,
): Promise<Meal_Ingredient> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateMealIngredient(
  id: string,
  updates: Partial<Meal_Ingredient>,
): Promise<Meal_Ingredient> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteMealIngredient(
  id: string,
): Promise<Meal_Ingredient> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
