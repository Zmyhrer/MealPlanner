import * as nutrientsService from "../services/entities/nutrientsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  nutrientsService,
  "addNutrient",
  "updateNutrient",
  "deleteNutrient",
);

export default router;
