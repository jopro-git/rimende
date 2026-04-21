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
  Dog: "🐶",
  House: "🏡",
};

export const CATEGORIES: Category[] = [
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Personal Hygiene",
  "Living Room",
  "General",
  "Dog",
  "House",
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
  { name: "Wipe countertops", category: "Kitchen", frequency: "daily", frequency_days: 1 },
  { name: "Wipe stovetop", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Clean microwave", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Replace kitchen sponge", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe splashback", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Empty trash", category: "Kitchen", frequency: "weekly", frequency_days: 7 },
  { name: "Clean oven", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Clean fridge", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Wipe cabinet fronts", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Clean range hood / extractor", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Run dishwasher cleaner", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Descale kettle", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Check fridge/pantry expiry dates", category: "Kitchen", frequency: "monthly", frequency_days: 30 },
  { name: "Organise pantry", category: "Kitchen", frequency: "custom", frequency_days: 60 },

  // Bathroom
  { name: "Clean toilet", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Scrub shower / tub", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe sink & mirror", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Change hand towel", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Empty bathroom bin", category: "Bathroom", frequency: "weekly", frequency_days: 7 },
  { name: "Wash bath mat", category: "Bathroom", frequency: "biweekly", frequency_days: 14 },
  { name: "Wash shower curtain", category: "Bathroom", frequency: "monthly", frequency_days: 30 },
  { name: "Descale showerhead", category: "Bathroom", frequency: "monthly", frequency_days: 30 },
  { name: "Clean grout", category: "Bathroom", frequency: "custom", frequency_days: 60 },
  { name: "Organise medicine cabinet", category: "Bathroom", frequency: "custom", frequency_days: 90 },
  { name: "Replace shower curtain liner", category: "Bathroom", frequency: "custom", frequency_days: 90 },

  // Bedroom
  { name: "Change bed sheets", category: "Bedroom", frequency: "biweekly", frequency_days: 14 },
  { name: "Vacuum floor", category: "Bedroom", frequency: "weekly", frequency_days: 7 },
  { name: "Dust surfaces", category: "Bedroom", frequency: "biweekly", frequency_days: 14 },
  { name: "Air out room", category: "Bedroom", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe skirting boards", category: "Bedroom", frequency: "monthly", frequency_days: 30 },
  { name: "Vacuum mattress", category: "Bedroom", frequency: "monthly", frequency_days: 30 },
  { name: "Wash pillows", category: "Bedroom", frequency: "custom", frequency_days: 90 },
  { name: "Wash duvet / comforter", category: "Bedroom", frequency: "custom", frequency_days: 90 },
  { name: "Rotate mattress", category: "Bedroom", frequency: "custom", frequency_days: 180 },
  { name: "Organise wardrobe", category: "Bedroom", frequency: "custom", frequency_days: 60 },

  // Personal Hygiene
  { name: "Floss teeth", category: "Personal Hygiene", frequency: "daily", frequency_days: 1 },
  { name: "Moisturise skin", category: "Personal Hygiene", frequency: "daily", frequency_days: 1 },
  { name: "Wash hair", category: "Personal Hygiene", frequency: "custom", frequency_days: 3 },
  { name: "Shave", category: "Personal Hygiene", frequency: "custom", frequency_days: 3 },
  { name: "Exfoliate skin", category: "Personal Hygiene", frequency: "weekly", frequency_days: 7 },
  { name: "Trim nails", category: "Personal Hygiene", frequency: "weekly", frequency_days: 7 },
  { name: "Clean ears", category: "Personal Hygiene", frequency: "weekly", frequency_days: 7 },
  { name: "Replace razor blade", category: "Personal Hygiene", frequency: "weekly", frequency_days: 7 },
  { name: "Clean glasses / lens case", category: "Personal Hygiene", frequency: "weekly", frequency_days: 7 },
  { name: "Haircut", category: "Personal Hygiene", frequency: "custom", frequency_days: 42 },
  { name: "Replace toothbrush", category: "Personal Hygiene", frequency: "custom", frequency_days: 90 },
  { name: "Dental check-up", category: "Personal Hygiene", frequency: "custom", frequency_days: 180 },

  // Living Room
  { name: "Vacuum living room", category: "Living Room", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe coffee table", category: "Living Room", frequency: "weekly", frequency_days: 7 },
  { name: "Declutter surfaces", category: "Living Room", frequency: "weekly", frequency_days: 7 },
  { name: "Clean light switches & handles", category: "Living Room", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe TV & remotes", category: "Living Room", frequency: "biweekly", frequency_days: 14 },
  { name: "Vacuum sofa / cushions", category: "Living Room", frequency: "biweekly", frequency_days: 14 },
  { name: "Dust blinds / curtains", category: "Living Room", frequency: "monthly", frequency_days: 30 },
  { name: "Wash cushion covers", category: "Living Room", frequency: "monthly", frequency_days: 30 },
  { name: "Clean under furniture", category: "Living Room", frequency: "monthly", frequency_days: 30 },
  { name: "Organise bookshelves", category: "Living Room", frequency: "custom", frequency_days: 60 },

  // General
  { name: "Take out recycling", category: "General", frequency: "weekly", frequency_days: 7 },
  { name: "Wipe door handles throughout", category: "General", frequency: "weekly", frequency_days: 7 },
  { name: "Mop floors", category: "General", frequency: "biweekly", frequency_days: 14 },
  { name: "Wash windows", category: "General", frequency: "monthly", frequency_days: 30 },
  { name: "Clean light fixtures", category: "General", frequency: "monthly", frequency_days: 30 },
  { name: "Dust ceiling fans", category: "General", frequency: "monthly", frequency_days: 30 },
  { name: "Replace air filters", category: "General", frequency: "custom", frequency_days: 90 },
  { name: "Clean behind large appliances", category: "General", frequency: "custom", frequency_days: 90 },
  { name: "Organise junk drawer", category: "General", frequency: "custom", frequency_days: 60 },
  { name: "Check & replace batteries", category: "General", frequency: "custom", frequency_days: 180 },

  // Dog
  { name: "Feed dog", category: "Dog", frequency: "daily", frequency_days: 1 },
  { name: "Walk dog", category: "Dog", frequency: "daily", frequency_days: 1 },
  { name: "Refill water bowl", category: "Dog", frequency: "daily", frequency_days: 1 },
  { name: "Clean food & water bowls", category: "Dog", frequency: "weekly", frequency_days: 7 },
  { name: "Brush dog", category: "Dog", frequency: "weekly", frequency_days: 7 },
  { name: "Clean dog toys", category: "Dog", frequency: "weekly", frequency_days: 7 },
  { name: "Check dog for ticks", category: "Dog", frequency: "weekly", frequency_days: 7 },
  { name: "Brush dog's teeth", category: "Dog", frequency: "custom", frequency_days: 3 },
  { name: "Wash dog bed / blanket", category: "Dog", frequency: "biweekly", frequency_days: 14 },
  { name: "Bath dog", category: "Dog", frequency: "monthly", frequency_days: 30 },
  { name: "Trim dog nails", category: "Dog", frequency: "monthly", frequency_days: 30 },
  { name: "Flea & tick treatment", category: "Dog", frequency: "monthly", frequency_days: 30 },
  { name: "Clean dog ears", category: "Dog", frequency: "monthly", frequency_days: 30 },
  { name: "Worming treatment", category: "Dog", frequency: "custom", frequency_days: 90 },
  { name: "Vet check-up", category: "Dog", frequency: "custom", frequency_days: 180 },

  // House
  { name: "Mow lawn", category: "House", frequency: "weekly", frequency_days: 7 },
  { name: "Water plants", category: "House", frequency: "custom", frequency_days: 3 },
  { name: "Clean porch / entrance", category: "House", frequency: "weekly", frequency_days: 7 },
  { name: "Trim hedges / bushes", category: "House", frequency: "monthly", frequency_days: 30 },
  { name: "Wash car", category: "House", frequency: "monthly", frequency_days: 30 },
  { name: "Clean outdoor furniture", category: "House", frequency: "monthly", frequency_days: 30 },
  { name: "Check smoke alarms", category: "House", frequency: "monthly", frequency_days: 30 },
  { name: "Test carbon monoxide detector", category: "House", frequency: "monthly", frequency_days: 30 },
  { name: "Clean driveway", category: "House", frequency: "monthly", frequency_days: 30 },
  { name: "Clean gutters", category: "House", frequency: "custom", frequency_days: 90 },
  { name: "Declutter garage / storage", category: "House", frequency: "custom", frequency_days: 90 },
  { name: "Check door & window seals", category: "House", frequency: "custom", frequency_days: 180 },
  { name: "Check boiler / heating system", category: "House", frequency: "custom", frequency_days: 180 },
  { name: "Bleed radiators", category: "House", frequency: "custom", frequency_days: 180 },
  { name: "Check first aid kit", category: "House", frequency: "custom", frequency_days: 180 },
];
