"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { nextDueDate } from "./scheduling";

export async function markChoreComplete(instanceId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: instance } = await supabase
    .from("chore_instances")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", instanceId)
    .eq("user_id", user.id)
    .select("chore_id, due_date")
    .single();

  if (!instance) return;

  const { data: chore } = await supabase
    .from("chores")
    .select("frequency_days")
    .eq("id", instance.chore_id)
    .single();

  if (!chore) return;

  const next = nextDueDate(new Date(), chore.frequency_days);

  await supabase.from("chore_instances").insert({
    user_id: user.id,
    chore_id: instance.chore_id,
    due_date: next.toISOString().split("T")[0],
  });

  revalidatePath("/");
}

export async function addCustomChore(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const frequency = formData.get("frequency") as string;
  const frequencyDays =
    frequency === "custom"
      ? parseInt(formData.get("frequency_days") as string, 10)
      : frequency === "daily"
      ? 1
      : frequency === "weekly"
      ? 7
      : frequency === "biweekly"
      ? 14
      : 30;

  const { data: chore } = await supabase
    .from("chores")
    .insert({
      user_id: user.id,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      frequency,
      frequency_days: frequencyDays,
      is_default: false,
    })
    .select("id")
    .single();

  if (!chore) return;

  const today = new Date().toISOString().split("T")[0];
  await supabase.from("chore_instances").insert({
    user_id: user.id,
    chore_id: chore.id,
    due_date: today,
  });

  revalidatePath("/");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
