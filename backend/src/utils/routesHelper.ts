import { Router, Request, Response } from "express";

export function createCrudRoutes<ServiceType>(
  service: ServiceType,
  addMethod: keyof ServiceType,
  updateMethod: keyof ServiceType,
  deleteMethod: keyof ServiceType,
  idParam: string = "id",
): Router {
  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const result = await (service[addMethod] as any)(
        ...Object.values(req.body),
      );
      res.status(201).json(result);
    } catch (err: any) {
      console.error(`Error adding:`, err.message);
      res.status(400).json({ error: err.message });
    }
  });

  router.patch(`/:${idParam}`, async (req: Request, res: Response) => {
    try {
      const id = req.params[idParam];
      const updates = req.body;
      const result = await (service[updateMethod] as any)(id, updates);
      res.status(200).json(result);
    } catch (err: any) {
      console.error(`Error updating:`, err.message);
      res.status(400).json({ error: err.message });
    }
  });

  router.delete(`/:${idParam}`, async (req: Request, res: Response) => {
    try {
      const id = req.params[idParam];
      const result = await (service[deleteMethod] as any)(id);
      res.status(200).json(result);
    } catch (err: any) {
      console.error(`Error deleting:`, err.message);
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}
