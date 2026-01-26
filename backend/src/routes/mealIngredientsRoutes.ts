import * as mealIngredientsService from "../services/entities/mealIngredientsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  mealIngredientsService,
  "addMealIngredient",
  "updateMealIngredient",
  "deleteMealIngredient",
);

export default router;
