import { useState } from "react";

export const useGrocerySelection = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);
  };

  const isItemChecked = (id: string) => checkedIds.has(id);

  return {
    checkedIds,
    toggleItem,
    isItemChecked,
  };
};
