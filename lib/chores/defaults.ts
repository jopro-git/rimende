import type { Category, Frequency } from "@/lib/types";

export interface DefaultChore {
  name: string;
  category: Category;
  frequency: Frequency;
  frequency_days: number;
}

export const CATEGORY_ICONS: Record<Category, string> = {
  Kitchen: "🍳",
  Bathroom: "🚿",
  Bedroom: "🛏️",
  "Personal Hygiene": "🪥",
  "Living Room": "🛋️",
  General: "🏠",
};

export const CATEGORIES: Category[] = [
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Personal Hygiene",
  "Living Room",
  "General",
];

export function choresByCategory(category: Category): DefaultChore[] {
  return DEFAULT_CHORES.filter((c) => c.category === category);
}

export function frequencyLabel(c: DefaultChore): string {
  if (c.frequency === "daily") return "Daily";
  if (c.frequency === "weekly") return "Weekly";
  if (c.frequency === "biweekly") return "Every 2 weeks";
  if (c.frequency === "monthly") return "Monthly";
  return `Every ${c.frequency_days} days`;
}

export const DEFAULT_CHORES: DefaultChore[] = [
  // Kitchen
  { name: "Wash dishes", category: "Kitchen", frequency: "daily", frequency_days: 1 },
  { name: "Wipe stovetop", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Clean microwave", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Empty trash", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Clean fridge", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Descale kettle", category: "Kitchen", frequency: "monthly", frequency_days: 30 },

  // Bathroom
  { name: "Clean toilet", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Scrub shower/tub", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe sink & mirror", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Change hand towel", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Wash bath mat", category: "Bathroom", frequency: "biweekly", frequency_days: 14 },

  // Bedroom
  { name: "Change bed sheets", category: "Bedroom", frequency: "biweekly", frequency_days: 14 },
  { name: "Vacuum floor", category: "Bedroom", frequency: "weekly", frequency_days: 7 },
  { name: "Dust surfaces", category: "Bedroom", frequency: "biweekly", frequency_days: 14 },

  // Personal Hygiene
  { name: "Trim nails", category: "Personal Hygiene", frequency: "weekly", frequency_days: 7 },
  { name: "Clean ears", category: "Personal Hygiene", frequency: "weekly", frequency_days: 7 },
  { name: "Wash hair", category: "Personal Hygiene", frequency: "custom", frequency_days: 3 },
  { name: "Replace toothbrush", category: "Personal Hygiene", frequency: "monthly", frequency_days: 90 },
  { name: "Moisturise skin", category: "Personal Hygiene", frequency: "daily", frequency_days: 1 },

  // Living Room
  { name: "Vacuum living room", category: "Living Room", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe TV & remotes", category: "Living Room", frequency: "biweekly", frequency_days: 14 },
  { name: "Declutter surfaces", category: "Living Room", frequency: "weekly", frequency_days: 7 },

  // General
  { name: "Take out recycling", category: "General", frequency: "weekly", frequency_days: 7 },
  { name: "Mop floors", category: "General", frequency: "biweekly", frequency_days: 14 },
  { name: "Wash windows", category: "General", frequency: "monthly", frequency_days: 30 },
];
