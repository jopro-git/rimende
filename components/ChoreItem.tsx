"use client";

import { useTransition } from "react";
import { markChoreComplete } from "@/lib/chores/actions";
import { formatDueDate } from "@/lib/chores/scheduling";
import type { ChoreWithInstance } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  Kitchen: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Bathroom: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Bedroom: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Personal Hygiene": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "Living Room": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  General: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

interface ChoreItemProps {
  item: ChoreWithInstance;
  isOverdue: boolean;
}

export function ChoreItem({ item, isOverdue }: ChoreItemProps) {
  const [isPending, startTransition] = useTransition();

  function handleComplete() {
    startTransition(() => markChoreComplete(item.instanceId));
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-xl p-4 transition-all ${
        isPending ? "opacity-50 scale-95" : ""
      } ${
        isOverdue
          ? "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
          : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
      }`}
    >
      <button
        onClick={handleComplete}
        disabled={isPending}
        aria-label={`Mark ${item.chore.name} as done`}
        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isOverdue
            ? "border-red-400 hover:bg-red-400 hover:border-red-400"
            : "border-gray-300 dark:border-gray-600 hover:bg-indigo-500 hover:border-indigo-500"
        } group`}
      >
        <svg
          className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {item.chore.name}
        </p>
        <p
          className={`text-xs mt-0.5 ${
            isOverdue
              ? "text-red-600 dark:text-red-400 font-medium"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {formatDueDate(item.dueDate)}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
          CATEGORY_COLORS[item.chore.category] ?? CATEGORY_COLORS.General
        }`}
      >
        {item.chore.category}
      </span>
    </div>
  );
}
