"use client";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 text-4xl">
        🛒
      </div>
      <p className="text-slate-500 font-semibold text-lg">
        Your shopping list is empty.
      </p>
    </div>
  );
};
