import { useState, useMemo } from "react";
import { Ingredient } from "@/lib/types";

export const useIngredientSearch = (ingredients: Ingredient[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIngredients = useMemo(() => {
    return ingredients
      .filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [ingredients, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredIngredients,
  };
};
