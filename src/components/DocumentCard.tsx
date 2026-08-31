import { FileText } from "lucide-react";

export function DocumentCard({
  name,
  date,
  meta,
}: {
  name: string;
  date: string;
  meta: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-info-soft text-info">
        <FileText className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {date} · {meta}
        </p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft"
      >
        View Document
      </button>
    </div>
  );
}
