using Microsoft.AspNetCore.Mvc;
using backend.Database;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{

    private readonly AppDbContext _context;

    public DatabaseController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet("test-db")]
    public async Task<IActionResult> TestDatabase()
    {
        var canConnect = await _context.Database.CanConnectAsync();

        if (!canConnect)
        {
            return StatusCode(500, "Database connection failed");
        }

        return Ok("Database connection successful");

    }
}