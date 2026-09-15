import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Pill,
  FileClock,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

const main = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "Patients", to: "/patients", icon: Users },
  { title: "Prescriptions", to: "/prescriptions", icon: Pill },
  { title: "Notifications", to: "/notifications", icon: Bell, badge: 3 },
] as const;

const support = [
  { title: "Settings", to: "/settings", icon: Settings },
  { title: "Logout", to: "/", icon: LogOut },
] as const;

function NavItem({
  to,
  title,
  icon: Icon,
  badge,
  active,
}: {
  to: string;
  title: string;
  icon: typeof Users;
  badge?: number;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-muted",
      )}
    >
      <Icon className="size-[18px] shrink-0" />
      <span className="truncate">{title}</span>
      {badge ? (
        <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Stethoscope className="size-5" />
        </span>
        <span className="text-[17px] leading-tight font-extrabold tracking-tight text-foreground">
          Medi<span className="text-primary">Kiosk</span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-6">
        <div className="space-y-1">
          <p className="px-3.5 pb-2 text-[11px] font-bold tracking-[0.12em] text-muted-foreground">
            MAIN
          </p>
          {main.map((item) => (
            <NavItem key={item.to} {...item} active={pathname.startsWith(item.to)} />
          ))}
        </div>
        <div className="space-y-1">
          <p className="px-3.5 pb-2 text-[11px] font-bold tracking-[0.12em] text-muted-foreground">
            SUPPORT
          </p>
          {support.map((item) => (
            <NavItem key={item.title} {...item} active={pathname === item.to && item.to !== "/"} />
          ))}
        </div>
      </nav>

      <div className="m-4 rounded-2xl bg-primary-soft p-4">
        <p className="text-sm font-semibold text-foreground">Kiosk network</p>
        <p className="mt-1 text-xs text-muted-foreground">5 of 5 kiosks online</p>
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full bg-primary" />
          ))}
        </div>
      </div>
    </aside>
  );
}
