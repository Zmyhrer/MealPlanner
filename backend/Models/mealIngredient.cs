using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
  public class MealIngredient
  {
    public Guid id { get; set; }
    public Guid meal_id { get; set; }
    public Guid ingredient_id { get; set; }
    public decimal quantity { get; set; }
    public string unit { get; set; } = string.Empty;

    //Navigation Properties
    public Meal? meal { get; set; }
    public Ingredient? ingredient { get; set; }
  }
}