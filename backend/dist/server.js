"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pool = require("./database/connection"); // your pool module
const ingredientsRepo = require("./repositories/ingredientsRepository");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Startup test
(async () => {
    try {
        await pool.query("SELECT 1;");
        console.log("Database connected successfully.");
    }
    catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // stop server if DB is not reachable
    }
})();
// Routes
app.get("/ingredients", async (req, res) => {
    try {
        const ingredients = await ingredientsRepo.getAllIngredients();
        res.json(ingredients);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch ingredients" });
    }
});
app.post("/ingredients", async (req, res) => {
    try {
        const { name } = req.body;
        const ingredient = await ingredientsRepo.addIngredient(name);
        res.status(201).json(ingredient);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add ingredient" });
    }
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
