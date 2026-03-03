using System;

namespace MealPlanner.Models
{
    public class Ingredient
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime? DeletedAt { get; set; }
    }

}