namespace backend.DTO;

public class CreateIngredientRequest
{
    public string name { get; set; } = String.Empty;
    public decimal quantity { get; set; } = 1;
    public string unit { get; set; } = "unit";
}