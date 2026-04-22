import type { Frequency } from "@/lib/types";

const FREQUENCY_DAYS: Record<Exclude<Frequency, "custom">, number> = {
  daily: 1,
  weekly: 7,
  biweekly: 14,
  monthly: 30,
};

export function frequencyToDays(frequency: Frequency, customDays?: number): number {
  if (frequency === "custom") {
    return customDays ?? 7;
  }
  return FREQUENCY_DAYS[frequency];
}

export function nextDueDate(completedAt: Date, frequencyDays: number): Date {
  const next = new Date(completedAt);
  next.setDate(next.getDate() + frequencyDays);
  return next;
}

export function formatDueDate(dueDate: string): string {
  const due = new Date(dueDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays <= 7) return `In ${diffDays} days`;
  return due.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getDueBucket(
  dueDate: string
): "overdue" | "today" | "this_week" | "later" {
  const due = new Date(dueDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "today";
  if (diffDays <= 7) return "this_week";
  return "later";
}
