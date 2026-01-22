"use client";

interface DietaryTagsProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const DietaryTags: React.FC<DietaryTagsProps> = ({
  tags,
  selectedTags,
  onTagToggle,
}) => {
  return (
    <div className="space-y-4 pt-4">
      <div>
        <h4 className="font-semibold">Dietary Focus</h4>
        <p className="text-xs text-slate-500">Personalize AI suggestions</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
