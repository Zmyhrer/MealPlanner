"use server";
import meals from "@/data/mockMeals.json";

export interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

export interface Meal {
  id?: string;
  mealName: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string;
}

async function handleResponse(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || res.statusText);
  }
  return data;
}

export async function addMeal(meal: Meal): Promise<Meal> {
  const res = await fetch("/api/meals/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meal),
  });

  return handleResponse(res);
}

export async function updateMeal(meal: Meal): Promise<Meal> {
  const res = await fetch("/api/meals/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meal),
  });

  return handleResponse(res);
}

export async function getMealById(id: string): Promise<Meal> {
  // Try fetching from API
  try {
    const res = await fetch(`/api/meals/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    const data: Meal = await res.json();
    return data;
  } catch {
    // Fallback to mock data
    const meal = meals.find((m) => m.id === id);
    if (!meal) throw new Error("Meal not found");
    return meal;
  }
}
