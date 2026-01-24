export type UpdateIngredientNutrientInput = {
  ingredient_id?: string;
  nutrient_id?: string;
  unit?: string;
  value?: number;
};

export type UpdateIngredientInput = { name: string };

export type UpdateUserInput = {
  email?: string;
  name?: string;
};
