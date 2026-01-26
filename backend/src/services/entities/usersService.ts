import * as usersRepo from "../../repositories/usersRepository";
import { User } from "../../models/users";
import { createCrudService } from "../../utils/serviceHelpers";

const repoWrapper = {
  add: usersRepo.addUser,
  update: usersRepo.updateUser,
  remove: usersRepo.deleteUser,
};

const usersService = createCrudService<
  Omit<User, "id">,
  { email?: string; name?: string },
  User
>("User", repoWrapper, ["email", "name"]);

export const addUser = usersService.add;
export const updateUser = usersService.update;
export const deleteUser = usersService.delete;
