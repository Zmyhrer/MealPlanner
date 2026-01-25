import pool from "../database/connection";
import { Meal } from "../models/meals";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "meals" as const;
const COLUMNS = ["user_id", "name", "calories", "instructions"] as const;

export async function addMeal(data: Omit<Meal, "id">): Promise<Meal> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateMeal(
  id: string,
  updates: Partial<Meal>,
): Promise<Meal> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteMeal(id: string): Promise<Meal> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
