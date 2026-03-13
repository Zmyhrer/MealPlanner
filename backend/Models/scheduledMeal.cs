namespace backend.Models


{
  public enum MealType
  {
    Breakfast, Lunch, Dinner, Snack, Appetizer
  }
  public class ScheduledMeal
  {
    public Guid id { get; set; }
    public string MealId { get; set; } = string.Empty;
    public MealType MealType { get; set; }
  }
}