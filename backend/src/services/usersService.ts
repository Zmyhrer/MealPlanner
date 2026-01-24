import * as usersRepo from "../repositories/usersRepository";
import { Users } from "../models/users";
import { UpdateUserInput } from "./types";

export async function addUser(email: string, name: string): Promise<Users> {
  if (!email || email.trim().length === 0) {
    throw new Error("User email is required");
  }
  if (!name || name.trim().length === 0) {
    throw new Error("User name is required");
  }
  return await usersRepo.addUser(email, name);
}

export async function updateUser(
  id: string,
  updates: UpdateUserInput,
): Promise<Users> {
  if (!id?.trim()) {
    throw new Error("User id is required");
  }
  if (!updates.email && !updates.name) {
    throw new Error("At least one field must be provided");
  }
  return await usersRepo.updateUser(id, updates);
}

export async function deleteUser(id: string): Promise<Users> {
  if (!id?.trim()) {
    throw new Error("User id is required");
  }

  const deletedUser = await usersRepo.deleteUser(id);

  if (!deletedUser) {
    throw new Error("User not found");
  }

  return deletedUser;
}
