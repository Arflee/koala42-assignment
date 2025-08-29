"use client";

import React, { memo, useMemo } from "react";
import { Item } from "./types";
import { useExpandCollapse } from "@/hooks/useExpandCollapse";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

interface TableRowProps {
  item: Item;
  level?: number;
}

function TableRow({ item, level = 0 }: TableRowProps) {
  const { toggle, isExpanded } = useExpandCollapse();
  const hasChildren = Object.values(item.children).some(
    (cat) => cat.records.length > 0
  );

  const rowId = useMemo(() => uuidv4(), []);

  return (
    <>
      <tr
        className={clsx(
          "hover:bg-gray-100 transition-colors",
          hasChildren ? "cursor-pointer" : "cursor-default",
          `pl-[${level * 20}px]`
        )}
        onClick={() => hasChildren && toggle(rowId)}
      >
        {Object.values(item.data).map((value, idx) => (
          <td key={idx}>{value}</td>
        ))}
      </tr>

      {hasChildren &&
        isExpanded(rowId) &&
        Object.entries(item.children).map(([category, childCategory]) =>
          childCategory.records.map((child) => (
            <TableRow key={uuidv4()} item={child} level={level + 1} />
          ))
        )}
    </>
  );
}

export default memo(TableRow);
