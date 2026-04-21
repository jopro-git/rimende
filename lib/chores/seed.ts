"use server";

import { createClient } from "@/lib/supabase/server";
import { DEFAULT_CHORES } from "./defaults";

export async function seedDefaultChores(userId: string): Promise<void> {
  const supabase = await createClient();

  // Check if user already has any instances (already seeded)
  const { count } = await supabase
    .from("chore_instances")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (count && count > 0) return;

  const today = new Date().toISOString().split("T")[0];

  // Insert chores for this user
  const { data: insertedChores, error: choreError } = await supabase
    .from("chores")
    .insert(
      DEFAULT_CHORES.map((c) => ({
        user_id: userId,
        name: c.name,
        category: c.category,
        frequency: c.frequency,
        frequency_days: c.frequency_days,
        is_default: true,
      }))
    )
    .select("id, frequency_days");

  if (choreError || !insertedChores) return;

  // Create first instance for each chore, due today
  await supabase.from("chore_instances").insert(
    insertedChores.map((chore) => ({
      user_id: userId,
      chore_id: chore.id,
      due_date: today,
    }))
  );
}
