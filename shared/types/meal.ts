export interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

export interface Meal {
  id: string;
  mealName: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string;
}
