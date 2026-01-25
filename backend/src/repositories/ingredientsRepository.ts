import pool from "../database/connection";
import { Ingredient } from "../models/ingredients";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "ingredients" as const;
const COLUMNS = ["name"] as const;

export async function addIngredient(name: string): Promise<Ingredient> {
  const { query, values } = buildInsertQuery(TABLE, { name }, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateIngredient(
  id: string,
  updates: Partial<Ingredient>,
): Promise<Ingredient> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteIngredient(id: string): Promise<Ingredient> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
