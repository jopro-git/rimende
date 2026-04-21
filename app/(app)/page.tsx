import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/Header";
import { RealtimeChores } from "@/components/RealtimeChores";
import { ViewSwitcher } from "@/components/ViewSwitcher";
import type { ChoreWithInstance } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", user!.id)
    .single();

  if (!profile?.onboarding_complete) redirect("/onboarding");

  const { data: instances } = await supabase
    .from("chore_instances")
    .select(
      `
      id,
      due_date,
      completed_at,
      chore:chores (
        id,
        name,
        category,
        frequency,
        frequency_days,
        is_default
      )
    `
    )
    .is("completed_at", null)
    .order("due_date", { ascending: true });

  const chores: ChoreWithInstance[] = (instances ?? []).map((inst) => ({
    instanceId: inst.id,
    dueDate: inst.due_date,
    completedAt: inst.completed_at,
    chore: Array.isArray(inst.chore) ? inst.chore[0] : inst.chore,
  }));

  return (
    <div className="min-h-screen bg-gray-950">
      <Header userEmail={user!.email!} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <RealtimeChores userId={user!.id} />
        <ViewSwitcher chores={chores} />
      </main>
    </div>
  );
}
