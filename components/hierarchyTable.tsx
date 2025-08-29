"use client";

import React from "react";
import TableRow from "./tableRow";
import { ItemWithUuid } from "@/hooks/useHierarchyData";

interface Props {
  data: ItemWithUuid[];
  onRemove: (id: string) => void;
}
export default function HierarchyTable({ data, onRemove }: Props) {
  if (!data || data.length === 0) return <div>No data</div>;

  const headers = Object.keys(data[0].data);

  return (
    <table className="w-full text-sm border-collapse text-center">
      <thead className="bg-teal-500 text-black font-semibold">
        <tr>
          <th></th>
          {headers.map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th className="px-3 py-2 text-center">delete</th>
        </tr>
      </thead>
      <tbody className="bg-gray-900 text-gray-200">
        {data.map((item) => (
          <TableRow key={item.uuid} item={item} level={0} onRemove={onRemove} />
        ))}
      </tbody>
    </table>
  );
};
