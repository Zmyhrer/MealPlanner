export interface Meal {
  id: string;
  user_id: string;
  name: string;
  serving_calories?: number;
  instructions?: string;
  deleted_at?: Date | null;
}

// Factory for creating an Meal
export function createMeal(
  user_id: string,
  name: string,
  serving_calories?: number,
  instructions?: string,
): Omit<Meal, "id"> {
  if (!name || name.trim() === "") {
    throw new Error("Meal name is required");
  }

  return {
    user_id,
    name,
    serving_calories,
    instructions,
    deleted_at: null,
  };
}

// Factory for updating an Meal
export function updateMeal(fields: {
  name?: string;
  calories?: number;
  instructions?: string;
}): Partial<Omit<Meal, "id" | "user_id" | "deleted_at">> {
  if (fields.name !== undefined && fields.name.trim() === "") {
    throw new Error("Meal name cannot be empty");
  }

  return {
    ...fields,
  };
}
