import pool from "../database/connection";
import { User } from "../models/users";
import { UpdateUserInput } from "./types";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "users" as const;
const COLUMNS = ["email", "name"] as const;

export async function addUser(data: Omit<User, "id">): Promise<User> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateUser(
  id: string,
  updates: UpdateUserInput,
): Promise<User> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteUser(id: string): Promise<User> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
