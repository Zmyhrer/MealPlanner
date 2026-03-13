namespace backend.Models
{
  public class MealTag
  {
    public Guid id { get; set; }
    public string MealId { get; set; } = string.Empty;
    public string Tag { get; set; } = string.Empty;
  }
}