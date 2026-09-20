alter table public.group_members
  add constraint group_members_user_profile_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

alter table public.tasks
  add constraint tasks_assigned_profile_fkey
  foreign key (assigned_to) references public.profiles(id) on delete set null;

alter table public.notes
  add constraint notes_author_profile_fkey
  foreign key (created_by) references public.profiles(id) on delete cascade;

alter table public.notifications
  add constraint notifications_actor_profile_fkey
  foreign key (actor_id) references public.profiles(id) on delete cascade;

alter table public.friendships
  add constraint friendships_requester_profile_fkey
  foreign key (requester_id) references public.profiles(id) on delete cascade;

alter table public.friendships
  add constraint friendships_addressee_profile_fkey
  foreign key (addressee_id) references public.profiles(id) on delete cascade;