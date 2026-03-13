using backend.Database;
using backend.Models;
using backend.DTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class MealService
    {
        private readonly AppDbContext _context;

        public MealService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<MealResponse>> GetAllMealsAsync()
        {
            var meals = await _context.meals
                .Include(m => m.meal_ingredients)
                    .ThenInclude(mi => mi.ingredient)
                .ToListAsync();

            return meals.Select(m => new MealResponse
            {
                id = m.id,
                name = m.name,
                serving_calories = m.serving_calories,
                instructions = m.instructions,
                ingredients = m.meal_ingredients
                    .Where(mi => mi.ingredient != null)
                    .Select(mi => new MealIngredientResponse
                    {
                        ingredient_id = mi.ingredient!.id,
                        name = mi.ingredient!.name,
                        quantity = mi.quantity,
                        unit = mi.unit
                    })
                    .ToList()
            }).ToList();
        }

        public async Task<MealResponse?> GetMealByIdAsync(Guid id)
        {
            var meal = await _context.meals
                .Include(m => m.meal_ingredients)
                    .ThenInclude(mi => mi.ingredient)
                .FirstOrDefaultAsync(m => m.id == id);

            if (meal == null) return null;

            return new MealResponse
            {
                id = meal.id,
                name = meal.name,
                serving_calories = meal.serving_calories,
                instructions = meal.instructions,
                ingredients = meal.meal_ingredients
                    .Where(mi => mi.ingredient != null)
                    .Select(mi => new MealIngredientResponse
                    {
                        ingredient_id = mi.ingredient!.id,
                        name = mi.ingredient!.name,
                        quantity = mi.quantity,
                        unit = mi.unit
                    })
                    .ToList()
            };
        }

        public async Task<MealResponse> CreateMealAsync(CreateMealRequest request)
        {
            var meal = new Meal
            {
                id = Guid.NewGuid(),
                name = request.name,
                serving_calories = request.serving_calories,
                instructions = request.instructions,
                user_id = request.user_id
            };

            _context.meals.Add(meal);

            if (request.ingredients != null)
            {
                foreach (var ingredientReq in request.ingredients)
                {
                    var normalizedName = ingredientReq.name.Trim().ToLower();

                    var ingredient = await _context.ingredients
                        .FirstOrDefaultAsync(i => i.name.ToLower() == normalizedName);

                    if (ingredient == null)
                    {
                        ingredient = new Ingredient
                        {
                            id = Guid.NewGuid(),
                            name = ingredientReq.name.Trim()
                        };
                        _context.ingredients.Add(ingredient);
                    }

                    var mealIngredient = new MealIngredient
                    {
                        id = Guid.NewGuid(),
                        meal_id = meal.id,
                        ingredient_id = ingredient.id,
                        quantity = ingredientReq.quantity,
                        unit = ingredientReq.unit
                    };

                    _context.meal_ingredients.Add(mealIngredient);
                }
            }

            await _context.SaveChangesAsync();

            return new MealResponse
            {
                id = meal.id,
                name = meal.name,
                serving_calories = meal.serving_calories,
                instructions = meal.instructions,
                ingredients = meal.meal_ingredients
                    .Where(mi => mi.ingredient != null)
                    .Select(mi => new MealIngredientResponse
                    {
                        ingredient_id = mi.ingredient!.id,
                        name = mi.ingredient!.name,
                        quantity = mi.quantity,
                        unit = mi.unit
                    })
                    .ToList()
            };
        }

        public async Task<bool> DeleteMealAsync(Guid id)
        {
            var meal = await _context.meals.FindAsync(id);
            if (meal == null) return false;

            var mealIngredients = _context.meal_ingredients.Where(mi => mi.meal_id == id);
            _context.meal_ingredients.RemoveRange(mealIngredients);
            _context.meals.Remove(meal);

            await _context.SaveChangesAsync();
            return true;
        }
    }
}