using backend.DTO;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MealsController : ControllerBase
{
    private readonly MealService _mealService;

    public MealsController(MealService mealService)
    {
        _mealService = mealService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMeals()
    {
        var meals = await _mealService.GetAllMealsAsync();
        return Ok(meals);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMealById(Guid id)
    {
        var meal = await _mealService.GetMealByIdAsync(id);
        return meal is not null ? Ok(meal) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> CreateMeal([FromBody] CreateMealRequest request)
    {
        try
        {
            var meal = await _mealService.CreateMealAsync(request);
            return CreatedAtAction(nameof(GetMealById), new { id = meal.id }, meal);
        }
        catch
        {
            return StatusCode(500, "An error occurred while creating the meal.");
        }
    }

    [HttpPatch("{id}")]
    public IActionResult UpdateById(Guid id) => Ok($"Updated meal {id}");

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(Guid id)
    {
        try
        {
            var deleted = await _mealService.DeleteMealAsync(id);
            return deleted ? NoContent() : NotFound();
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the meal.");
        }
    }
}