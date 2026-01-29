import express from "express";
import pool from "./database/connection";
import IngredientsRoutes from "./routes/ingredientsRoutes";

const app = express();
app.use(express.json());

app.use("/ingredient", IngredientsRoutes());

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1;");
    return res.status(200).json({
      server: "Healthy",
      database: "Connected",
    });
  } catch {
    return res.status(500).json({
      server: "Healthy",
      database: "Disconnected",
    });
  }
});

(async () => {
  const PORT = process.env.PORT || 3000;

  try {
    await pool.query("SELECT 1;");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
})();
