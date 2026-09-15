import { Bell, Settings, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { doctor } from "@/data/mock";

export function TopBar({
  title,
  subtitle,
  showSearch = false,
}: {
  title: string;
  subtitle: string;
  showSearch?: boolean;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-6 py-5 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-extrabold tracking-tight text-foreground lg:text-2xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          to="/settings"
          className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Settings"
        >
          <Settings className="size-[18px]" />
        </Link>
        <Link
          to="/notifications"
          className="relative grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" />
          <span className="absolute top-2 right-2.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
        </Link>
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pr-3 pl-1.5 transition-colors hover:bg-muted"
        >
          <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {doctor.initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-xs leading-tight font-semibold text-foreground">
              {doctor.name}
            </span>
            <span className="block text-[11px] leading-tight text-muted-foreground">
              {doctor.department}
            </span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
