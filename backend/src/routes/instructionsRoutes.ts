import * as instructionsService from "../services/entities/instructionsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  instructionsService,
  "addInstruction",
  "updateInstruction",
  "deleteInstruction",
);

export default router;
