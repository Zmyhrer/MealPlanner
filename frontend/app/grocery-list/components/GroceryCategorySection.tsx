"use client";

import { AggregatedItem } from "@/types";
import { GroceryListItem } from "./GroceryListItem";

interface GroceryCategorySectionProps {
  category: string;
  items: AggregatedItem[];
  getIsChecked: (item: AggregatedItem) => boolean;
  formatAmount: (amount: number, unit: string) => string;
  onToggleItem: (item: AggregatedItem) => void;
  onRemoveCustomItem?: (id: string) => void;
}

export const GroceryCategorySection: React.FC<GroceryCategorySectionProps> = ({
  category,
  items,
  getIsChecked,
  formatAmount,
  onToggleItem,
  onRemoveCustomItem,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-fit">
      <h3 className="font-black text-indigo-500 text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-slate-50 dark:border-slate-700 pb-2">
        {category}
      </h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <GroceryListItem
            key={item.id}
            item={item}
            isChecked={getIsChecked(item)}
            formattedAmount={formatAmount(item.amount, item.unit)}
            onToggle={() => onToggleItem(item)}
            onRemove={
              item.isCustom && onRemoveCustomItem
                ? () => onRemoveCustomItem(item.id)
                : undefined
            }
          />
        ))}
      </ul>
    </div>
  );
};
