export interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

export interface Meal {
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
