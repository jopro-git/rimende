"use client";

import { useState, useTransition } from "react";
import {
  CATEGORIES,
  CATEGORY_ICONS,
  choresByCategory,
  frequencyLabel,
  type DefaultChore,
} from "@/lib/chores/defaults";
import { completeOnboarding } from "@/lib/chores/onboarding";
import type { Category } from "@/lib/types";

export function OnboardingClient() {
  const [isPending, startTransition] = useTransition();

  // Track which categories are expanded
  const [expandedCats, setExpandedCats] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );

  // Track selected chore names — all on by default
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(CATEGORIES.flatMap((cat) => choresByCategory(cat).map((c) => c.name)))
  );

  function toggleCategory(cat: Category) {
    const choresInCat = choresByCategory(cat).map((c) => c.name);
    const allSelected = choresInCat.every((n) => selected.has(n));

    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        choresInCat.forEach((n) => next.delete(n));
      } else {
        choresInCat.forEach((n) => next.add(n));
      }
      return next;
    });
  }

  function toggleChore(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function toggleExpand(cat: Category) {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function handleSubmit() {
    startTransition(() => completeOnboarding(Array.from(selected)));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to Rimende
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Pick the categories and reminders that fit your life. You can always
            add or remove chores later.
          </p>
        </div>

        {/* Category cards */}
        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const chores = choresByCategory(cat);
            const selectedCount = chores.filter((c) => selected.has(c.name)).length;
            const allSelected = selectedCount === chores.length;
            const someSelected = selectedCount > 0 && !allSelected;
            const expanded = expandedCats.has(cat);

            return (
              <div
                key={cat}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
              >
                {/* Category header row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    aria-label={`Toggle all ${cat} chores`}
                    className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      allSelected
                        ? "bg-indigo-600 border-indigo-600"
                        : someSelected
                        ? "bg-indigo-200 border-indigo-400 dark:bg-indigo-900 dark:border-indigo-600"
                        : "border-gray-300 dark:border-gray-600 hover:border-indigo-400"
                    }`}
                  >
                    {allSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {someSelected && (
                      <span className="w-2 h-0.5 rounded bg-indigo-600 dark:bg-indigo-400" />
                    )}
                  </button>

                  {/* Icon + name */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(cat)}
                    className="flex-1 flex items-center gap-2 text-left"
                  >
                    <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {cat}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {selectedCount}/{chores.length}
                    </span>
                  </button>

                  {/* Expand chevron */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(cat)}
                    className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label={expanded ? "Collapse" : "Expand"}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Chore list */}
                {expanded && (
                  <div className="border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
                    {chores.map((chore: DefaultChore) => (
                      <label
                        key={chore.name}
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selected.has(chore.name)}
                          onChange={() => toggleChore(chore.name)}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                          {chore.name}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {frequencyLabel(chore)}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {selected.size} reminder{selected.size !== 1 ? "s" : ""} selected
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || selected.size === 0}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Setting up…" : "Get started"}
          </button>
        </div>
      </div>
    </div>
  );
}
