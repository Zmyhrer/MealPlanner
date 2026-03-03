namespace MealPlanner.Models
{
  public class Instruction
  {
    public string Id { get; set; } = string.Empty;
    public string MealId { get; set; } = string.Empty;
    public int Order { get; set; }
    public string Text { get; set; } = string.Empty;
  }
}