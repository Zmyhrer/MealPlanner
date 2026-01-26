import express from "express";
import request from "supertest";
import { createCrudRoutes } from "../src/utils/routesHelper";

describe("createCrudRoutes", () => {
  const fakeService = {
    addEntity: jest.fn().mockResolvedValue({ id: "1" }),
    updateEntity: jest.fn().mockResolvedValue({ id: "1", field: "x" }),
    deleteEntity: jest.fn().mockResolvedValue({ id: "1" }),
  };

  const router = createCrudRoutes(
    fakeService,
    "addEntity",
    "updateEntity",
    "deleteEntity",
  );
  const app = express();
  app.use(express.json());
  app.use("/test", router);

  it("POST / calls service.addEntity", async () => {
    const res = await request(app).post("/test").send({ field: "x" });
    expect(res.status).toBe(201);
    expect(fakeService.addEntity).toHaveBeenCalledWith("x"); // Object.values is used in helper
  });

  it("PATCH /:id calls service.updateEntity", async () => {
    const res = await request(app).patch("/test/1").send({ field: "y" });
    expect(res.status).toBe(200);
    expect(fakeService.updateEntity).toHaveBeenCalledWith("1", { field: "y" });
  });

  it("DELETE /:id calls service.deleteEntity", async () => {
    const res = await request(app).delete("/test/1");
    expect(res.status).toBe(200);
    expect(fakeService.deleteEntity).toHaveBeenCalledWith("1");
  });
});
