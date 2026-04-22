"use client";

import { getDueBucket, formatDueDate } from "@/lib/chores/scheduling";
import type { ChoreWithInstance, Category } from "@/lib/types";

const CATEGORY_STYLES: Record<Category, { bg: string; text: string; dot: string }> = {
  Kitchen:          { bg: "bg-orange-500",  text: "text-orange-50",  dot: "bg-orange-300" },
  Bathroom:         { bg: "bg-blue-500",    text: "text-blue-50",    dot: "bg-blue-300" },
  Bedroom:          { bg: "bg-purple-500",  text: "text-purple-50",  dot: "bg-purple-300" },
  "Personal Hygiene": { bg: "bg-pink-500", text: "text-pink-50",    dot: "bg-pink-300" },
  "Living Room":    { bg: "bg-green-500",   text: "text-green-50",   dot: "bg-green-300" },
  General:          { bg: "bg-slate-500",   text: "text-slate-50",   dot: "bg-slate-300" },
  Dog:              { bg: "bg-amber-500",   text: "text-amber-50",   dot: "bg-amber-300" },
  House:            { bg: "bg-teal-500",    text: "text-teal-50",    dot: "bg-teal-300" },
};

const URGENCY_RING: Record<string, string> = {
  overdue:   "ring-2 ring-red-400 ring-offset-1 ring-offset-gray-900",
  today:     "ring-2 ring-yellow-400 ring-offset-1 ring-offset-gray-900",
  this_week: "",
  later:     "opacity-70",
};

interface TickerProps {
  chores: ChoreWithInstance[];
  /** seconds to scroll the full strip once; default 60 */
  speed?: number;
}

export function Ticker({ chores, speed = 60 }: TickerProps) {
  if (chores.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 rounded-xl bg-gray-900 text-gray-500 text-sm">
        Nothing due — all clear!
      </div>
    );
  }

  // Sort: overdue first, then today, then this_week, then later
  const BUCKET_ORDER = { overdue: 0, today: 1, this_week: 2, later: 3 };
  const sorted = [...chores].sort(
    (a, b) =>
      BUCKET_ORDER[getDueBucket(a.dueDate)] - BUCKET_ORDER[getDueBucket(b.dueDate)]
  );

  // Duplicate for seamless loop
  const items = [...sorted, ...sorted];
  const duration = Math.max(20, speed * (sorted.length / 10));

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 h-16 flex items-center"
      aria-label="Chore ticker"
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-gray-900 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-900 to-transparent z-10" />

      <div
        className="ticker-track"
        style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
      >
        {items.map((item, i) => {
          const bucket = getDueBucket(item.dueDate);
          const style = CATEGORY_STYLES[item.chore.category] ?? CATEGORY_STYLES.General;
          const ring = URGENCY_RING[bucket] ?? "";

          return (
            <div
              key={`${item.instanceId}-${i}`}
              className={`flex items-center gap-2 mx-3 px-3 py-1.5 rounded-lg ${style.bg} ${ring} shrink-0`}
            >
              {/* urgency dot */}
              {bucket === "overdue" && (
                <span className="w-2 h-2 rounded-full bg-red-300 animate-pulse shrink-0" />
              )}
              {bucket === "today" && (
                <span className="w-2 h-2 rounded-full bg-yellow-300 shrink-0" />
              )}

              <span className={`text-sm font-semibold whitespace-nowrap ${style.text}`}>
                {item.chore.name}
              </span>

              <span className={`text-xs whitespace-nowrap ${style.text} opacity-80`}>
                {formatDueDate(item.dueDate)}
              </span>

              <span className={`text-xs whitespace-nowrap ${style.text} opacity-60 hidden sm:inline`}>
                · {item.chore.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
