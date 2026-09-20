-- ============ ENUMS ============
create type public.friendship_status as enum ('pending','accepted','declined');
create type public.notification_type as enum ('friend_request','friend_accepted','group_added','task_assigned');

-- ============ PROFILES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  school text,
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- ============ FRIENDSHIPS ============
create table public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status public.friendship_status not null default 'pending',
  created_at timestamptz not null default now(),
  constraint friendship_not_self check (requester_id <> addressee_id),
  constraint friendship_unique unique (requester_id, addressee_id)
);
create index friendships_addressee_idx on public.friendships(addressee_id);
create index friendships_requester_idx on public.friendships(requester_id);
grant select, insert, update, delete on public.friendships to authenticated;
grant all on public.friendships to service_role;
alter table public.friendships enable row level security;

-- ============ BLOCKS ============
create table public.blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint block_not_self check (blocker_id <> blocked_id),
  constraint block_unique unique (blocker_id, blocked_id)
);
grant select, insert, delete on public.blocks to authenticated;
grant all on public.blocks to service_role;
alter table public.blocks enable row level security;

-- ============ GROUPS ============
create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  deadline timestamptz,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now()
);
grant select, insert, update, delete on public.groups to authenticated;
grant all on public.groups to service_role;
alter table public.groups enable row level security;

