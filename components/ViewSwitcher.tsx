"use client";

import { useState } from "react";
import { ChoreList } from "./ChoreList";
import { TickerView } from "./TickerView";
import type { ChoreWithInstance } from "@/lib/types";

type View = "ticker" | "admin";

interface ViewSwitcherProps {
  chores: ChoreWithInstance[];
}

export function ViewSwitcher({ chores }: ViewSwitcherProps) {
  const [view, setView] = useState<View>("ticker");

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-100">
          {view === "ticker" ? "Live ticker" : "Manage chores"}
        </h2>
        <div className="flex rounded-lg border border-gray-800 overflow-hidden text-xs font-semibold">
          <button
            onClick={() => setView("ticker")}
            className={`px-4 py-2 transition-colors ${
              view === "ticker"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
            }`}
          >
            Ticker
          </button>
          <button
            onClick={() => setView("admin")}
            className={`px-4 py-2 transition-colors border-l border-gray-800 ${
              view === "admin"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {view === "ticker" ? (
        <TickerView chores={chores} />
      ) : (
        <ChoreList chores={chores} />
      )}
    </div>
  );
}
