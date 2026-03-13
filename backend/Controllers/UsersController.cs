using Microsoft.AspNetCore.Mvc;
using backend.Database;
using Microsoft.EntityFrameworkCore;
using backend.Models;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{

    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    //api/users
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.users.ToListAsync();
        return Ok(users);
    }

    //api/users/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await _context.users.FindAsync(id);

        if (user == null)
            return NotFound();

        return Ok(user);
    }

    //api/users
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        if (user == null)
            return BadRequest("User data is required.");

        _context.users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.id }, user);
    }

    //api/users/{id}
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
    {
        var existing = await _context.users.FindAsync(id);

        if (existing == null)
            return NotFound();

        existing.name = user.name;
        existing.email = user.email;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }


    //api/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var user = await _context.users.FindAsync(id);

        if (user == null)
            return NotFound();

        _context.users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}