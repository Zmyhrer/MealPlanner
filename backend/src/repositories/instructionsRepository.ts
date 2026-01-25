import pool from "../database/connection";
import { Instruction } from "../models/instructions";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "instructions" as const;
const COLUMNS = ["meal_id", "order", "text"] as const;

export async function addInstruction(
  data: Omit<Instruction, "id">,
): Promise<Instruction> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateInstruction(
  id: string,
  updates: Partial<Instruction>,
): Promise<Instruction> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteInstruction(id: string): Promise<Instruction> {
  const { query, values } = buildDeleteQuery(TABLE, id);
  const res = await pool.query(query, values);
  return res.rows[0];
}
