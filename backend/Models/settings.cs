namespace MealPlanner.Models
{
  public class Setting
  {
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public bool DarkMode { get; set; }
  }
}