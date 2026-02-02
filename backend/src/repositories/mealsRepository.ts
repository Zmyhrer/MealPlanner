import { Meal } from "../models/meals";
import pool from "../database/connection";

export type MealRepository = {
  findAll: () => Promise<Meal[]>;
  findById: (id: string) => Promise<Meal>;
  create: (meal: Omit<Meal, "id" | "deleted_at">) => Promise<Meal>;
  updateById: (
    id: string,
    meal: Partial<Omit<Meal, "id" | "deleted_at">>,
  ) => Promise<Meal>;
  softDeleteById: (id: string) => Promise<Meal>;
};

export function createPostgresMealRepository(): MealRepository {
  return {
    async findAll(): Promise<Meal[]> {
      const { rows } = await pool.query(
        "SELECT id, user_id, name, serving_calories, instructions FROM meals WHERE deleted_at IS NULL",
      );

      return rows.map((row) => ({
        id: row.id,
        user_id: row.user_id,
        name: row.name,
        serving_calories: row.serving_calories,
        instructions: row.instructions,
        deleted_at: row.deleted_at,
      }));
    },

    async findById(id: string): Promise<Meal> {
      const { rows } = await pool.query(
        "SELECT id, user_id, name, calories, instructions FROM meals WHERE id = $1 AND deleted_at IS NULL",
        [id],
      );

      if (rows.length === 0) {
        throw new Error(`Meal with id ${id} not found`);
      }

      const row = rows[0];

      return {
        id: row.id,
        user_id: row.user_id,
        name: row.name,
        serving_calories: row.serving_calories,
        instructions: row.instructions,
      };
    },

    async create(meal: Omit<Meal, "id" | "deleted_at">): Promise<Meal> {
      const { rows } = await pool.query(
        `INSERT INTO meals (
            user_id, 
            name, 
            serving_calories, 
            instructions
        ) VALUES ($1, $2, $3, $4) 
        RETURNING 
            id, 
            user_id, 
            name, 
            serving_calories, 
            instructions, 
            deleted_at`,
        [meal.user_id, meal.name, meal.serving_calories, meal.instructions],
      );

      const row = rows[0];

      return {
        id: row.id,
        user_id: row.user_id,
        name: row.name,
        serving_calories: row.serving_calories,
        instructions: row.instructions,
        deleted_at: row.deleted_at,
      };
    },

    async updateById(
      id: string,
      meal: Partial<Omit<Meal, "id" | "user_id" | "deleted_at">>,
    ): Promise<Meal> {
      const { rows } = await pool.query(
        `UPDATE meals 
        SET  
            name = COALESCE($1, name), 
            serving_calories = COALESCE($2, serving_calories), 
            instructions = COALESCE($3, instructions)
        WHERE id = $4 and deleted_at IS NULL
        RETURNING *`,
        [
          meal.name ?? null,
          meal.serving_calories ?? null,
          meal.instructions ?? null,
          id,
        ],
      );

      if (rows.length === 0) {
        throw new Error(`Meal with id ${id} not found`);
      }

      const row = rows[0];

      return {
        id: row.id,
        user_id: row.user_id,
        name: row.name,
        serving_calories: row.serving_calories,
        instructions: row.instructions,
        deleted_at: row.deleted_at,
      };
    },

    async softDeleteById(id: string): Promise<Meal> {
      const { rows } = await pool.query(
        `UPDATE meals 
        SET 
            deleted_at = NOW() 
        WHERE 
            deleted_at IS NULL
        RETURNING *`,
      );

      if (rows.length === 0) {
        throw new Error(`Meal with id ${id} not found`);
      }

      const row = rows[0];

      return {
        id: row.id,
        user_id: row.user_id,
        name: row.name,
        serving_calories: row.serving_calories,
        instructions: row.instructions,
        deleted_at: row.deleted_at,
      };
    },
  };
}
