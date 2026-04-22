"use client";

import { useState } from "react";
import { Ticker } from "./Ticker";
import { CATEGORIES, CATEGORY_ICONS } from "@/lib/chores/defaults";
import type { ChoreWithInstance, Category } from "@/lib/types";

const CATEGORY_TAB_STYLES: Record<Category, { active: string; inactive: string }> = {
  Kitchen:            { active: "bg-orange-500 text-white border-orange-500",   inactive: "border-orange-500/40 text-orange-400 hover:bg-orange-500/10" },
  Bathroom:           { active: "bg-blue-500 text-white border-blue-500",       inactive: "border-blue-500/40 text-blue-400 hover:bg-blue-500/10" },
  Bedroom:            { active: "bg-purple-500 text-white border-purple-500",   inactive: "border-purple-500/40 text-purple-400 hover:bg-purple-500/10" },
  "Personal Hygiene": { active: "bg-pink-500 text-white border-pink-500",       inactive: "border-pink-500/40 text-pink-400 hover:bg-pink-500/10" },
  "Living Room":      { active: "bg-green-500 text-white border-green-500",     inactive: "border-green-500/40 text-green-400 hover:bg-green-500/10" },
  General:            { active: "bg-slate-500 text-white border-slate-500",     inactive: "border-slate-500/40 text-slate-400 hover:bg-slate-500/10" },
  Dog:                { active: "bg-amber-500 text-white border-amber-500",     inactive: "border-amber-500/40 text-amber-400 hover:bg-amber-500/10" },
  House:              { active: "bg-teal-500 text-white border-teal-500",       inactive: "border-teal-500/40 text-teal-400 hover:bg-teal-500/10" },
};

interface TickerViewProps {
  chores: ChoreWithInstance[];
}

export function TickerView({ chores }: TickerViewProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const visible =
    activeCategory === "All"
      ? chores
      : chores.filter((c) => c.chore.category === activeCategory);

  // Only show category tabs that have pending chores
  const categoriesWithChores = CATEGORIES.filter((cat) =>
    chores.some((c) => c.chore.category === cat)
  );

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        {(["overdue", "today", "later"] as const).map((bucket) => {
          const count = chores.filter((c) => {
            const d = getDueBucketSimple(c.dueDate);
            return bucket === "later" ? d === "this_week" || d === "later" : d === bucket;
          }).length;
          return (
            <div
              key={bucket}
              className={`rounded-xl p-4 text-center border ${
                bucket === "overdue"
                  ? "bg-red-950/30 border-red-900 text-red-400"
                  : bucket === "today"
                  ? "bg-yellow-950/30 border-yellow-900 text-yellow-400"
                  : "bg-gray-900 border-gray-800 text-gray-400"
              }`}
            >
              <div className="text-3xl font-bold">{count}</div>
              <div className="text-xs mt-1 capitalize">
                {bucket === "later" ? "upcoming" : bucket}
              </div>
            </div>
          );
        })}
      </div>

      {/* All-categories ticker */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {activeCategory === "All" ? "All categories" : activeCategory}
          <span className="ml-2 font-normal normal-case text-gray-600">
            {visible.length} chore{visible.length !== 1 ? "s" : ""}
          </span>
        </p>
        <Ticker chores={visible} />
      </div>

      {/* Per-category tickers (only shown when "All" is selected) */}
      {activeCategory === "All" && (
        <div className="space-y-3">
          {categoriesWithChores.map((cat) => {
            const catChores = chores.filter((c) => c.chore.category === cat);
            const icon = CATEGORY_ICONS[cat];
            return (
              <div key={cat} className="space-y-1.5">
                <p className="text-xs font-medium text-gray-500">
                  {icon} {cat}
                </p>
                <Ticker chores={catChores} speed={40} />
              </div>
            );
          })}
        </div>
      )}

      {/* Category tabs */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Filter by category
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === "All"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10"
            }`}
          >
            All
          </button>
          {categoriesWithChores.map((cat) => {
            const style = CATEGORY_TAB_STYLES[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? "All" : cat)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isActive ? style.active : style.inactive
                }`}
              >
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getDueBucketSimple(dueDate: string) {
  const due = new Date(dueDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((due.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  if (diff <= 7) return "this_week";
  return "later";
}
