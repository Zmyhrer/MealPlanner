"use client";

import { useFallbackStorage } from "./useFallbackStorage";
import { UserPreferences, Ingredient, Recipe, WeeklyPlan } from "@/lib/types";
import { INITIAL_PREFERENCES } from "@/lib/types";

const weeklyPlanOptions = {
  serializer: (value: { [key: string]: WeeklyPlan }) => JSON.stringify(value),
  deserializer: (value: string): { [key: string]: WeeklyPlan } => {
    try {
      const parsed = JSON.parse(value) as { [key: string]: WeeklyPlan };
      const result: { [key: string]: WeeklyPlan } = {};

      for (const [key, plan] of Object.entries(parsed)) {
        if (plan && typeof plan === "object" && "days" in plan) {
          result[key] = {
            ...plan,
            days:
              plan.days?.map((day) => ({
                ...day,
                date: new Date(day.date).toISOString(),
              })) || [],
          };
        }
      }
      return result;
    } catch (error) {
      console.error("Failed to deserialize weekly plans:", error);
      return {};
    }
  },
};

export const usePreferences = () =>
  useFallbackStorage<UserPreferences>("culinary_prefs", INITIAL_PREFERENCES);

export const useIngredients = () =>
  useFallbackStorage<Ingredient[]>("culinary_ingredients", []);

export const useRecipes = () =>
  useFallbackStorage<Recipe[]>("culinary_user_recipes", []);

export const useWeeklyPlans = () =>
  useFallbackStorage<{ [key: string]: WeeklyPlan }>(
    "culinary_plans",
    {},
    weeklyPlanOptions
  );

export const useCustomGroceryItems = () =>
  useFallbackStorage<
    {
      id: string;
      name: string;
      amount: number;
      unit: string;
      category: string;
      checked: boolean;
    }[]
  >("culinary_custom_groceries", []);
