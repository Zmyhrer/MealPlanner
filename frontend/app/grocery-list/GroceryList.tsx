"use client";

import React from "react";
import { WeeklyPlan, Ingredient, UnitSystem } from "@/lib/types";
import { useGroceryAggregation } from "./hooks/useGroceryAggregation";
import { useCustomItems } from "./hooks/useCustomItems";
import { useGrocerySelection } from "./hooks/useGrocerySelection";
import { useUnitFormatting } from "./hooks/useUnitFormatting";
import { GroceryListHeader } from "./components/GroceryListHeader";
import { GroceryCategorySection } from "./components/GroceryCategorySection";
import { EmptyState } from "./components/EmptyState";
import { CustomItem, AggregatedItem } from "@/types";

interface GroceryListProps {
  weeklyPlan: WeeklyPlan;
  ingredients: Ingredient[];
  unitSystem: UnitSystem;
  customItems: CustomItem[];
  onUpdateCustomItems: (items: CustomItem[]) => void;
}

export const GroceryList: React.FC<GroceryListProps> = ({
  weeklyPlan,
  ingredients,
  unitSystem,
  customItems,
  onUpdateCustomItems,
}) => {
  const { aggregatedList, sortedCategoryKeys, isEmpty } = useGroceryAggregation(
    {
      weeklyPlan,
      ingredients,
      customItems,
    }
  );

  const {
    newItemName,
    newItemCategory,
    setNewItemName,
    setNewItemCategory,
    addCustomItem,
    removeCustomItem,
    toggleCustomItem,
  } = useCustomItems({
    initialCustomItems: customItems,
    onUpdateCustomItems,
  });

  const { toggleItem, isItemChecked } = useGrocerySelection();
  const { formatAmount } = useUnitFormatting(unitSystem);

  const getIsChecked = (item: AggregatedItem) => {
    return item.isCustom
      ? customItems.find((ci) => ci.id === item.id)?.checked || false
      : isItemChecked(item.id);
  };

  const handleToggleItem = (item: AggregatedItem) => {
    if (item.isCustom) {
      toggleCustomItem(item.id);
    } else {
      toggleItem(item.id);
    }
  };

  return (
    <div className="space-y-6">
      <GroceryListHeader
        newItemName={newItemName}
        newItemCategory={newItemCategory}
        onNameChange={setNewItemName}
        onCategoryChange={setNewItemCategory}
        onAddItem={addCustomItem}
      />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCategoryKeys.map((category) => (
            <GroceryCategorySection
              key={category}
              category={category}
              items={aggregatedList[category]}
              getIsChecked={getIsChecked}
              formatAmount={formatAmount}
              onToggleItem={handleToggleItem}
              onRemoveCustomItem={removeCustomItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};
