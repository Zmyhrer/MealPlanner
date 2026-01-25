import pool from "../database/connection";
import { Ingredient_Nutrient } from "../models/ingredientNutrients";
import { UpdateIngredientNutrientInput } from "../services/types";
import {
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from "../utils/repositoryHelpers";

const TABLE = "ingredient_nutrients" as const;

const COLUMNS = ["ingredient_id", "nutrient_id", "unit", "value"] as const;

type IngredientNutrientInsert = Pick<
  Ingredient_Nutrient,
  (typeof COLUMNS)[number]
>;

export async function addIngredientNutrient(
  data: IngredientNutrientInsert,
): Promise<Ingredient_Nutrient> {
  const { query, values } = buildInsertQuery(TABLE, data, COLUMNS);

  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function updateIngredientNutrient(
  id: string,
  updates: UpdateIngredientNutrientInput,
): Promise<Ingredient_Nutrient> {
  const { query, values } = buildUpdateQuery(TABLE, id, updates, COLUMNS);

  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function deleteIngredientNutrient(
  id: string,
): Promise<Ingredient_Nutrient> {
  const { query, values } = buildDeleteQuery(TABLE, id);

  const res = await pool.query(query, values);
  return res.rows[0];
}
