import { Ingredient } from "../models/ingredients";
import pool from "../database/connection";

export type IngredientRepository = {
  findAll: () => Promise<Ingredient[]>;
  findById: (id: string) => Promise<Ingredient>;
  create: (ingredient: Omit<Ingredient, "id">) => Promise<Ingredient>;
  updateById: (
    id: string,
    ingredient: Partial<Omit<Ingredient, "id" | "deleted_at">>,
  ) => Promise<Ingredient>;
  softDeleteById: (id: string) => Promise<Ingredient>;
};

export function createPostgresIngredientRepository(): IngredientRepository {
  return {
    async findAll(): Promise<Ingredient[]> {
      const { rows } = await pool.query(
        "SELECT id, name, deleted_at FROM ingredients WHERE deleted_at IS NULL",
      );
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        deleted_at: row.deleted_at,
      }));
    },

    async findById(id: string): Promise<Ingredient> {
      const { rows } = await pool.query(
        "SELECT id, name, deleted_at FROM ingredients WHERE id = $1 AND deleted_at IS NULL",
        [id],
      );

      if (rows.length === 0) {
        throw new Error(`Ingredient with id ${id} not found`);
      }

      const row = rows[0];

      return {
        id: row.id,
        name: row.name,
        deleted_at: row.deleted_at,
      };
    },

    async create(ingredient: Omit<Ingredient, "id">): Promise<Ingredient> {
      const { rows } = await pool.query(
        "INSERT INTO ingredients (name) VALUES ($1) RETURNING id, name, deleted_at",
        [ingredient.name],
      );

      const row = rows[0];

      return {
        id: row.id,
        name: row.name,
        deleted_at: row.deleted_at,
      };
    },

    async updateById(
      id: string,
      ingredient: Partial<Omit<Ingredient, "id" | "deleted_at">>,
    ): Promise<Ingredient> {
      const { rows } = await pool.query(
        "UPDATE ingredients SET name = $1 WHERE id = $2 AND deleted_at IS NULL RETURNING id, name, deleted_at",
        [ingredient.name, id],
      );

      if (rows.length === 0) {
        throw new Error(`Ingredient with id ${id} not found`);
      }

      const row = rows[0];

      return {
        id: row.id,
        name: row.name,
        deleted_at: row.deleted_at,
      };
    },

    async softDeleteById(id: string): Promise<Ingredient> {
      const { rows } = await pool.query(
        "UPDATE ingredients SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id, name, deleted_at",
        [id],
      );

      if (rows.length === 0) {
        throw new Error(`Ingredient with id ${id} not found`);
      }

      const row = rows[0];

      return {
        id: row.id,
        name: row.name,
        deleted_at: row.deleted_at,
      };
    },
  };
}
