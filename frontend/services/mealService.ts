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

export async function addMeal(meal: Meal) {
  const res = await fetch("/api/meals/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
