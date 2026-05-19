import type { Dispatch, ReactNode } from "react";
import type { MetricsAction } from "@/lib/metrics-reducer";
import type { Metric, MetricStatus } from "@/types/metric";

export interface MetricsContextValue {
  metrics: Metric[];
  dispatch: Dispatch<MetricsAction>;
  getMetricById: (id: string) => Metric | undefined;
  addMetric: (metric: Metric) => void;
  updateMetric: (metric: Metric) => void;
  setMetricStatus: (id: string, status: MetricStatus) => void;
}

export interface MetricsProviderProps {
  children: ReactNode;
}
