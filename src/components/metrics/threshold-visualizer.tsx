"use client";

import { cn } from "@/lib/utils";
import type { ThresholdVisualizerProps } from "@/types/components/metrics";

export function ThresholdVisualizer({
  threshold,
  readOnly = false,
  className,
}: ThresholdVisualizerProps) {
  const isGreater =
    threshold.operator === "gt" || threshold.operator === "gte";

  const min = threshold.minimum;
  const target = threshold.target;
  const range = Math.abs(target - min) || 1;

  const targetPercent = isGreater
    ? Math.min(100, ((target - min) / range) * 100)
    : Math.max(0, 100 - ((target - min) / range) * 100);

  const approachEnd = isGreater
    ? Math.max(0, targetPercent - 15)
    : Math.min(100, targetPercent + 15);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Min: <strong className="text-foreground">{min}</strong> {threshold.unit}
        </span>
        <span>
          Target: <strong className="text-foreground">{target}</strong>{" "}
          {threshold.unit}
        </span>
      </div>

      <div
        className={cn(
          "relative h-3 overflow-hidden rounded-full bg-muted",
          readOnly && "opacity-90",
        )}
        role="img"
        aria-label={`Threshold range from ${min} to ${target} ${threshold.unit}`}
      >
        {isGreater ? (
          <>
            <div
              className="absolute inset-y-0 left-0 bg-red-500/70"
              style={{ width: `${Math.max(approachEnd, 8)}%` }}
            />
            <div
              className="absolute inset-y-0 bg-amber-400/80"
              style={{
                left: `${Math.max(approachEnd, 8)}%`,
                width: `${Math.max(targetPercent - approachEnd, 8)}%`,
              }}
            />
            <div
              className="absolute inset-y-0 bg-emerald-500/80"
              style={{
                left: `${targetPercent}%`,
                width: `${100 - targetPercent}%`,
              }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-y-0 left-0 bg-emerald-500/80"
              style={{ width: `${targetPercent}%` }}
            />
            <div
              className="absolute inset-y-0 bg-amber-400/80"
              style={{
                left: `${targetPercent}%`,
                width: `${Math.max(approachEnd - targetPercent, 8)}%`,
              }}
            />
            <div
              className="absolute inset-y-0 right-0 bg-red-500/70"
              style={{
                left: `${approachEnd}%`,
                width: `${100 - approachEnd}%`,
              }}
            />
          </>
        )}

        <div
          className="absolute top-1/2 z-10 size-3 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow"
          style={{ left: `calc(${targetPercent}% - 6px)` }}
        />
      </div>

      <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="text-red-600 dark:text-red-400">Below min</span>
        <span className="text-amber-600 dark:text-amber-400">Approaching</span>
        <span className="text-emerald-600 dark:text-emerald-400">On target</span>
      </div>
    </div>
  );
}
