"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { metricsReducer, type MetricsAction } from "@/lib/metrics-reducer";
import { MOCK_METRICS } from "@/lib/mock-metrics";
import type { Metric, MetricStatus } from "@/types/metric";
import type {
  MetricsContextValue,
  MetricsProviderProps,
} from "@/types/context";

const MetricsContext = createContext<MetricsContextValue | null>(null);

export function MetricsProvider({ children }: MetricsProviderProps) {
  const [state, dispatch] = useReducer(metricsReducer, {
    metrics: MOCK_METRICS,
  });

  const value = useMemo<MetricsContextValue>(
    () => ({
      metrics: state.metrics,
      dispatch,
      getMetricById: (id: string) =>
        state.metrics.find((m) => m.id === id),
      addMetric: (metric: Metric) =>
        dispatch({ type: "ADD_METRIC", payload: metric }),
      updateMetric: (metric: Metric) =>
        dispatch({ type: "UPDATE_METRIC", payload: metric }),
      setMetricStatus: (id: string, status: MetricStatus) =>
        dispatch({ type: "SET_STATUS", payload: { id, status } }),
    }),
    [state.metrics],
  );

  return (
    <MetricsContext.Provider value={value}>{children}</MetricsContext.Provider>
  );
}

export function useMetricsContext(): MetricsContextValue {
  const ctx = useContext(MetricsContext);
  if (!ctx) {
    throw new Error("useMetricsContext must be used within MetricsProvider");
  }
  return ctx;
}

export function useMetrics(): Metric[] {
  return useMetricsContext().metrics;
}

export function useMetric(id: string): Metric | undefined {
  const { getMetricById } = useMetricsContext();
  return getMetricById(id);
}
