import React, { useState, useEffect } from "react";
import { ThemeWrapper } from "./components/ThemeWrapper";
import { Sidebar } from "./components/Sidebar";
import { Planner } from "./components/Planner";
import { GroceryList } from "./components/GroceryList";
import { Settings } from "./components/Settings";
import { IngredientDatabase } from "./components/IngredientDatabase";
import { RecipeBook } from "./components/RecipeBook";
import {
  WeeklyPlan,
  UserPreferences,
  UnitSystem,
  Theme,
  DayPlan,
  Ingredient,
  Recipe,
  DayOfWeek,
  MealType,
} from "./types";

const INITIAL_PREFERENCES: UserPreferences = {
  unitSystem: UnitSystem.METRIC,
  theme: Theme.LIGHT,
  dietaryRestrictions: ["Vegetarian"],
  startDayOfWeek: DayOfWeek.MONDAY,
};

const getWeekId = (date: Date, startDay: DayOfWeek) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = d.getDate() - day + (day < startDay ? -7 : 0) + startDay;
  const start = new Date(d.setDate(diff));
  return `W-${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
};

const generateEmptyWeek = (
  startDate: Date,
  startDay: DayOfWeek
): WeeklyPlan => {
  const days: DayPlan[] = [];
  const d = new Date(startDate);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = d.getDate() - day + (day < startDay ? -7 : 0) + startDay;
  const start = new Date(d.setDate(diff));

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + i);
    days.push({
      date: dayDate.toISOString(),
      meals: {
        snacks: [],
      },
    });
  }

  return {
    weekId: getWeekId(start, startDay),
    days,
  };
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "planner" | "groceries" | "ingredients" | "recipes" | "settings"
  >("planner");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem("culinary_ingredients");
    return saved ? JSON.parse(saved) : [];
  });

  const [userRecipes, setUserRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem("culinary_user_recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [customGroceryItems, setCustomGroceryItems] = useState<
    {
      id: string;
      name: string;
      amount: number;
      unit: string;
      category: string;
      checked: boolean;
    }[]
  >(() => {
    const saved = localStorage.getItem("culinary_custom_groceries");
    return saved ? JSON.parse(saved) : [];
  });

  const [plans, setPlans] = useState<{ [key: string]: WeeklyPlan }>({});
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem("culinary_prefs");
    return saved ? JSON.parse(saved) : INITIAL_PREFERENCES;
  });

  useEffect(() => {
    localStorage.setItem("culinary_prefs", JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem("culinary_ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem("culinary_user_recipes", JSON.stringify(userRecipes));
  }, [userRecipes]);

  useEffect(() => {
    localStorage.setItem(
      "culinary_custom_groceries",
      JSON.stringify(customGroceryItems)
    );
  }, [customGroceryItems]);

  useEffect(() => {
    const savedPlans = localStorage.getItem("culinary_plans");
    if (savedPlans) setPlans(JSON.parse(savedPlans));
  }, []);

  useEffect(() => {
    localStorage.setItem("culinary_plans", JSON.stringify(plans));
  }, [plans]);

  const currentWeekId = getWeekId(currentDate, preferences.startDayOfWeek);
  const currentPlan =
    plans[currentWeekId] ||
    generateEmptyWeek(currentDate, preferences.startDayOfWeek);

  const updatePlan = (newPlan: WeeklyPlan) => {
    setPlans((prev) => ({ ...prev, [newPlan.weekId]: newPlan }));
  };

  const addIngredients = (newIngs: Ingredient[]) => {
    setIngredients((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const filtered = newIngs.filter((ni) => !existingIds.has(ni.id));
      return [...prev, ...filtered];
    });
  };

  const updateIngredient = (updated: Ingredient) => {
    setIngredients((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i))
    );
  };

  const addUserRecipe = (newRecipe: Recipe) => {
    setUserRecipes((prev) => [...prev, newRecipe]);
  };

  const updateUserRecipe = (updatedRecipe: Recipe) => {
    setUserRecipes((prev) =>
      prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
  };

  const navigateWeeks = (days: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + days);
    setCurrentDate(next);
  };

  const goToToday = () => setCurrentDate(new Date());

  return (
    <ThemeWrapper theme={preferences.theme}>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 mb-20 md:mb-0 hide-scrollbar bg-slate-50 dark:bg-slate-900/40">
          <div className="max-w-[1920px] mx-auto">
            {activeTab === "planner" && (
              <Planner
                weeklyPlan={currentPlan}
                onUpdatePlan={updatePlan}
                ingredients={ingredients}
                userRecipes={userRecipes}
                onAddIngredients={addIngredients}
                onAddUserRecipe={addUserRecipe}
                unitSystem={preferences.unitSystem}
                dietaryRestrictions={preferences.dietaryRestrictions}
                onNavigate={navigateWeeks}
                onGoToday={goToToday}
                onSetDate={setCurrentDate}
              />
            )}
            {activeTab === "recipes" && (
              <RecipeBook
                recipes={userRecipes}
                onAddRecipe={addUserRecipe}
                onUpdateRecipe={updateUserRecipe}
                ingredients={ingredients}
                onAddIngredients={addIngredients}
                unitSystem={preferences.unitSystem}
                dietaryRestrictions={preferences.dietaryRestrictions}
              />
            )}
            {activeTab === "groceries" && (
              <GroceryList
                weeklyPlan={currentPlan}
                ingredients={ingredients}
                unitSystem={preferences.unitSystem}
                customItems={customGroceryItems}
                onUpdateCustomItems={setCustomGroceryItems}
              />
            )}
            {activeTab === "ingredients" && (
              <IngredientDatabase
                ingredients={ingredients}
                onUpdateIngredient={updateIngredient}
              />
            )}
            {activeTab === "settings" && (
              <Settings
                preferences={preferences}
                onUpdatePreferences={setPreferences}
              />
            )}
          </div>
        </main>
      </div>
    </ThemeWrapper>
  );
};

export default App;
