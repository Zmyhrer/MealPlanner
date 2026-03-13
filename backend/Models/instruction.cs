namespace backend.Models
{
  public class Instruction
  {
    public Guid id { get; set; }
    public string MealId { get; set; } = string.Empty;
    public int Order { get; set; }
    public string Text { get; set; } = string.Empty;
  }
}