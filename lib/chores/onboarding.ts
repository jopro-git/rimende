"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_CHORES } from "./defaults";

export async function completeOnboarding(selectedNames: string[]): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];
  const selected = DEFAULT_CHORES.filter((c) => selectedNames.includes(c.name));

  const { data: insertedChores } = await supabase
    .from("chores")
    .insert(
      selected.map((c) => ({
        user_id: user.id,
        name: c.name,
        category: c.category,
        frequency: c.frequency,
        frequency_days: c.frequency_days,
        is_default: true,
      }))
    )
    .select("id");

  if (insertedChores?.length) {
    await supabase.from("chore_instances").insert(
      insertedChores.map((chore) => ({
        user_id: user.id,
        chore_id: chore.id,
        due_date: today,
      }))
    );
  }

  await supabase
    .from("profiles")
    .update({ onboarding_complete: true })
    .eq("id", user.id);

  redirect("/");
}
