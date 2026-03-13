
namespace backend.DTO
{
    public class MealResponse
    {
        public required Guid id { get; set; }
        public required string name { get; set; }
        public int? serving_calories { get; set; }
        public string? instructions { get; set; }
        public List<MealIngredientResponse> ingredients { get; set; } = new();
    }
}