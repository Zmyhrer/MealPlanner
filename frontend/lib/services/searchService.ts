import { Recipe } from "../types";

export const filterRecipes = (recipes: Recipe[], query: string): Recipe[] => {
  if (!query.trim()) return recipes;

  const orGroups = query.split(/\s+or\s+/i);

  return recipes.filter((recipe) => {
    return orGroups.some((group) => {
      const criteria = group.trim().split(/\s+/);

      return criteria.every((criterion) => {
        if (criterion.startsWith("#")) {
          const tagToMatch = criterion.substring(1).toLowerCase();
          return recipe.tags.some((t) => t.toLowerCase().includes(tagToMatch));
        } else {
          const wordToMatch = criterion.toLowerCase();
          return recipe.title.toLowerCase().includes(wordToMatch);
        }
      });
    });
  });
};
