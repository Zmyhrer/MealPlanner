"use client";

interface AddCustomItemFormProps {
  newItemName: string;
  newItemCategory: string;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddCustomItemForm: React.FC<AddCustomItemFormProps> = ({
  newItemName,
  newItemCategory,
  onNameChange,
  onCategoryChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <input
        value={newItemName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Add general item (shampoo...)"
        className="flex-1 bg-transparent border-none outline-none px-4 text-sm"
      />
      <select
        value={newItemCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-3 py-2 text-xs font-bold outline-none"
      >
        <option value="Household">Household</option>
        <option value="Hygiene">Hygiene</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Other">Other</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
      >
        Add
      </button>
    </form>
  );
};
