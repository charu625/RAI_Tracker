import type { MetricStatus, ThresholdConfig } from "@/types/metric";

const OPERATOR_SYMBOLS: Record<ThresholdConfig["operator"], string> = {
  gt: ">",
  lt: "<",
  gte: "≥",
  lte: "≤",
};

export function formatThreshold(threshold: ThresholdConfig): string {
  const symbol = OPERATOR_SYMBOLS[threshold.operator];
  return `${symbol} ${threshold.minimum} ${threshold.unit}`.trim();
}

export function formatThresholdShort(threshold: ThresholdConfig): string {
  const symbol = OPERATOR_SYMBOLS[threshold.operator];
  return `${symbol} ${threshold.minimum}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatStatusLabel(status: MetricStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}
