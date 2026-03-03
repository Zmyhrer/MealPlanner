using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MealsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(new[] { "Pizza", "Burger" });

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok($"Meal {id}");

    [HttpPatch("{id}")]
    public IActionResult UpdateById(int id) => Ok($"Updated meal {id}");

    [HttpDelete("{id}")]
    public IActionResult DeleteById(int id) => Ok($"Deleted meal {id}");
}