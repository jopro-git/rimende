-- Default chores seeded at the DB level as system rows (user_id = null not possible with FK,
-- so we use a sentinel approach: default chores are inserted via server action per-user on first login.
-- This migration is a no-op placeholder; defaults are seeded in lib/chores/seed.ts)
select 1;
