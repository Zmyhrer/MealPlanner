import { Router, Request, Response } from "express";
import * as usersService from "../services/usersService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const user = await usersService.addUser(email, name);
    res.status(201).json(user);
  } catch (err: any) {
    console.error("Error adding user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await usersService.updateUser(id, updates);
    res.status(200).json(user);
  } catch (err: any) {
    console.error("Error updating user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await usersService.deleteUser(id);
    res.status(200).json(user);
  } catch (err: any) {
    console.error("Error deleting user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;
