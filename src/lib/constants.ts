import type { MetricCategory } from "@/types/metric";

export const CATEGORY_COLORS: Record<
  MetricCategory,
  { bg: string; text: string; border: string }
> = {
  Fairness: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-500/20",
  },
  Transparency: {
    bg: "bg-sky-500/10",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-500/20",
  },
  Safety: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-500/20",
  },
  Privacy: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-500/20",
  },
  Accountability: {
    bg: "bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-500/20",
  },
  Robustness: {
    bg: "bg-rose-500/10",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-500/20",
  },
};

export const WIZARD_STEPS = [
  { id: 1, label: "Basic Details", shortLabel: "Basic" },
  { id: 2, label: "Measurement", shortLabel: "Measure" },
  { id: 3, label: "Alerts & Ownership", shortLabel: "Alerts" },
  { id: 4, label: "Review", shortLabel: "Review" },
] as const;
