import express from "express";
import pool from "./database/connection";
import ingredientNutrientsRoutes from "./routes/ingredientNutrientsRoutes";
import ingredientsRoutes from "./routes/ingredientsRoutes";
import mealIngredientsRoutes from "./routes/mealIngredientsRoutes";
import mealsRoutes from "./routes/mealsRoutes";
import mealTagsRoutes from "./routes/mealTagsRoutes";
import nutrientsRoutes from "./routes/nutrientsRoutes";
import scheduledMealsRoutes from "./routes/scheduledMealsRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import userPreferencesRoutes from "./routes/userPreferencesRoutes";
import usersRoutes from "./routes/usersRoutes";

const app = express();
app.use(express.json());

//Routes
app.use("/ingredientNutrients", ingredientNutrientsRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/mealIngredients", mealIngredientsRoutes);
app.use("/meals", mealsRoutes);
app.use("/mealTags", mealTagsRoutes);
app.use("/nutrients", nutrientsRoutes);
app.use("/scheduledMeals", scheduledMealsRoutes);
app.use("/settings", settingsRoutes);
app.use("/userPreferences", userPreferencesRoutes);
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
