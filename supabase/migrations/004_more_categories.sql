alter table public.chores
  drop constraint if exists chores_category_check;

alter table public.chores
  add constraint chores_category_check
    check (category in (
      'Kitchen','Bathroom','Bedroom','Personal Hygiene',
      'Living Room','General','Dog','House'
    ));
