using System;

namespace MealPlanner.Models
{
  public class Meal
  {
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int? ServingCalories { get; set; }
    public string? Instructions { get; set; }
    public DateTime? DeletedAt { get; set; }
  }
}
