import * as mealTagsService from "../services/mealTagsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  mealTagsService,
  "addMealTag",
  "updateMealTag",
  "deleteMealTag",
);

export default router;
