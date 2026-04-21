"use client";

import type { Category } from "@/lib/types";

const CATEGORIES: Category[] = [
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Personal Hygiene",
  "Living Room",
  "General",
];

interface CategoryFilterProps {
  selected: Category | null;
  onChange: (cat: Category | null) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
          selected === null
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(selected === cat ? null : cat)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selected === cat
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
