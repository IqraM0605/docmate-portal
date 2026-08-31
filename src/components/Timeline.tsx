import { cn } from "@/lib/utils";

type Event = {
  year: string;
  title: string;
  detail: string;
  type: "surgery" | "condition" | "test" | "today";
};

const dotClass: Record<Event["type"], string> = {
  surgery: "bg-danger",
  condition: "bg-warning",
  test: "bg-info",
  today: "bg-success",
};

const legend = [
  { type: "surgery", label: "Procedure" },
  { type: "condition", label: "Diagnosis" },
  { type: "test", label: "Investigation" },
  { type: "today", label: "Current visit" },
] as const;

export function Timeline({ events }: { events: Event[] }) {
  return (
    <div>
      <ol className="relative space-y-6 border-l border-border pl-6">
        {events.map((e) => (
          <li key={e.year + e.title} className="relative">
            <span
              className={cn(
                "absolute top-1.5 -left-[27px] size-3 rounded-full ring-4 ring-card",
                dotClass[e.type],
              )}
            />
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-bold",
                  e.type === "today"
                    ? "bg-success-soft text-success"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {e.year}
              </span>
              <p
                className={cn(
                  "text-sm font-semibold",
                  e.type === "today" ? "text-foreground" : "text-foreground",
                )}
              >
                {e.title}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-4">
        {legend.map((l) => (
          <span key={l.type} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={cn("size-2 rounded-full", dotClass[l.type])} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
