import { Users, CheckCircle2, Activity, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PillTone } from "./StatusPill";

const icons = { users: Users, check: CheckCircle2, activity: Activity, clock: Clock };

const toneClass: Record<PillTone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
  neutral: "bg-neutral-soft text-neutral",
  danger: "bg-danger-soft text-danger",
};

export function StatCard({
  label,
  value,
  icon,
  tone = "info",
  spark,
}: {
  label: string;
  value: number | string;
  icon: keyof typeof icons;
  tone?: PillTone;
  spark?: number[];
}) {
  const Icon = icons[icon];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span className={cn("grid size-10 place-items-center rounded-xl", toneClass[tone])}>
          <Icon className="size-5" />
        </span>
        {spark && (
          <div className="flex h-8 items-end gap-1">
            {spark.map((h, i) => (
              <span
                key={i}
                className={cn("w-1.5 rounded-sm", toneClass[tone])}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
