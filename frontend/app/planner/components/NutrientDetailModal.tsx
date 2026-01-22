"use client";

interface NutrientDetailModalProps {
  nutrients: {
    title: string;
    nut: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  formatMacro: (grams: number) => string;
  macroUnit: string;
  onClose: () => void;
}

export const NutrientDetailModal: React.FC<NutrientDetailModalProps> = ({
  nutrients,
  formatMacro,
  macroUnit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[200] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[3rem] shadow-2xl p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-indigo-600" />
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <header className="mb-10">
          <h3 className="text-3xl font-black mb-2 tracking-tight">
            {nutrients.title}
          </h3>
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
            Comprehensive Nutrition
          </p>
        </header>

        <div className="space-y-8">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 flex justify-between items-center border border-slate-100 dark:border-slate-800">
            <span className="text-xl font-black text-slate-500">Calories</span>
            <span className="text-5xl font-black text-indigo-600 tabular-nums">
              {Math.round(nutrients.nut.calories)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-100 dark:border-emerald-900/30 p-6 rounded-[2rem] text-center shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600 mb-2">
                Protein
              </p>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
                {formatMacro(nutrients.nut.protein)}
                <span className="text-xs opacity-50 ml-0.5">{macroUnit}</span>
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-100 dark:border-blue-900/30 p-6 rounded-[2rem] text-center shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-2">
                Carbs
              </p>
              <p className="text-2xl font-black text-blue-700 dark:text-blue-400 tabular-nums">
                {formatMacro(nutrients.nut.carbs)}
                <span className="text-xs opacity-50 ml-0.5">{macroUnit}</span>
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-100 dark:border-amber-900/30 p-6 rounded-[2rem] text-center shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-amber-600 mb-2">
                Fat
              </p>
              <p className="text-2xl font-black text-amber-700 dark:text-amber-400 tabular-nums">
                {formatMacro(nutrients.nut.fat)}
                <span className="text-xs opacity-50 ml-0.5">{macroUnit}</span>
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-12 w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
        >
          Back to Planner
        </button>
      </div>
    </div>
  );
};
