import { useMemo } from "react";
import { WeeklyPlan, Ingredient, UnitSystem } from "@/lib/types";
import { CustomItem, AggregatedItem } from "@/types";

interface UseGroceryAggregationProps {
  weeklyPlan: WeeklyPlan;
  ingredients: Ingredient[];
  customItems: CustomItem[];
}

export const useGroceryAggregation = ({
  weeklyPlan,
  ingredients,
  customItems,
}: UseGroceryAggregationProps) => {
  const aggregatedList = useMemo<Record<string, AggregatedItem[]>>(() => {
    const list: { [key: string]: AggregatedItem } = {};

    // Process all meals including snacks array
    weeklyPlan.days.forEach((day) => {
      const allScheduled = [
        day.meals.breakfast,
        day.meals.lunch,
        day.meals.dinner,
        ...day.meals.snacks,
      ];

      allScheduled.forEach((meal) => {
        if (meal) {
          const scale = meal.servings / meal.recipe.servings;
          meal.recipe.ingredients.forEach((ri) => {
            const baseIng = ingredients.find((i) => i.id === ri.ingredientId);
            if (!baseIng) return;

            const key = baseIng.id;
            if (list[key]) {
              list[key].amount += ri.amount * scale;
            } else {
              list[key] = {
                id: baseIng.id,
                name: baseIng.name,
                category: baseIng.category,
                amount: ri.amount * scale,
                unit: ri.unit,
              };
            }
          });
        }
      });
    });

    const categories: Record<string, AggregatedItem[]> = {};

    // Add planned items
    Object.values(list).forEach((item) => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    // Add custom items
    customItems.forEach((item) => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push({
        id: item.id,
        name: item.name,
        amount: item.amount,
        unit: item.unit,
        category: item.category,
        isCustom: true,
      });
    });

    // Alphabetize items inside categories
    Object.keys(categories).forEach((cat) => {
      categories[cat].sort((a, b) => a.name.localeCompare(b.name));
    });

    return categories;
  }, [weeklyPlan, ingredients, customItems]);

  const sortedCategoryKeys = useMemo(
    () => Object.keys(aggregatedList).sort((a, b) => a.localeCompare(b)),
    [aggregatedList]
  );

  const isEmpty = sortedCategoryKeys.length === 0;

  return {
    aggregatedList,
    sortedCategoryKeys,
    isEmpty,
  };
};
