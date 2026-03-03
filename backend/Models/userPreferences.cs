namespace MealPlanner.Models
{
  public class UserPreference
  {
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string PreferenceType { get; set; } = string.Empty;
  }
}