"use client";

import React, { memo } from "react";
import { ChevronRight, ChevronDown, X } from "lucide-react";
import { useExpandCollapse } from "@/hooks/useExpandCollapse";
import clsx from "clsx";
import { ItemWithUuid } from "@/hooks/useHierarchyData";

interface Props {
  item: ItemWithUuid;
  level?: number;
  onRemove: (id: string) => void;
}

function TableRow({ item, level = 0, onRemove }: Props) {
  const { toggle, isExpanded } = useExpandCollapse();
  const hasChildren = Object.values(item.children).some(
    (cat) => cat.records.length > 0
  );
  return (
    <>
      <tr
        className={clsx(
          "hover:bg-gray-800 transition-colors text-center",
          hasChildren ? "cursor-pointer" : "cursor-default",
          `pl-[${level * 20}px]`
        )}
      >
        <td className="px-2 py-2" style={{ paddingLeft: `${level * 1.5}rem` }}>
          {hasChildren && (
            <button
              onClick={() => hasChildren && toggle(item.uuid)}
              className="text-gray-300"
            >
              {isExpanded(item.uuid) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          )}
        </td>
        {Object.values(item.data).map((value, idx) => (
          <td key={idx}>{value}</td>
        ))}
        <td className="px-3 py-2 text-center">
          <button
            onClick={() => onRemove(item.uuid)}
            className="text-red-500 hover:text-red-400"
          >
            <X size={18} />
          </button>
        </td>
      </tr>

      {hasChildren &&
        isExpanded(item.uuid) &&
        Object.entries(item.children).map(([_, childCategory]) =>
          childCategory.records.map((child) => (
            <>
            <th></th>
              {Object.keys(child.data).map((key, id) => (
              <th className="bg-teal-500 text-black" key={id}>{key}</th>
            ))}
              <TableRow
                key={child.uuid}
                item={child}
                onRemove={onRemove}
                level={level + 1}
              />
            </>
          ))
        )}
    </>
  );
}

export default memo(TableRow);
