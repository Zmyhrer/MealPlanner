import pool from "../database/connection";
import { Ingredient } from "../models/ingredients";

export async function getAllIngredients(): Promise<Ingredient[]> {
  const res = await pool.query("SELECT * FROM Ingredients ORDER BY id;");
  return res.rows;
}

export async function addIngredient(name: string): Promise<Ingredient> {
  const res = await pool.query(
    "INSERT INTO Ingredients (name) VALUES ($1) RETURNING *;",
    [name],
  );
  return res.rows[0];
}
