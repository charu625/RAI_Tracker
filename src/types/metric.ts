export const METRIC_CATEGORIES = [
  "Fairness",
  "Transparency",
  "Safety",
  "Privacy",
  "Accountability",
  "Robustness",
] as const;

export type MetricCategory = (typeof METRIC_CATEGORIES)[number];

export const METRIC_STATUSES = ["active", "draft", "archived"] as const;
export type MetricStatus = (typeof METRIC_STATUSES)[number];

export const AI_SYSTEM_TYPES = [
  "Classification",
  "NLP",
  "Computer Vision",
  "Generative AI",
  "Recommendation",
] as const;

export type AiSystemType = (typeof AI_SYSTEM_TYPES)[number];

export const DATA_SOURCE_TYPES = [
  "API endpoint",
  "Manual upload",
  "Database query",
  "SDK integration",
] as const;

export type DataSourceType = (typeof DATA_SOURCE_TYPES)[number];

export const MEASUREMENT_FREQUENCIES = [
  "Real-time",
  "Daily",
  "Weekly",
  "Monthly",
  "On-demand",
] as const;

export type MeasurementFrequency = (typeof MEASUREMENT_FREQUENCIES)[number];

export const ESCALATION_POLICIES = [
  "None",
  "Notify manager",
  "Notify compliance team",
  "Block deployment",
] as const;

export type EscalationPolicy = (typeof ESCALATION_POLICIES)[number];

export const THRESHOLD_OPERATORS = ["gt", "lt", "gte", "lte"] as const;
export type ThresholdOperator = (typeof THRESHOLD_OPERATORS)[number];

export const ALERT_CONDITIONS = [
  "Below minimum threshold",
  "Approaching minimum threshold",
  "Data unavailable",
  "Configuration change",
] as const;

export type AlertCondition = (typeof ALERT_CONDITIONS)[number];

export interface ThresholdConfig {
  operator: ThresholdOperator;
  minimum: number;
  target: number;
  unit: string;
}

export interface AlertConfig {
  recipients: string[];
  conditions: AlertCondition[];
  escalation: EscalationPolicy;
}

export interface Metric {
  id: string;
  name: string;
  category: MetricCategory;
  status: MetricStatus;
  description: string;
  aiSystemTypes: AiSystemType[];
  dataSource: DataSourceType;
  frequency: MeasurementFrequency;
  threshold: ThresholdConfig;
  owner: string;
  alerts: AlertConfig;
  createdAt: string;
  updatedAt: string;
}

export interface WizardFormData {
  name: string;
  category: MetricCategory | "";
  description: string;
  aiSystemTypes: AiSystemType[];
  dataSource: DataSourceType | "";
  frequency: MeasurementFrequency | "";
  threshold: ThresholdConfig;
  owner: string;
  alerts: AlertConfig;
}

export const EMPTY_WIZARD_FORM: WizardFormData = {
  name: "",
  category: "",
  description: "",
  aiSystemTypes: [],
  dataSource: "",
  frequency: "",
  threshold: {
    operator: "gt",
    minimum: 0,
    target: 0,
    unit: "",
  },
  owner: "",
  alerts: {
    recipients: [],
    conditions: [],
    escalation: "None",
  },
};

export function metricToWizardForm(metric: Metric): WizardFormData {
  return {
    name: metric.name,
    category: metric.category,
    description: metric.description,
    aiSystemTypes: [...metric.aiSystemTypes],
    dataSource: metric.dataSource,
    frequency: metric.frequency,
    threshold: { ...metric.threshold },
    owner: metric.owner,
    alerts: {
      recipients: [...metric.alerts.recipients],
      conditions: [...metric.alerts.conditions],
      escalation: metric.alerts.escalation,
    },
  };
}

export function wizardFormToMetric(
  form: WizardFormData,
  status: MetricStatus,
  existing?: Metric,
): Metric {
  const now = new Date().toISOString();
  return {
    id:
      existing?.id ??
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `metric-${Date.now()}`),
    name: form.name.trim(),
    category: form.category as MetricCategory,
    status,
    description: form.description.trim(),
    aiSystemTypes: form.aiSystemTypes,
    dataSource: form.dataSource as DataSourceType,
    frequency: form.frequency as MeasurementFrequency,
    threshold: form.threshold,
    owner: form.owner.trim(),
    alerts: form.alerts,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}
