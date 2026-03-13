namespace backend.DTO
{
    public class MealIngredientResponse
    {
        public required Guid ingredient_id { get; set; }
        public required string name { get; set; }
        public decimal? quantity { get; set; }
        public string? unit { get; set; }
    }
}