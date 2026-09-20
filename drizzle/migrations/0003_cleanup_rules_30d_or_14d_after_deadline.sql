create or replace function public.cleanup_inactive_groups()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $function$
declare removed integer;
begin
  with gone as (
    delete from public.groups
    where last_activity_at < now() - interval '30 days'
       or (deadline is not null and deadline < now() - interval '14 days')
    returning 1
  )
  select count(*) into removed from gone;
  return removed;
end;
$function$;

revoke all on function public.cleanup_inactive_groups() from public;
revoke all on function public.cleanup_inactive_groups() from anon;
revoke all on function public.cleanup_inactive_groups() from authenticated;
grant execute on function public.cleanup_inactive_groups() to service_role;