create table public.group_members (
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index group_members_user_idx on public.group_members(user_id);
grant select, insert, delete on public.group_members to authenticated;
grant all on public.group_members to service_role;
alter table public.group_members enable row level security;

-- ============ TASKS ============
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  title text not null,
  assigned_to uuid references auth.users(id) on delete set null,
  deadline timestamptz,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
create index tasks_group_idx on public.tasks(group_id);
grant select, insert, update, delete on public.tasks to authenticated;
grant all on public.tasks to service_role;
alter table public.tasks enable row level security;

-- ============ NOTES ============
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete cascade,
  content text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index notes_group_idx on public.notes(group_id);
grant select, insert, update, delete on public.notes to authenticated;
grant all on public.notes to service_role;
alter table public.notes enable row level security;

-- ============ REPORTS ============
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  target_user_id uuid references auth.users(id) on delete cascade,
  target_group_id uuid references public.groups(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);
grant insert on public.reports to authenticated;
grant all on public.reports to service_role;
alter table public.reports enable row level security;

-- ============ NOTIFICATIONS ============
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type public.notification_type not null,
  actor_id uuid references auth.users(id) on delete cascade,
  group_id uuid references public.groups(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete cascade,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index notifications_user_idx on public.notifications(user_id, created_at desc);
grant select, update, delete on public.notifications to authenticated;
grant all on public.notifications to service_role;
alter table public.notifications enable row level security;

-- ============ HELPER FUNCTIONS (security definer) ============
create or replace function public.are_friends(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from friendships f
    where f.status = 'accepted'
      and ((f.requester_id = _a and f.addressee_id = _b)
        or (f.requester_id = _b and f.addressee_id = _a))
  );
$$;

create or replace function public.has_friend_link(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from friendships f
    where ((f.requester_id = _a and f.addressee_id = _b)
        or (f.requester_id = _b and f.addressee_id = _a))
  );
$$;

create or replace function public.is_group_member(_group_id uuid, _user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from group_members gm
    where gm.group_id = _group_id and gm.user_id = _user_id
  );
$$;

create or replace function public.shares_group(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from group_members x
    join group_members y on y.group_id = x.group_id
    where x.user_id = _a and y.user_id = _b
  );
$$;

create or replace function public.is_blocked_between(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from blocks b
    where (b.blocker_id = _a and b.blocked_id = _b)
       or (b.blocker_id = _b and b.blocked_id = _a)
  );
$$;

-- ============ POLICIES ============
-- profiles: self, friends (or pending link), and fellow group members
create policy "profiles readable by self friends and groupmates" on public.profiles
  for select to authenticated using (
    id = auth.uid()
    or public.has_friend_link(auth.uid(), id)
    or public.shares_group(auth.uid(), id)
  );
create policy "own profile insert" on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "own profile delete" on public.profiles
  for delete to authenticated using (id = auth.uid());

-- friendships: only the two parties
create policy "friendships visible to parties" on public.friendships
  for select to authenticated using (requester_id = auth.uid() or addressee_id = auth.uid());
create policy "send friend request" on public.friendships
  for insert to authenticated with check (
    requester_id = auth.uid()
    and not public.is_blocked_between(auth.uid(), addressee_id)
  );
create policy "respond to friend request" on public.friendships
  for update to authenticated using (addressee_id = auth.uid() or requester_id = auth.uid());
create policy "remove friendship" on public.friendships
  for delete to authenticated using (requester_id = auth.uid() or addressee_id = auth.uid());

-- blocks: blocker only
create policy "blocks visible to blocker" on public.blocks
  for select to authenticated using (blocker_id = auth.uid());
create policy "create own block" on public.blocks
  for insert to authenticated with check (blocker_id = auth.uid());
create policy "delete own block" on public.blocks
  for delete to authenticated using (blocker_id = auth.uid());

-- groups: members only
create policy "groups visible to members" on public.groups
  for select to authenticated using (public.is_group_member(id, auth.uid()));
create policy "create own group" on public.groups
  for insert to authenticated with check (created_by = auth.uid());
create policy "members update group" on public.groups
  for update to authenticated using (public.is_group_member(id, auth.uid()));
create policy "creator deletes group" on public.groups
  for delete to authenticated using (created_by = auth.uid());

-- group_members
create policy "membership visible to members" on public.group_members
  for select to authenticated using (public.is_group_member(group_id, auth.uid()));
create policy "members add friends" on public.group_members
  for insert to authenticated with check (
    (user_id = auth.uid() and exists (select 1 from public.groups g where g.id = group_id and g.created_by = auth.uid()))
    or (
      public.is_group_member(group_id, auth.uid())
      and public.are_friends(auth.uid(), user_id)
      and not exists (
        select 1 from public.group_members gm
        where gm.group_id = group_members.group_id
          and public.is_blocked_between(gm.user_id, user_id)
      )
    )
  );
create policy "leave group" on public.group_members
  for delete to authenticated using (user_id = auth.uid());

-- tasks
create policy "tasks for members" on public.tasks
  for select to authenticated using (public.is_group_member(group_id, auth.uid()));
create policy "tasks insert for members" on public.tasks
  for insert to authenticated with check (public.is_group_member(group_id, auth.uid()));
create policy "tasks update for members" on public.tasks
  for update to authenticated using (public.is_group_member(group_id, auth.uid()));
create policy "tasks delete for members" on public.tasks
  for delete to authenticated using (public.is_group_member(group_id, auth.uid()));

-- notes
create policy "notes for members" on public.notes
  for select to authenticated using (public.is_group_member(group_id, auth.uid()));
create policy "notes insert for members" on public.notes
  for insert to authenticated with check (
    public.is_group_member(group_id, auth.uid()) and created_by = auth.uid()
  );
create policy "notes update own" on public.notes
  for update to authenticated using (created_by = auth.uid());
create policy "notes delete own" on public.notes
  for delete to authenticated using (created_by = auth.uid());

-- reports: insert only
create policy "report insert only" on public.reports
  for insert to authenticated with check (reporter_id = auth.uid());

-- notifications
create policy "own notifications" on public.notifications
  for select to authenticated using (user_id = auth.uid());
create policy "own notifications update" on public.notifications
  for update to authenticated using (user_id = auth.uid());
create policy "own notifications delete" on public.notifications
  for delete to authenticated using (user_id = auth.uid());

-- ============ TRIGGERS ============
-- new auth user -> profile
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- block rule: blocked user cannot request friendship
create or replace function public.enforce_friend_request()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.is_blocked_between(new.requester_id, new.addressee_id) then
    raise exception 'This user is not available.';
  end if;
  return new;
end;
$$;
create trigger friendships_block_guard
  before insert on public.friendships
  for each row execute function public.enforce_friend_request();

-- friendship notifications
create or replace function public.notify_friendship()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' and new.status = 'pending' then
    insert into public.notifications (user_id, type, actor_id, body)
    values (new.addressee_id, 'friend_request', new.requester_id,
      coalesce((select display_name from public.profiles where id = new.requester_id), 'Someone') || ' sent you a friend request');
  elsif tg_op = 'UPDATE' and new.status = 'accepted' and old.status <> 'accepted' then
    insert into public.notifications (user_id, type, actor_id, body)
    values (new.requester_id, 'friend_accepted', new.addressee_id,
      coalesce((select display_name from public.profiles where id = new.addressee_id), 'Someone') || ' accepted your friend request');
  end if;
  return new;
end;
$$;
create trigger friendships_notify
  after insert or update on public.friendships
  for each row execute function public.notify_friendship();

-- creator auto-joins group
create or replace function public.add_group_creator()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.group_members (group_id, user_id)
  values (new.id, new.created_by)
  on conflict do nothing;
  return new;
end;
$$;
create trigger groups_add_creator
  after insert on public.groups
  for each row execute function public.add_group_creator();

-- group add notification + block guard
create or replace function public.notify_group_add()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if exists (
    select 1 from public.group_members gm
    where gm.group_id = new.group_id
      and gm.user_id <> new.user_id
      and public.is_blocked_between(gm.user_id, new.user_id)
  ) then
    raise exception 'This user cannot be added to this group.';
  end if;

  if new.user_id <> coalesce(auth.uid(), new.user_id) then
    insert into public.notifications (user_id, type, actor_id, group_id, body)
    values (new.user_id, 'group_added', auth.uid(), new.group_id,
      'You were added to ' || coalesce((select name from public.groups where id = new.group_id), 'a group'));
  end if;
  return new;
end;
$$;
create trigger group_members_guard
  after insert on public.group_members
  for each row execute function public.notify_group_add();

-- activity bump + task assignment notification
create or replace function public.touch_group_activity()
returns trigger language plpgsql security definer set search_path = public as $$
declare gid uuid;
begin
  gid := coalesce(new.group_id, old.group_id);
  update public.groups set last_activity_at = now() where id = gid;
  return coalesce(new, old);
end;
$$;
create trigger tasks_touch_activity
  after insert or update or delete on public.tasks
  for each row execute function public.touch_group_activity();
create trigger notes_touch_activity
  after insert or update or delete on public.notes
  for each row execute function public.touch_group_activity();

create or replace function public.notify_task_assignment()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.assigned_to is not null
     and new.assigned_to <> coalesce(auth.uid(), new.assigned_to)
     and (tg_op = 'INSERT' or old.assigned_to is distinct from new.assigned_to) then
    insert into public.notifications (user_id, type, actor_id, group_id, task_id, body)
    values (new.assigned_to, 'task_assigned', auth.uid(), new.group_id, new.id,
      'You were assigned "' || new.title || '"');
  end if;
  return new;
end;
$$;
create trigger tasks_notify_assignment
  after insert or update on public.tasks
  for each row execute function public.notify_task_assignment();

-- ============ RPCs ============
-- create a group with members drawn only from the caller's friends
create or replace function public.create_group_with_members(
  _name text, _description text, _deadline timestamptz, _member_ids uuid[]
) returns uuid language plpgsql security definer set search_path = public as $$
declare gid uuid; m uuid;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if coalesce(trim(_name), '') = '' then raise exception 'Group name is required'; end if;

  insert into public.groups (name, description, deadline, created_by)
  values (trim(_name), nullif(trim(coalesce(_description,'')), ''), _deadline, auth.uid())
  returning id into gid;

  foreach m in array coalesce(_member_ids, '{}'::uuid[]) loop
    if m = auth.uid() then continue; end if;
    if not public.are_friends(auth.uid(), m) then
      raise exception 'You can only add friends to a group.';
    end if;
    insert into public.group_members (group_id, user_id) values (gid, m) on conflict do nothing;
  end loop;

  return gid;
end;
$$;

-- find people to befriend
create or replace function public.search_users(_q text)
returns table (id uuid, display_name text, avatar_url text, school text, link_status text)
language sql stable security definer set search_path = public as $$
  select p.id, p.display_name, p.avatar_url, p.school,
    coalesce(
      (select case
         when f.status = 'accepted' then 'friends'
         when f.status = 'pending' and f.requester_id = auth.uid() then 'sent'
         when f.status = 'pending' then 'incoming'
         else 'none' end
       from friendships f
       where (f.requester_id = auth.uid() and f.addressee_id = p.id)
          or (f.requester_id = p.id and f.addressee_id = auth.uid())
       limit 1), 'none') as link_status
  from profiles p
  where p.id <> auth.uid()
    and p.onboarded = true
    and length(coalesce(trim(_q), '')) >= 2
    and (p.display_name ilike '%' || trim(_q) || '%' or p.school ilike '%' || trim(_q) || '%')
    and not public.is_blocked_between(auth.uid(), p.id)
  order by p.display_name
  limit 20;
$$;

-- export everything about me
create or replace function public.export_my_data()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'exported_at', now(),
    'profile', (select to_jsonb(p) from profiles p where p.id = auth.uid()),
    'friendships', (select coalesce(jsonb_agg(to_jsonb(f)), '[]'::jsonb) from friendships f
                    where f.requester_id = auth.uid() or f.addressee_id = auth.uid()),
    'blocks', (select coalesce(jsonb_agg(to_jsonb(b)), '[]'::jsonb) from blocks b where b.blocker_id = auth.uid()),
    'groups', (select coalesce(jsonb_agg(to_jsonb(g)), '[]'::jsonb) from groups g
               where public.is_group_member(g.id, auth.uid())),
    'tasks', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from tasks t
              where public.is_group_member(t.group_id, auth.uid())),
    'notes', (select coalesce(jsonb_agg(to_jsonb(n)), '[]'::jsonb) from notes n
              where public.is_group_member(n.group_id, auth.uid())),
    'notifications', (select coalesce(jsonb_agg(to_jsonb(x)), '[]'::jsonb) from notifications x where x.user_id = auth.uid())
  );
$$;

-- hard cleanup of long-dead groups (21 days of silence)
create or replace function public.cleanup_inactive_groups()
returns integer language plpgsql security definer set search_path = public as $$
declare removed integer;
begin
  with gone as (
    delete from public.groups
    where last_activity_at < now() - interval '21 days'
    returning 1
  )
  select count(*) into removed from gone;
  return removed;
end;
$$;

revoke all on function public.cleanup_inactive_groups() from public, anon, authenticated;
grant execute on function public.cleanup_inactive_groups() to service_role;

grant execute on function public.create_group_with_members(text, text, timestamptz, uuid[]) to authenticated;
grant execute on function public.search_users(text) to authenticated;
grant execute on function public.export_my_data() to authenticated;
grant execute on function public.are_friends(uuid, uuid) to authenticated;
grant execute on function public.is_group_member(uuid, uuid) to authenticated;

-- ============ REALTIME ============
alter publication supabase_realtime add table public.tasks;
alter publication supabase_realtime add table public.notes;
alter publication supabase_realtime add table public.group_members;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.friendships;
alter publication supabase_realtime add table public.groups;