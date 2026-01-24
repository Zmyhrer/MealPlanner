import pool from "../database/connection";
import { Ingredient_Nutrient } from "../models/ingredientNutrients";
import { UpdateIngredientNutrientInput } from "../services/types";

export async function addIngredientNutrient(
  ingredient_id: string,
  nutrient_id: string,
  unit: string,
  value: number,
): Promise<Ingredient_Nutrient> {
  const res = await pool.query(
    "INSERT into ingredient_nutrients (ingredient_id, nutrient_id, unit, value) VALUES ($1, $2, $3, $4) RETURNING *;",
    [ingredient_id, nutrient_id, unit, value],
  );
  return res.rows[0];
}

export async function UpdateIngredientNutrient(
  id: string,
  updates: UpdateIngredientNutrientInput,
): Promise<Ingredient_Nutrient> {
  const fields = [];
  const values = [];
  let index = 1;

  if (updates.ingredient_id !== undefined) {
    fields.push(`ingredient_id = $${index}`);
    values.push(updates.ingredient_id);
    index++;
  }

  if (updates.nutrient_id !== undefined) {
    fields.push(`nutrient_id = $${index}`);
    values.push(updates.nutrient_id);
    index++;
  }

  if (updates.unit !== undefined) {
    fields.push(`unit = $${index}`);
    values.push(updates.unit);
    index++;
  }

  if (updates.value !== undefined) {
    fields.push(`value = $${index}`);
    values.push(updates.value);
    index++;
  }

  const res = await pool.query(
    `UPDATE ingredient_nutrients SET ${fields.join(", ")} WHERE id = $${index} RETURNING *;`,
    [...values, id],
  );

  return res.rows[0];
}

export async function deleteIngredientNutrient(
  id: string,
): Promise<Ingredient_Nutrient> {
  const res = await pool.query(
    "DELETE FROM ingredient_nutrients WHERE id = $1 RETURNING *;",
    [id],
  );
  return res.rows[0];
}
