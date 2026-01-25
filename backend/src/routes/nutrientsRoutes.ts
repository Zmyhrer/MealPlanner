import * as nutrientsService from "../services/nutrientsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  nutrientsService,
  "addNutrient",
  "updateNutrient",
  "deleteNutrient",
);

export default router;
