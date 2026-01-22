import { useState } from "react";
import { CustomItem } from "@/types";

interface UseCustomItemsProps {
  initialCustomItems: CustomItem[];
  onUpdateCustomItems: (items: CustomItem[]) => void;
}

export const useCustomItems = ({
  initialCustomItems,
  onUpdateCustomItems,
}: UseCustomItemsProps) => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Household");

  const addCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const item: CustomItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newItemName,
      amount: 1,
      unit: "item",
      category: newItemCategory || "Household",
      checked: false,
    };

    onUpdateCustomItems([...initialCustomItems, item]);
    setNewItemName("");
  };

  const removeCustomItem = (id: string) => {
    onUpdateCustomItems(initialCustomItems.filter((i) => i.id !== id));
  };

  const toggleCustomItem = (id: string) => {
    onUpdateCustomItems(
      initialCustomItems.map((i) =>
        i.id === id ? { ...i, checked: !i.checked } : i
      )
    );
  };

  return {
    newItemName,
    newItemCategory,
    setNewItemName,
    setNewItemCategory,
    addCustomItem,
    removeCustomItem,
    toggleCustomItem,
  };
};
