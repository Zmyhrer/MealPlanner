namespace backend.Models
{
  public class Setting
  {
    public Guid id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public bool DarkMode { get; set; }
  }
}