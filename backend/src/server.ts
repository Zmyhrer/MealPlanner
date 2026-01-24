import express from "express";
import pool from "./database/connection";
import usersRoutes from "./routes/usersRoutes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);

app.get("/ping", (req, res) => res.send("pong"));

// Startup Database Test
async function testDatabaseConnection() {
  try {
    await pool.query("SELECT 1;");
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

// Start server
(async () => {
  await testDatabaseConnection();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
