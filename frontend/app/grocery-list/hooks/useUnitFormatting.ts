import { UnitSystem } from "@/lib/types";

export const useUnitFormatting = (unitSystem: UnitSystem) => {
  const formatAmount = (amount: number, unit: string): string => {
    if (unit === "item") return "1 unit";

    if (
      unitSystem === UnitSystem.IMPERIAL &&
      (unit === "g" || unit === "grams" || unit === "ml")
    ) {
      const converted = amount * 0.035274;
      return `${converted.toFixed(2)} oz`;
    }

    if (
      unitSystem === UnitSystem.METRIC &&
      (unit === "oz" || unit === "fl oz")
    ) {
      const converted = amount * 28.3495;
      return `${converted.toFixed(0)} g`;
    }

    return `${amount.toFixed(1)} ${unit}`;
  };

  return { formatAmount };
};
