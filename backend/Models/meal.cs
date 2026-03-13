using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
  public class Meal
  {
    public Guid id { get; set; }
    public Guid user_id { get; set; }
    public string name { get; set; } = string.Empty;
    public int? serving_calories { get; set; }
    public string? instructions { get; set; }
    public DateTime? deleted_at { get; set; }

    //Navigation Property
    public ICollection<MealIngredient> meal_ingredients { get; set; } = new List<MealIngredient>();
  }
}