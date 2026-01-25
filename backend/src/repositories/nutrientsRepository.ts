import pool from "../database/connection";
import { Nutrient } from "../models/nutrients";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "nutrients" as const;
const COLUMNS = ["name"] as const;

export async function addNutrient(name: string): Promise<Nutrient> {
  const { query, values } = buildInsertQuery(TABLE, { name }, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateNutrient(
  id: string,
  updates: Partial<Nutrient>,
): Promise<Nutrient> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteNutrient(id: string): Promise<Nutrient> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
