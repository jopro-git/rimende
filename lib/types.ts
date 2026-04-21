export type Category =
  | "Kitchen"
  | "Bathroom"
  | "Bedroom"
  | "Personal Hygiene"
  | "Living Room"
  | "General";

export type Frequency =
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "custom";

export interface Chore {
  id: string;
  name: string;
  category: Category;
  frequency: Frequency;
  frequency_days: number;
  is_default: boolean;
}

export interface ChoreWithInstance {
  instanceId: string;
  dueDate: string;
  completedAt: string | null;
  chore: Chore;
}

export type DueBucket = "overdue" | "today" | "this_week" | "later";
