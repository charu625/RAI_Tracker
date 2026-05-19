import { CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { MetricCategory } from "@/types/metric";

export function CategoryBadge({
  category,
  className,
}: {
  category: MetricCategory;
  className?: string;
}) {
  const colors = CATEGORY_COLORS[category];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        colors.border,
        className,
      )}
    >
      {category}
    </span>
  );
}
