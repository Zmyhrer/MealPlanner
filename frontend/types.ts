export enum UnitSystem {
  IMPERIAL = "imperial",
  METRIC = "metric",
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export enum MealType {
  BREAKFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  SNACKS = "Snacks",
}

export interface Nutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  nutrientsPerUnit: Nutrients;
  unitType: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  type: MealType;
  ingredients: RecipeIngredient[];
  instructions: string[];
  prepTime: number;
  tags: string[];
  servings: number;
  image?: string;
}

export interface ScheduledMeal {
  recipe: Recipe;
  servings: number;
}

export interface DayPlan {
  date: string; // ISO string
  meals: {
    [MealType.BREAKFAST]?: ScheduledMeal | null;
    [MealType.LUNCH]?: ScheduledMeal | null;
    [MealType.DINNER]?: ScheduledMeal | null;
    Snacks: ScheduledMeal[]; // Supports multiple snacks
  };
}

export interface UserPreferences {
  unitSystem: UnitSystem;
  theme: Theme;
  dietaryRestrictions: string[];
  startDayOfWeek: DayOfWeek;
}

export interface WeeklyPlan {
  weekId: string;
  days: DayPlan[];
}

export interface RecipeBookProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
  ingredients: Ingredient[];
  onAddIngredients: (ings: Ingredient[]) => void;
  unitSystem: UnitSystem;
  dietaryRestrictions: string[];
}

export interface FormIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeFormData {
  title: string;
  type: MealType;
  prepTime: number;
  servings: number;
  tagsInput: string;
  ingredients: FormIngredient[];
  instructions: string[];
}

export interface CustomItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
  checked: boolean;
}

export interface AggregatedItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  isCustom?: boolean;
}

export interface GroceryListProps {
  weeklyPlan: WeeklyPlan;
  ingredients: Ingredient[];
  unitSystem: UnitSystem;
  customItems: CustomItem[];
  onUpdateCustomItems: (items: CustomItem[]) => void;
}

export interface CategoryGroup {
  [key: string]: AggregatedItem[];
}
