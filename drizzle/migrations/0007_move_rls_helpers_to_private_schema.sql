-- Move internal RLS helper functions out of the exposed public API schema.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, service_role;

create or replace function private.are_friends(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from friendships f
    where f.status = 'accepted'
      and ((f.requester_id = _a and f.addressee_id = _b)
        or (f.requester_id = _b and f.addressee_id = _a))
  );
$$;

create or replace function private.has_friend_link(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from friendships f
    where ((f.requester_id = _a and f.addressee_id = _b)
        or (f.requester_id = _b and f.addressee_id = _a))
  );
$$;

create or replace function private.is_blocked_between(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from blocks b
    where (b.blocker_id = _a and b.blocked_id = _b)
       or (b.blocker_id = _b and b.blocked_id = _a)
  );
$$;

create or replace function private.is_group_member(_group_id uuid, _user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from group_members gm
    where gm.group_id = _group_id and gm.user_id = _user_id
  );
$$;

create or replace function private.shares_group(_a uuid, _b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from group_members x
    join group_members y on y.group_id = x.group_id
    where x.user_id = _a and y.user_id = _b
  );
$$;

revoke all on function private.are_friends(uuid, uuid) from public;
revoke all on function private.has_friend_link(uuid, uuid) from public;
revoke all on function private.is_blocked_between(uuid, uuid) from public;
revoke all on function private.is_group_member(uuid, uuid) from public;
revoke all on function private.shares_group(uuid, uuid) from public;
grant execute on function private.are_friends(uuid, uuid) to authenticated, service_role;
grant execute on function private.has_friend_link(uuid, uuid) to authenticated, service_role;
grant execute on function private.is_blocked_between(uuid, uuid) to authenticated, service_role;
grant execute on function private.is_group_member(uuid, uuid) to authenticated, service_role;
grant execute on function private.shares_group(uuid, uuid) to authenticated, service_role;

-- Repoint policies at the private helpers.
drop policy if exists "send friend request" on public.friendships;
create policy "send friend request" on public.friendships for insert to authenticated
with check (requester_id = auth.uid() and not private.is_blocked_between(auth.uid(), addressee_id));

drop policy if exists "members add friends" on public.group_members;
create policy "members add friends" on public.group_members for insert to authenticated
with check (
  ((user_id = auth.uid()) and exists (select 1 from public.groups g where g.id = group_id and g.created_by = auth.uid()))
  or (
    private.is_group_member(group_id, auth.uid())
    and private.are_friends(auth.uid(), user_id)
    and not exists (
      select 1 from public.group_members gm
      where gm.group_id = group_members.group_id
        and private.is_blocked_between(gm.user_id, group_members.user_id)
    )
  )
);

drop policy if exists "membership visible to members" on public.group_members;
create policy "membership visible to members" on public.group_members for select to authenticated
using (private.is_group_member(group_id, auth.uid()));

drop policy if exists "groups visible to members" on public.groups;
create policy "groups visible to members" on public.groups for select to authenticated
using (private.is_group_member(id, auth.uid()));

drop policy if exists "members update group" on public.groups;
create policy "members update group" on public.groups for update to authenticated
using (private.is_group_member(id, auth.uid()))
with check (private.is_group_member(id, auth.uid()));

drop policy if exists "notes for members" on public.notes;
create policy "notes for members" on public.notes for select to authenticated
using (private.is_group_member(group_id, auth.uid()));

drop policy if exists "notes insert for members" on public.notes;
create policy "notes insert for members" on public.notes for insert to authenticated
with check (private.is_group_member(group_id, auth.uid()) and created_by = auth.uid());

drop policy if exists "notes update own" on public.notes;
create policy "notes update own" on public.notes for update to authenticated
using (created_by = auth.uid())
with check (created_by = auth.uid() and private.is_group_member(group_id, auth.uid()));

