using backend.Database;
using backend.Services;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Register DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Services
builder.Services.AddScoped<MealService>();

// Register Controllers
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();