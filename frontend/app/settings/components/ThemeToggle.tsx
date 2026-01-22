"use client";

import { Theme } from "@/lib/types";

interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold">Display Theme</h4>
        <p className="text-xs text-slate-500">Light or dark visual mode</p>
      </div>
      <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
        <button
          onClick={() => onThemeChange(Theme.LIGHT)}
          className={`px-4 py-2 rounded-lg text-xs transition-all ${
            currentTheme === Theme.LIGHT
              ? "bg-white shadow-sm font-bold text-indigo-600"
              : "text-slate-500"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => onThemeChange(Theme.DARK)}
          className={`px-4 py-2 rounded-lg text-xs transition-all ${
            currentTheme === Theme.DARK
              ? "bg-slate-900 text-white font-bold"
              : "text-slate-500"
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
};
