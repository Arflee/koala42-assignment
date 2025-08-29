"use client";

import { useState, useCallback } from "react";
import { Item } from "@/components/types";
import { v4 as uuidv4 } from "uuid";

export interface ItemWithUuid extends Item {
  uuid: string;
  children: {
    [category: string]: {
      records: ItemWithUuid[];
    };
  };
}

function withUuid(item: Item): ItemWithUuid {
  return {
    ...item,
    uuid: uuidv4(),
    children: Object.fromEntries(
      Object.entries(item.children).map(([k, cat]) => [
        k,
        { records: cat.records.map(withUuid) }
      ])
    )
  };
}

function removeById(items: ItemWithUuid[], id: string): ItemWithUuid[] {
  return items
    .filter(item => item.uuid !== id)
    .map(item => ({
      ...item,
      children: Object.fromEntries(
        Object.entries(item.children).map(([k, cat]) => [
          k,
          { records: removeById(cat.records, id) }
        ])
      )
    }));
}

export function useHierarchyData(initialData: Item[]) {
  const [data, setData] = useState<ItemWithUuid[]>(() =>
    initialData.map(withUuid)
  );

  const onRemove = useCallback((id: string) => {
    setData(prev => removeById(prev, id));
  }, []);

  return { data, onRemove };
}