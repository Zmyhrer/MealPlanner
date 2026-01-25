import pool from "../database/connection";
import { Scheduled_Meal } from "../models/scheduledMeals";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "scheduled_meals" as const;
const COLUMNS = ["meal_id", "meal_type"] as const;

export async function addScheduledMeal(
  data: Omit<Scheduled_Meal, "id">,
): Promise<Scheduled_Meal> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateScheduledMeal(
  id: string,
  updates: Partial<Scheduled_Meal>,
): Promise<Scheduled_Meal> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteScheduledMeal(id: string): Promise<Scheduled_Meal> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
