import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function initials(name?: string | null) {
  const clean = (name ?? "").trim();
  if (!clean) return "?";
  return clean
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserAvatar({
  name,
  url,
  className,
}: {
  name?: string | null | undefined;
  url?: string | null | undefined;
  className?: string | undefined;
}) {
  return (
    <Avatar className={cn("size-9 border border-border/60", className)}>
      {url ? <AvatarImage src={url} alt={name ?? "Member"} /> : null}
      <AvatarFallback className="bg-primary/12 font-display text-xs font-semibold text-primary">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

export function AvatarStack({
  people,
}: {
  people: { id: string; display_name: string; avatar_url: string | null }[];
}) {
  const shown = people.slice(0, 4);
  return (
    <div className="flex items-center">
      {shown.map((p) => (
        <UserAvatar
          key={p.id}
          name={p.display_name}
          url={p.avatar_url}
          className="-mr-2 size-7 ring-2 ring-background last:mr-0"
        />
      ))}
      <span className="ml-3 text-xs text-muted-foreground">
        {people.length} {people.length === 1 ? "member" : "members"}
      </span>
    </div>
  );
}
