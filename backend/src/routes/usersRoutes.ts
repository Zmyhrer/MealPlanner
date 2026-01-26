import * as usersService from "../services/entities/usersService";
import { createCrudRoutes } from "../utils/routesHelper";

const router = createCrudRoutes(
  usersService,
  "addUser",
  "updateUser",
  "deleteUser",
);

export default router;
