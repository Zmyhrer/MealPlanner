"use client";

interface IngredientSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const IngredientSearch: React.FC<IngredientSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full md:w-80">
      <input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search ingredients..."
        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-3.5 text-sm font-bold outline-none focus:border-indigo-500 shadow-sm transition-all"
      />
      <span className="absolute right-5 top-4 opacity-30">🔍</span>
    </div>
  );
};
