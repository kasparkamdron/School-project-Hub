alter table public.blocks
  add constraint blocks_blocked_id_profiles_fkey
  foreign key (blocked_id) references public.profiles(id) on delete cascade;

alter table public.blocks
  add constraint blocks_blocker_id_profiles_fkey
  foreign key (blocker_id) references public.profiles(id) on delete cascade;