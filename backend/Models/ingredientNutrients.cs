using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Ingredient_Nutrient
{
  [Key]
  [Required]
  public string id { get; set; } = string.Empty;

  [Required]
  public string ingredient_id { get; set; } = string.Empty;

  [Required]
  public string nutrient_id { get; set; } = string.Empty;

  public string unit { get; set; } = string.Empty;

  public int value { get; set; }
}
