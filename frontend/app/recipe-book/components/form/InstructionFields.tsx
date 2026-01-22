"use client";

import React, { KeyboardEvent } from "react";

interface InstructionFieldsProps {
  instructions: string[];
  onUpdate: (instructions: string[]) => void;
  onInstructionChange: (index: number, value: string) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  aiGeneratedInstructions?: boolean[];
}

export const InstructionFields: React.FC<InstructionFieldsProps> = ({
  instructions,
  onUpdate,
  onInstructionChange,
  onAdd,
  onDelete,
  aiGeneratedInstructions = [],
}) => {
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (index === instructions.length - 1) onAdd();
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
        Instructions
      </label>
      <div className="space-y-2">
        {instructions.map((step, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <div className="flex items-start gap-2">
              <span
                className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-2 ${
                  aiGeneratedInstructions[idx]
                    ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300"
                    : "bg-slate-100 dark:bg-slate-700"
                }`}
              >
                {idx + 1}
              </span>
            </div>
            <div className="flex-1 flex items-start gap-2">
              <textarea
                value={step}
                onChange={(e) => onInstructionChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                placeholder="Step description..."
                className={`flex-1 border rounded-xl px-3 py-2 text-sm min-h-[60px] ${
                  aiGeneratedInstructions[idx]
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                }`}
              />
              <button
                type="button"
                onClick={() => onDelete(idx)}
                className="w-8 h-8 mt-2 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors shrink-0"
                aria-label="Delete instruction"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {instructions.length === 0 && (
          <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
            No instructions added yet. Click "Add Step" to get started.
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="text-indigo-600 text-[10px] font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors w-full text-center"
      >
        + Add Step
      </button>
    </div>
  );
};
