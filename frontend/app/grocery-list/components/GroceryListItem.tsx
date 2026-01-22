"use client";

import { AggregatedItem } from "@/types";

interface GroceryListItemProps {
  item: AggregatedItem;
  isChecked: boolean;
  formattedAmount: string;
  onToggle: () => void;
  onRemove?: () => void;
}

export const GroceryListItem: React.FC<GroceryListItemProps> = ({
  item,
  isChecked,
  formattedAmount,
  onToggle,
  onRemove,
}) => {
  return (
    <li className="flex items-start gap-3 group">
      <button
        onClick={onToggle}
        className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 ${
          isChecked
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-slate-300 dark:border-slate-600 hover:border-indigo-400"
        }`}
      >
        {isChecked && (
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div
          className={`text-sm font-medium transition-all truncate ${
            isChecked
              ? "line-through text-slate-400"
              : "text-slate-700 dark:text-slate-200"
          }`}
        >
          {item.name}
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          {formattedAmount}
        </div>
      </div>
      {item.isCustom && onRemove && (
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-xs"
        >
          ✕
        </button>
      )}
    </li>
  );
};
