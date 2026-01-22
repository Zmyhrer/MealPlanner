"use client";

import React from "react";

interface SidebarProps {
  activeTab: "planner" | "groceries" | "ingredients" | "recipes" | "settings";
  setActiveTab: (
    tab: "planner" | "groceries" | "ingredients" | "recipes" | "settings"
  ) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: "planner", label: "Meal Planner", icon: "📅" },
    { id: "recipes", label: "My Recipes", icon: "📖" },
    { id: "groceries", label: "Grocery List", icon: "🛒" },
    { id: "ingredients", label: "Ingredients", icon: "🧪" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 w-full md:relative md:w-64 bg-white dark:bg-slate-800 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-700 p-4 z-50 overflow-x-auto hide-scrollbar">
      <div className="hidden md:block mb-10 px-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
          Culinary
          <span className="text-indigo-600 dark:text-indigo-400">AI</span>
        </h1>
        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">
          Smart Meal Studio
        </p>
      </div>
      <ul className="flex md:flex-col justify-around md:justify-start gap-2">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-shrink-0 md:w-full">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all w-full text-sm font-semibold ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
