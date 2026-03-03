namespace MealPlanner.Models


{
  public enum MealType
  {
    Breakfast, Lunch, Dinner, Snack, Appetizer
  }
  public class ScheduledMeal
  {
    public string Id { get; set; } = string.Empty;
    public string MealId { get; set; } = string.Empty;
    public MealType MealType { get; set; }
  }
}