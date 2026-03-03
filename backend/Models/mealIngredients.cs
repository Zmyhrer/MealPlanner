namespace MealPlanner.Models
{
  public class MealIngredient
  {
    public string Id { get; set; } = string.Empty;
    public string MealId { get; set; } = string.Empty;
    public string IngredientId { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
  }
}