import { useState } from "react";

export function useExpandCollapse() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const isExpanded = (id: string) => expandedItems.has(id);

  return { expandedItems, toggle, isExpanded };
}
