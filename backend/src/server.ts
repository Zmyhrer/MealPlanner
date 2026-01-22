import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/meals", (req, res) => {
  const meals = {};
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
