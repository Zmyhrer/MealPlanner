import pool from "../database/connection";
import { Users } from "../models/users";
import { UpdateUserInput } from "../services/types";

export async function addUser(email: string, name: string): Promise<Users> {
  const res = await pool.query(
    "INSERT into users (email, name) VALUES ($1, $2) RETURNING *;",
    [email, name],
  );
  return res.rows[0];
}

export async function updateUser(
  id: string,
  updates: UpdateUserInput,
): Promise<Users> {
  const fields = [];
  const values = [];
  let index = 1;

  if (updates.email !== undefined) {
    fields.push(`email = $${index}`);
    values.push(updates.email);
    index++;
  }

  if (updates.name !== undefined) {
    fields.push(`name = $${index}`);
    values.push(updates.name);
    index++;
  }

  const res = await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = $${index} RETURNING *;`,
    [...values, id],
  );

  return res.rows[0];
}

export async function deleteUser(id: string): Promise<Users> {
  const res = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *;", [
    id,
  ]);
  return res.rows[0];
}
