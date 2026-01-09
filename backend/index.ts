import express from "express";
import cors from "cors";
import mealsRouter from "./routes/meals";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/meals", mealsRouter);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
