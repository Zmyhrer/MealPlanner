// server.ts
import { getAllMeals } from "./src/services/mealService";

app.get("/api/meals", (req, res) => {
  try {
    const data = getAllMeals(); // Call the service
    res.json({ data });
  } catch (error) {
    // Centralized error handling would go here
    res.status(500).json({ error: "Failed to fetch meals." });
  }
});
