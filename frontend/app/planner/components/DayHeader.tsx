"use client";

interface DayHeaderProps {
  date: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  formatMacro: (grams: number) => string;
  onClick: () => void;
}

export const DayHeader: React.FC<DayHeaderProps> = ({
  date,
  nutrients,
  formatMacro,
  onClick,
}) => {
  const getDayName = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
  const getDayDisplay = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div
      onClick={onClick}
      className="text-center group cursor-pointer space-y-3"
    >
      <div className="pb-1 border-b-2 border-slate-100 dark:border-slate-800">
        <span className="block font-black text-[11px] uppercase tracking-[0.4em] text-slate-400 group-hover:text-indigo-500 transition-colors">
          {getDayName(date)}
        </span>
        <span className="text-3xl font-black tracking-tighter">
          {getDayDisplay(date).split(" ")[1]}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-5 shadow-sm border border-slate-100 dark:border-slate-700 transition-all group-hover:border-indigo-400 group-hover:shadow-xl">
        <div className="flex justify-between items-center text-indigo-600 dark:text-indigo-400 mb-3 px-1">
          <span className="text-[11px] font-black uppercase tracking-widest">
            CALORIES
          </span>
          <span className="text-2xl font-black tabular-nums">
            {Math.round(nutrients.calories)}
          </span>
        </div>
        <div className="flex justify-around items-center border-t border-slate-50 dark:border-slate-700 pt-3 gap-2">
          <div className="text-center">
            <span className="block text-[8px] font-black text-slate-400 uppercase">
              P
            </span>
            <span className="text-slate-900 dark:text-white font-black text-xs">
              {formatMacro(nutrients.protein)}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-[8px] font-black text-slate-400 uppercase">
              C
            </span>
            <span className="text-slate-900 dark:text-white font-black text-xs">
              {formatMacro(nutrients.carbs)}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-[8px] font-black text-slate-400 uppercase">
              F
            </span>
            <span className="text-slate-900 dark:text-white font-black text-xs">
              {formatMacro(nutrients.fat)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
