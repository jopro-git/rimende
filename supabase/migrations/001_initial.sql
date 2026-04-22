-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- chores
create table public.chores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  category text not null check (category in ('Kitchen','Bathroom','Bedroom','Personal Hygiene','Living Room','General')),
  frequency text not null check (frequency in ('daily','weekly','biweekly','monthly','custom')),
  frequency_days int not null,
  is_default boolean not null default false,
  created_at timestamptz default now() not null
);

alter table public.chores enable row level security;

create policy "Users can read own chores"
  on public.chores for select
  using (auth.uid() = user_id or is_default = true);

create policy "Users can insert own chores"
  on public.chores for insert
  with check (auth.uid() = user_id and is_default = false);

create policy "Users can update own chores"
  on public.chores for update
  using (auth.uid() = user_id and is_default = false);

create policy "Users can delete own chores"
  on public.chores for delete
  using (auth.uid() = user_id and is_default = false);

-- chore_instances
create table public.chore_instances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  chore_id uuid not null references public.chores(id) on delete cascade,
  due_date date not null,
  completed_at timestamptz,
  created_at timestamptz default now() not null
);

alter table public.chore_instances enable row level security;

create policy "Users can read own instances"
  on public.chore_instances for select
  using (auth.uid() = user_id);

create policy "Users can insert own instances"
  on public.chore_instances for insert
  with check (auth.uid() = user_id);

create policy "Users can update own instances"
  on public.chore_instances for update
  using (auth.uid() = user_id);

create policy "Users can delete own instances"
  on public.chore_instances for delete
  using (auth.uid() = user_id);

create index chore_instances_user_due on public.chore_instances(user_id, due_date);
create index chore_instances_chore on public.chore_instances(chore_id);
