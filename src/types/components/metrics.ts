import type { ReactNode } from "react";
import type { Metric, MetricCategory, MetricStatus, ThresholdConfig } from "@/types/metric";

export interface MetricsFilters {
  search: string;
  category: MetricCategory | "all";
  status: MetricStatus | "all";
}

export interface MetricsFiltersBarProps {
  filters: MetricsFilters;
  onChange: (filters: MetricsFilters) => void;
  resultCount: number;
}

export interface MetricDetailProps {
  metric: Metric;
}

export interface DetailRowProps {
  label: string;
  value: ReactNode;
}

export interface ThresholdVisualizerProps {
  threshold: ThresholdConfig;
  readOnly?: boolean;
  className?: string;
}
