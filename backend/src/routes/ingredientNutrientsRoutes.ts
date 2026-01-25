import * as ingredientNutrientsService from "../services/ingredientNutrientsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  ingredientNutrientsService,
  "addIngredientNutrients",
  "updateIngredientNutrients",
  "deleteIngredientNutrients",
);

export default router;
