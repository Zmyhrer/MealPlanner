import { Meal_Type } from "../models/scheduledMeals";

export type UpdateIngredientNutrientInput = {
  ingredient_id?: string;
  nutrient_id?: string;
  unit?: string;
  value?: number;
};

export type UpdateIngredientInput = { name?: string };

export type UpdateInstructionInput = {
  meal_id?: string;
  order?: number;
  text?: string;
};

export type UpdateMealIngredientInput = {
  meal_id?: string;
  ingredient_id?: string;
  quantity?: number;
  unit?: string;
};

export type UpdateMealInput = {
  user_id?: string;
  name?: string;
  calories?: number;
  instructions?: string;
};

export type UpdateMealTagInput = {
  meal_id?: string;
  tag?: string;
};

export type UpdateNutrientInput = {
  name?: string;
};

export type UpdateScheduledMealInput = {
  meal_id?: string;
  meal_type?: Meal_Type;
  date?: Date;
};

export type UpdateSettingInput = {
  user_id?: string;
  dark_mode?: boolean;
};

export type UpdateUserInput = {
  email?: string;
  name?: string;
};
