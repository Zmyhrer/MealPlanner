import pool from "../database/connection";
import { User_Preference } from "../models/userPreferences";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "user_preferences" as const;
const COLUMNS = ["user_id", "preference_type"] as const;

export async function addUserPreference(
  data: Omit<User_Preference, "id">,
): Promise<User_Preference> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateUserPreference(
  id: string,
  updates: Partial<User_Preference>,
): Promise<User_Preference> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteUserPreference(
  id: string,
): Promise<User_Preference> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
