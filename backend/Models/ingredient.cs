using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Ingredient
    {
        public Guid id { get; set; }
        public string name { get; set; } = string.Empty;
        public DateTime? deleted_at { get; set; }

        //Navigation Property
        public ICollection<MealIngredient> meal_ingredients { get; set; } = new List<MealIngredient>();

    }
}