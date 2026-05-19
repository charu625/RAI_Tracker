import { z } from "zod";
import {
  AI_SYSTEM_TYPES,
  ALERT_CONDITIONS,
  DATA_SOURCE_TYPES,
  ESCALATION_POLICIES,
  MEASUREMENT_FREQUENCIES,
  METRIC_CATEGORIES,
  THRESHOLD_OPERATORS,
  type WizardFormData,
} from "@/types/metric";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email.trim());
}

const thresholdSchema = z
  .object({
    operator: z.enum(THRESHOLD_OPERATORS),
    minimum: z.number({ error: "Minimum value is required" }),
    target: z.number({ error: "Target value is required" }),
    unit: z.string().min(1, "Unit of measurement is required"),
  })
  .superRefine((data, ctx) => {
    const isGreater = data.operator === "gt" || data.operator === "gte";
    if (isGreater && data.minimum > data.target) {
      ctx.addIssue({
        code: "custom",
        message: "Target must be greater than or equal to minimum",
        path: ["target"],
      });
    }
    if (!isGreater && data.minimum < data.target) {
      ctx.addIssue({
        code: "custom",
        message: "Target must be less than or equal to minimum",
        path: ["target"],
      });
    }
  });

export const step1Schema = z.object({
  name: z
    .string()
    .min(1, "Metric name is required")
    .min(3, "Metric name must be at least 3 characters"),
  category: z.enum(METRIC_CATEGORIES, {
    error: "Category is required",
  }),
  description: z.string().max(500, "Description must be 500 characters or less"),
  aiSystemTypes: z
    .array(z.enum(AI_SYSTEM_TYPES))
    .min(1, "Select at least one AI system type"),
});

export const step2Schema = z.object({
  dataSource: z.enum(DATA_SOURCE_TYPES, {
    error: "Data source is required",
  }),
  frequency: z.enum(MEASUREMENT_FREQUENCIES, {
    error: "Measurement frequency is required",
  }),
  threshold: thresholdSchema,
});

export const step3Schema = z.object({
  owner: z
    .string()
    .min(1, "Metric owner is required")
    .min(2, "Owner name must be at least 2 characters"),
  alerts: z.object({
    recipients: z
      .array(z.string())
      .min(1, "Add at least one alert recipient")
      .refine(
        (emails) => emails.every(isValidEmail),
        "All recipient emails must be valid",
      ),
    conditions: z
      .array(z.enum(ALERT_CONDITIONS))
      .min(1, "Select at least one alert condition"),
    escalation: z.enum(ESCALATION_POLICIES),
  }),
});

export type Step1Errors = Partial<Record<keyof z.infer<typeof step1Schema>, string>>;
export type Step2Errors = Partial<
  Record<keyof z.infer<typeof step2Schema> | "threshold.minimum" | "threshold.target" | "threshold.unit", string>
>;
export type Step3Errors = Partial<
  Record<"owner" | "recipients" | "conditions" | "escalation", string>
>;

function flattenZodErrors(
  error: z.ZodError,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!result[path]) {
      result[path] = issue.message;
    }
  }
  return result;
}

export function validateStep1WithIds(
  form: WizardFormData,
  metrics: { id: string; name: string }[],
  editingId?: string,
): { success: true } | { success: false; errors: Step1Errors } {
  const result = step1Schema.safeParse({
    name: form.name,
    category: form.category || undefined,
    description: form.description,
    aiSystemTypes: form.aiSystemTypes,
  });

  if (!result.success) {
    const flat = flattenZodErrors(result.error);
    return {
      success: false,
      errors: {
        name: flat.name,
        category: flat.category,
        description: flat.description,
        aiSystemTypes: flat.aiSystemTypes,
      },
    };
  }

  const duplicate = metrics.some(
    (m) =>
      m.name.toLowerCase() === form.name.trim().toLowerCase() &&
      m.id !== editingId,
  );

  if (duplicate) {
    return {
      success: false,
      errors: { name: "A metric with this name already exists" },
    };
  }

  return { success: true };
}

export function validateStep2(
  form: WizardFormData,
): { success: true } | { success: false; errors: Step2Errors } {
  const result = step2Schema.safeParse({
    dataSource: form.dataSource || undefined,
    frequency: form.frequency || undefined,
    threshold: form.threshold,
  });

  if (!result.success) {
    const flat = flattenZodErrors(result.error);
    return {
      success: false,
      errors: {
        dataSource: flat.dataSource,
        frequency: flat.frequency,
        "threshold.minimum": flat["threshold.minimum"],
        "threshold.target": flat["threshold.target"],
        "threshold.unit": flat["threshold.unit"],
      },
    };
  }

  return { success: true };
}

export function validateStep3(
  form: WizardFormData,
): { success: true } | { success: false; errors: Step3Errors } {
  const result = step3Schema.safeParse({
    owner: form.owner,
    alerts: form.alerts,
  });

  if (!result.success) {
    const flat = flattenZodErrors(result.error);
    return {
      success: false,
      errors: {
        owner: flat.owner,
        recipients: flat["alerts.recipients"],
        conditions: flat["alerts.conditions"],
        escalation: flat["alerts.escalation"],
      },
    };
  }

  return { success: true };
}
