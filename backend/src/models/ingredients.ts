import { toNamespacedPath } from "node:path";

export type Ingredient = {
  id: string;
  name: string;
  deleted_at?: Date | null;
};

// Factory for creating a new ingredient
export function createIngredient(name: string): Omit<Ingredient, "id"> {
  if (!name || name.trim() === "") {
    throw new Error("Ingredient name is required");
  }
  return { name, deleted_at: null };
}

// Factory for updating an ingredient
export function updateIngredient(name: string): Omit<Ingredient, "id"> {
  if (name !== undefined && name.trim() === "") {
    throw new Error("Ingredient name cannot be empty");
  }
  return { name: name };
}
