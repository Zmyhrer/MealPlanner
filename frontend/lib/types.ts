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
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
  DESSERT = "dessert",
  APPETIZER = "appetizer",
  SIDE = "side",
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
  date: string;
  meals: {
    breakfast?: ScheduledMeal | null;
    lunch?: ScheduledMeal | null;
    dinner?: ScheduledMeal | null;
    snacks: ScheduledMeal[];
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

export interface SuggestedIngredient {
  name: string;
  amount: number;
  unit: string;
  category: string;
  nutrientsPerUnit: Nutrients;
}

export interface GeminiRecipeResponse {
  title: string;
  type: string;
  ingredients: SuggestedIngredient[];
  instructions: string[];
  prepTime: number;
}

// Additional interfaces for form state
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

export interface RecipeBookProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
  ingredients: Ingredient[];
  onAddIngredients: (ings: Ingredient[]) => void;
  unitSystem: UnitSystem;
  dietaryRestrictions: string[];
}

// Helper types for planner
export type PlannerMealType =
  | MealType.BREAKFAST
  | MealType.LUNCH
  | MealType.DINNER
  | MealType.SNACK;

// Default preferences
export const INITIAL_PREFERENCES: UserPreferences = {
  unitSystem: UnitSystem.METRIC,
  theme: Theme.LIGHT,
  dietaryRestrictions: ["Vegetarian"],
  startDayOfWeek: DayOfWeek.MONDAY,
};

// Helper function to create empty day plan
export const createEmptyDayPlan = (date: Date): DayPlan => ({
  date: date.toISOString().split("T")[0],
  meals: {
    breakfast: null,
    lunch: null,
    dinner: null,
    snacks: [],
  },
});

// Helper function to create empty weekly plan
export const createEmptyWeeklyPlan = (startDate: Date): WeeklyPlan => {
  const days: DayPlan[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(createEmptyDayPlan(date));
  }

  return {
    weekId: `week-${startDate.toISOString().split("T")[0]}`,
    days,
  };
};

// Type guard for MealType
export const isMealType = (value: string): value is MealType => {
  return Object.values(MealType).includes(value as MealType);
};

// Helper function to get meal type label
export const getMealTypeLabel = (type: MealType): string => {
  switch (type) {
    case MealType.BREAKFAST:
      return "Breakfast";
    case MealType.LUNCH:
      return "Lunch";
    case MealType.DINNER:
      return "Dinner";
    case MealType.SNACK:
      return "Snack";
    case MealType.DESSERT:
      return "Dessert";
    case MealType.APPETIZER:
      return "Appetizer";
    case MealType.SIDE:
      return "Side Dish";
    default:
      return type;
  }
};

// Helper function to get all meal type options for forms
export const getMealTypeOptions = () => [
  { value: MealType.BREAKFAST, label: getMealTypeLabel(MealType.BREAKFAST) },
  { value: MealType.LUNCH, label: getMealTypeLabel(MealType.LUNCH) },
  { value: MealType.DINNER, label: getMealTypeLabel(MealType.DINNER) },
  { value: MealType.SNACK, label: getMealTypeLabel(MealType.SNACK) },
  { value: MealType.DESSERT, label: getMealTypeLabel(MealType.DESSERT) },
  { value: MealType.APPETIZER, label: getMealTypeLabel(MealType.APPETIZER) },
  { value: MealType.SIDE, label: getMealTypeLabel(MealType.SIDE) },
];
