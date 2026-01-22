"use client";

import { AddCustomItemForm } from "./AddCustomItemForm";

interface GroceryListHeaderProps {
  newItemName: string;
  newItemCategory: string;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAddItem: (e: React.FormEvent) => void;
}

export const GroceryListHeader: React.FC<GroceryListHeaderProps> = ({
  newItemName,
  newItemCategory,
  onNameChange,
  onCategoryChange,
  onAddItem,
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold">Grocery List</h2>
        <p className="text-slate-500 text-sm">
          Everything you need for the week
        </p>
      </div>
      <AddCustomItemForm
        newItemName={newItemName}
        newItemCategory={newItemCategory}
        onNameChange={onNameChange}
        onCategoryChange={onCategoryChange}
        onSubmit={onAddItem}
      />
    </header>
  );
};
