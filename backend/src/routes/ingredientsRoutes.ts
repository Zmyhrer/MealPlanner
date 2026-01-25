import * as ingredientsService from "../services/ingredientsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  ingredientsService,
  "addIngredient",
  "updateIngredient",
  "deleteIngredient",
);

export default router;
