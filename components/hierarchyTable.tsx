"use client";

import React from "react";
import TableRow from "./tableRow";
import { Item } from "./types";

interface HierarchyTableProps {
  data: Item[];
}

export default function HierarchyTable({ data }: HierarchyTableProps) {
  if (!data || data.length === 0) return <div>No data</div>;

  const headers = Object.keys(data[0].data);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((h, idx) => <th key={idx}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => <TableRow key={idx} item={item} />)}
      </tbody>
    </table>
  );
};
