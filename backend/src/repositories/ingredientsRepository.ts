import pool from "../database/connection";
import { Ingredient } from "../models/ingredients";
import { UpdateIngredientInput } from "../services/types";

export async function addIngredient(name: string): Promise<Ingredient> {
  const res = await pool.query(
    "INSERT into ingredients (name) VALUES ($1) RETURNING *;",
    [name],
  );
  return res.rows[0];
}

export async function updateIngredient(
  id: string,
  updates: UpdateIngredientInput,
): Promise<Ingredient> {
  const fields = [];
  const values = [];
  let index = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${index}`);
    values.push(updates.name);
    index++;
  }

  const res = await pool.query(
    `UPDATE ingredients SET ${fields.join(", ")} WHERE id = $${index} RETURNING *;`,
    [...values, id],
  );

  return res.rows[0];
}

export async function deleteIngredient(id: string): Promise<Ingredient> {
  const res = await pool.query(
    "DELETE FROM ingredients WHERE id = $1 RETURNING *;",
    [id],
  );
  return res.rows[0];
}
