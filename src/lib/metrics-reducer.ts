import type { Metric, MetricStatus } from "@/types/metric";

export interface MetricsState {
  metrics: Metric[];
}

export type MetricsAction =
  | { type: "ADD_METRIC"; payload: Metric }
  | { type: "UPDATE_METRIC"; payload: Metric }
  | { type: "SET_STATUS"; payload: { id: string; status: MetricStatus } }
  | { type: "DELETE_METRIC"; payload: { id: string } };

export function metricsReducer(
  state: MetricsState,
  action: MetricsAction,
): MetricsState {
  switch (action.type) {
    case "ADD_METRIC":
      return {
        metrics: [action.payload, ...state.metrics],
      };
    case "UPDATE_METRIC":
      return {
        metrics: state.metrics.map((m) =>
          m.id === action.payload.id ? action.payload : m,
        ),
      };
    case "SET_STATUS":
      return {
        metrics: state.metrics.map((m) =>
          m.id === action.payload.id
            ? {
                ...m,
                status: action.payload.status,
                updatedAt: new Date().toISOString(),
              }
            : m,
        ),
      };
    case "DELETE_METRIC":
      return {
        metrics: state.metrics.filter((m) => m.id !== action.payload.id),
      };
    default:
      return state;
  }
}
