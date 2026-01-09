// src/services/mealService.ts
import { findAll } from "../repositories/mealRepository";

export const getAllMeals = () => {
  // Business logic could go here. E.g., filter out meals for deleted users.
  const meals = findAll();
  return meals;
};
