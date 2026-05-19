import { cn } from "@/lib/utils";
import { formatStatusLabel } from "@/lib/format";
import type { MetricStatus } from "@/types/metric";

const STATUS_STYLES: Record<MetricStatus, string> = {
  active:
    "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300",
  draft:
    "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300",
  archived:
    "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400",
};

export function StatusBadge({
  status,
  className,
}: {
  status: MetricStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[status],
        className,
      )}
    >
      {formatStatusLabel(status)}
    </span>
  );
}
