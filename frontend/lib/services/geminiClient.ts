import { MealType, UnitSystem, Ingredient } from "@/lib/types";

export interface SuggestedIngredient {
  name: string;
  amount: number;
  unit: string;
  category: string;
  nutrientsPerUnit: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface GeminiRecipeResponse {
  title: string;
  type: string;
  ingredients: SuggestedIngredient[];
  instructions: string[];
  prepTime: number;
  servings: number;
}

export interface GenerateRecipeResponse {
  recipe: GeminiRecipeResponse;
  suggestedIngredients: SuggestedIngredient[];
}

export async function generateRecipe(
  mealType: MealType,
  preferences: string[],
  unitSystem: UnitSystem,
  context?: string,
): Promise<GenerateRecipeResponse> {
  const systemPrompt = `You are a helpful recipe assistant. Follow these rules CAREFULLY:

1. FIRST, analyze the user's context. If they mention specific ingredients, instructions, or preferences, prioritize those.

2. If the user provides a recipe title, create a recipe that matches that title EXACTLY. For example:
   - "Butter toast" → ingredients: bread, butter (not steak, not fancy extras)
   - "Scrambled eggs" → ingredients: eggs, butter/oil, salt, pepper
   - "Peanut butter sandwich" → ingredients: bread, peanut butter
   - "Avocado toast" → ingredients: bread, avocado, salt, pepper (optional lemon)
   
3. If the user already has ingredients/instructions in their form, build upon them. Don't replace them unless asked.

4. Keep recipes SIMPLE and PRACTICAL. Only add ingredients that make sense for the recipe.

5. For common/simple recipes, use minimal ingredients. Don't add unnecessary extras.

6. Instructions should be clear, step-by-step, and match the recipe's complexity.

7. If the user mentions dietary restrictions or preferences, respect them.

8. Use appropriate units based on the system: ${
    unitSystem === UnitSystem.METRIC ? "metric (g, ml)" : "imperial (oz, cups)"
  }.

9. Output format must be valid JSON:
{
  "title": "Recipe Title (respect user's title if provided)",
  "type": "meal_type",
  "ingredients": [{"name": "ingredient", "amount": number, "unit": "unit"}],
  "instructions": ["step 1", "step 2"],
  "prepTime": number_in_minutes,
  "suggestedIngredients": [...]
}`;

  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mealType,
      preferences,
      unitSystem,
      context,
      systemPrompt, // Pass system prompt to API
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || "Failed to generate recipe");
  }

  return response.json();
}

export async function fetchIngredientNutrients(
  name: string,
  unit: string,
): Promise<Partial<Ingredient>> {
  const systemPrompt = `You are a nutrition data assistant. Analyze the ingredient and provide estimated nutritional information.
  
Rules:
1. Provide realistic estimates based on the ingredient name
2. Use standard nutritional values per the given unit
3. Categorize the ingredient appropriately (e.g., "Dairy", "Produce", "Protein", "Grain", "Condiment", "Other")
4. Return data in valid JSON format

Example responses:
For "butter, tbsp": {"category": "Dairy", "nutrientsPerUnit": {"calories": 102, "protein": 0.1, "carbs": 0, "fat": 11.5}}
For "bread, slice": {"category": "Grain", "nutrientsPerUnit": {"calories": 80, "protein": 3, "carbs": 15, "fat": 1}}
For "egg, unit": {"category": "Protein", "nutrientsPerUnit": {"calories": 72, "protein": 6, "carbs": 0.4, "fat": 5}}`;

  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredientName: name,
      unit,
      systemPrompt,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || "Failed to fetch ingredient nutrients");
  }

  return response.json();
}
