import type { ReactNode } from "react";
import type { Metric, WizardFormData } from "@/types/metric";
import type { Step1Errors, Step2Errors, Step3Errors } from "@/lib/validation";

export interface MetricWizardProps {
  mode: "create" | "edit";
  existingMetric?: Metric;
}

export interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export interface StepBasicProps {
  form: WizardFormData;
  errors: Step1Errors;
  onChange: (updates: Partial<WizardFormData>) => void;
}

export interface StepMeasurementProps {
  form: WizardFormData;
  errors: Step2Errors;
  onChange: (updates: Partial<WizardFormData>) => void;
}

export interface StepAlertsProps {
  form: WizardFormData;
  errors: Step3Errors;
  onChange: (updates: Partial<WizardFormData>) => void;
}

export interface StepReviewProps {
  form: WizardFormData;
  onEditStep: (step: number) => void;
}

export interface ReviewSectionProps {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: ReactNode;
}

export interface ReviewRowProps {
  label: string;
  value: ReactNode;
}

export interface EmailChipsInputProps {
  emails: string[];
  onChange: (emails: string[]) => void;
  error?: string;
}
