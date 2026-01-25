import pool from "../database/connection";
import { Setting } from "../models/settings";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "settings" as const;
const COLUMNS = ["user_id", "dark_mode"] as const;

export async function addSetting(data: Omit<Setting, "id">): Promise<Setting> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateSetting(
  id: string,
  updates: Partial<Setting>,
): Promise<Setting> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteSetting(id: string): Promise<Setting> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
