"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let meals = [
    {
        id: 1,
        name: "Chicken Salad",
        calories: 350,
    },
    {
        id: 2,
        name: "Oatmeal",
        calories: 200,
    },
];
// GET all meals
app.get("/meals", (req, res) => {
    res.json(meals);
});
app.get("meals/:id", (req, res) => {
    const meal = meals.find((m) => m.id === parseInt(req.params.id));
    if (!meal)
        return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
});
