enum Meal_Type {
  breakfast,
  lunch,
  dinner,
  snack,
  appetizer,
}

export interface Scheduled_Meals {
  id: string;
  meal_id: string;
  meal_type: Meal_Type;
}