drop policy if exists "profiles readable by self friends and groupmates" on public.profiles;
create policy "profiles readable by self friends and groupmates" on public.profiles for select to authenticated
using (id = auth.uid() or private.has_friend_link(auth.uid(), id) or private.shares_group(auth.uid(), id));

drop policy if exists "tasks for members" on public.tasks;
create policy "tasks for members" on public.tasks for select to authenticated
using (private.is_group_member(group_id, auth.uid()));

drop policy if exists "tasks insert for members" on public.tasks;
create policy "tasks insert for members" on public.tasks for insert to authenticated
with check (private.is_group_member(group_id, auth.uid()));

drop policy if exists "tasks update for members" on public.tasks;
create policy "tasks update for members" on public.tasks for update to authenticated
using (private.is_group_member(group_id, auth.uid()))
with check (private.is_group_member(group_id, auth.uid()));

drop policy if exists "tasks delete for members" on public.tasks;
create policy "tasks delete for members" on public.tasks for delete to authenticated
using (private.is_group_member(group_id, auth.uid()));

-- Repoint functions that used the public helpers.
create or replace function public.enforce_friend_request()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if private.is_blocked_between(new.requester_id, new.addressee_id) then
    raise exception 'This user is not available.';
  end if;
  return new;
end;
$$;

create or replace function public.notify_group_add()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if exists (
    select 1 from public.group_members gm
    where gm.group_id = new.group_id
      and gm.user_id <> new.user_id
      and private.is_blocked_between(gm.user_id, new.user_id)
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

create or replace function public.search_users(_q text)
returns table(id uuid, display_name text, avatar_url text, school text, link_status text)
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
    and not private.is_blocked_between(auth.uid(), p.id)
  order by p.display_name
  limit 20;
$$;

create or replace function public.export_my_data()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'exported_at', now(),
    'profile', (select to_jsonb(p) from profiles p where p.id = auth.uid()),
    'friendships', (select coalesce(jsonb_agg(to_jsonb(f)), '[]'::jsonb) from friendships f
                    where f.requester_id = auth.uid() or f.addressee_id = auth.uid()),
    'blocks', (select coalesce(jsonb_agg(to_jsonb(b)), '[]'::jsonb) from blocks b where b.blocker_id = auth.uid()),
    'groups', (select coalesce(jsonb_agg(to_jsonb(g)), '[]'::jsonb) from groups g
               where private.is_group_member(g.id, auth.uid())),
    'tasks', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from tasks t
              where private.is_group_member(t.group_id, auth.uid())),
    'notes', (select coalesce(jsonb_agg(to_jsonb(n)), '[]'::jsonb) from notes n
              where private.is_group_member(n.group_id, auth.uid())),
    'notifications', (select coalesce(jsonb_agg(to_jsonb(x)), '[]'::jsonb) from notifications x where x.user_id = auth.uid())
  );
$$;

create or replace function public.create_group_with_members(_name text, _description text, _deadline timestamp with time zone, _member_ids uuid[])
returns uuid language plpgsql security definer set search_path = public as $$
declare gid uuid; m uuid;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if coalesce(trim(_name), '') = '' then raise exception 'Group name is required'; end if;

  insert into public.groups (name, description, deadline, created_by)
  values (trim(_name), nullif(trim(coalesce(_description,'')), ''), _deadline, auth.uid())
  returning id into gid;

  foreach m in array coalesce(_member_ids, '{}'::uuid[]) loop
    if m = auth.uid() then continue; end if;
    if not private.are_friends(auth.uid(), m) then
      raise exception 'You can only add friends to a group.';
    end if;
    insert into public.group_members (group_id, user_id) values (gid, m) on conflict do nothing;
  end loop;

  return gid;
end;
$$;

-- Drop the now-unused public copies so they are no longer part of the API.
drop function if exists public.are_friends(uuid, uuid);
drop function if exists public.has_friend_link(uuid, uuid);
drop function if exists public.is_blocked_between(uuid, uuid);
drop function if exists public.is_group_member(uuid, uuid);
drop function if exists public.shares_group(uuid, uuid);
