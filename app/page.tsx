"use client";

import { useHierarchyData } from "@/hooks/useHierarchyData";
import HierarchyTable from "@/components/hierarchyTable";
import sampleData from "../data/example-data.json";
import { Item } from "@/components/types";

export default function Home() {
  const { data, onRemove } = useHierarchyData(sampleData as Item[]);

  return (
    <main>
      <HierarchyTable data={data} onRemove={onRemove} />
    </main>
  );
}
