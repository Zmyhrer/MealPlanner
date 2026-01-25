import * as instructionsService from "../services/instructionsService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  instructionsService,
  "addInstruction",
  "updateInstruction",
  "deleteInstruction",
);

export default router;
