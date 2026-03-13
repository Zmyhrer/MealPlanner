namespace backend.Models
{
    public class User
    {
        public Guid id { get; set; }
        public string email { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
    }
}