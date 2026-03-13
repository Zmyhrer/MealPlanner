namespace backend.DTO;

public class CreateMealRequest
{
    public string name { get; set; } = String.Empty;
    public int serving_calories { get; set; }
    public string instructions { get; set; } = String.Empty;
    public Guid user_id { get; set; }
    public List<CreateIngredientRequest>? ingredients { get; set; }
}

