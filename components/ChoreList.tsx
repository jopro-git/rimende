"use client";

import { useState } from "react";
import { ChoreItem } from "./ChoreItem";
import { CategoryFilter } from "./CategoryFilter";
import { AddChoreModal } from "./AddChoreModal";
import { getDueBucket } from "@/lib/chores/scheduling";
import type { Category, ChoreWithInstance } from "@/lib/types";

const BUCKET_LABELS = {
  overdue: "Overdue",
  today: "Today",
  this_week: "This Week",
  later: "Later",
};

interface ChoreListProps {
  chores: ChoreWithInstance[];
}

export function ChoreList({ chores }: ChoreListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = selectedCategory
    ? chores.filter((c) => c.chore.category === selectedCategory)
    : chores;

  const grouped = {
    overdue: filtered.filter((c) => getDueBucket(c.dueDate) === "overdue"),
    today: filtered.filter((c) => getDueBucket(c.dueDate) === "today"),
    this_week: filtered.filter((c) => getDueBucket(c.dueDate) === "this_week"),
    later: filtered.filter((c) => getDueBucket(c.dueDate) === "later"),
  };

  const buckets = (["overdue", "today", "this_week", "later"] as const).filter(
    (b) => grouped[b].length > 0
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your chores
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            + Add
          </button>
        </div>

        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {buckets.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <p className="text-4xl mb-3">✓</p>
            <p className="text-sm">All caught up!</p>
          </div>
        ) : (
          buckets.map((bucket) => (
            <section key={bucket}>
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  bucket === "overdue"
                    ? "text-red-500"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {BUCKET_LABELS[bucket]}
                <span className="ml-2 font-normal normal-case">
                  ({grouped[bucket].length})
                </span>
              </h3>
              <div className="space-y-2">
                {grouped[bucket].map((item) => (
                  <ChoreItem
                    key={item.instanceId}
                    item={item}
                    isOverdue={bucket === "overdue"}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {showAddModal && (
        <AddChoreModal onClose={() => setShowAddModal(false)} />
      )}
    </>
  );
}
