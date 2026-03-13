namespace backend.Models
{
  public class UserPreference
  {
    public Guid id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string PreferenceType { get; set; } = string.Empty;
  }
}