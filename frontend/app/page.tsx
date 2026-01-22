"use client";

import { useState } from "react";
import { ThemeWrapper } from "./components/ThemeWrapper";
import { Sidebar } from "./components/Sidebar";
import { Planner } from "./planner/Planner";
import { GroceryList } from "./grocery-list/GroceryList";
import { Settings } from "./settings/Settings";
import { IngredientDatabase } from "./ingredient-database/IngredientDatabase";
import { RecipeBook } from "./recipe-book/RecipeBook";
import {
  usePreferences,
  useIngredients,
  useRecipes,
  useWeeklyPlans,
  useCustomGroceryItems,
} from "@/lib/hooks/useAppStorage";
import {
  WeeklyPlan,
  DayOfWeek,
  Ingredient,
  Recipe,
  ScheduledMeal,
} from "@/lib/types";

/** Get the start date of the week based on user preference */
const getWeekStartDate = (date: Date, startDay: DayOfWeek) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const currentDay = d.getDay();
  const diff = (currentDay - startDay + 7) % 7;
  d.setDate(d.getDate() - diff);
  return d;
};

/** Generate a unique week ID for the start-of-week date */
const getWeekId = (date: Date, startDay: DayOfWeek) => {
  const start = getWeekStartDate(date, startDay);
  return `W-${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
};

/** Generate an empty weekly plan starting from preferred start-of-week */
const generateEmptyWeek = (date: Date, startDay: DayOfWeek): WeeklyPlan => {
  const start = getWeekStartDate(date, startDay);
  const days = Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + i);
    return { date: dayDate.toISOString(), meals: { snacks: [] } };
  });
  return { weekId: getWeekId(start, startDay), days };
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "planner" | "groceries" | "ingredients" | "recipes" | "settings"
  >("planner");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [preferences, setPreferences] = usePreferences();
  const [ingredients, setIngredients] = useIngredients();
  const [userRecipes, setUserRecipes] = useRecipes();
  const [plans, setPlans] = useWeeklyPlans();
  const [customGroceryItems, setCustomGroceryItems] = useCustomGroceryItems();

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
      return [...prev, ...newIngs.filter((ni) => !existingIds.has(ni.id))];
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

  /** ✅ Update recipe AND all scheduled meals that reference it */
  const updateUserRecipe = (updatedRecipe: Recipe) => {
    // Update recipes list
    setUserRecipes((prev) =>
      prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );

    // Update all plans that reference this recipe
    setPlans((prevPlans) => {
      const updatedPlans = { ...prevPlans };

      Object.keys(updatedPlans).forEach((weekId) => {
        const plan = updatedPlans[weekId];
        const updatedDays = plan.days.map((day) => {
          // Create updated meals object with proper structure
          const meals = {
            breakfast: day.meals.breakfast
              ? day.meals.breakfast.recipe.id === updatedRecipe.id
                ? { ...day.meals.breakfast, recipe: updatedRecipe }
                : day.meals.breakfast
              : null,
            lunch: day.meals.lunch
              ? day.meals.lunch.recipe.id === updatedRecipe.id
                ? { ...day.meals.lunch, recipe: updatedRecipe }
                : day.meals.lunch
              : null,
            dinner: day.meals.dinner
              ? day.meals.dinner.recipe.id === updatedRecipe.id
                ? { ...day.meals.dinner, recipe: updatedRecipe }
                : day.meals.dinner
              : null,
            snacks: day.meals.snacks.map((snack) =>
              snack.recipe.id === updatedRecipe.id
                ? { ...snack, recipe: updatedRecipe }
                : snack
            ),
          };

          return { ...day, meals };
        });

        updatedPlans[weekId] = { ...plan, days: updatedDays };
      });

      return updatedPlans;
    });
  };

  const navigateWeeks = (days: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + days);
      return next;
    });
  };

  const goToToday = () => setCurrentDate(new Date());

  return (
    <ThemeWrapper theme={preferences.theme}>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-y-auto px-4 md:px-6 mb-20 md:mb-0 hide-scrollbar bg-slate-50 dark:bg-slate-900/40">
          <div className="max-w-[1920px] mx-auto">
            {activeTab === "planner" && (
              <Planner
                weeklyPlan={currentPlan}
                onUpdatePlan={updatePlan}
                ingredients={ingredients}
                userRecipes={userRecipes}
                unitSystem={preferences.unitSystem}
                onNavigate={navigateWeeks}
                startDayOfWeek={preferences.startDayOfWeek}
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
}
