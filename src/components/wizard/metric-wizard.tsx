"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { StepIndicator } from "@/components/wizard/step-indicator";
import { StepBasic } from "@/components/wizard/steps/step-basic";
import { StepMeasurement } from "@/components/wizard/steps/step-measurement";
import { StepAlerts } from "@/components/wizard/steps/step-alerts";
import { StepReview } from "@/components/wizard/steps/step-review";
import { useMetricsContext } from "@/context/metrics-context";
import {
  validateStep1WithIds,
  validateStep2,
  validateStep3,
  type Step1Errors,
  type Step2Errors,
  type Step3Errors,
} from "@/lib/validation";
import {
  EMPTY_WIZARD_FORM,
  metricToWizardForm,
  wizardFormToMetric,
  type WizardFormData,
} from "@/types/metric";
import type { MetricWizardProps } from "@/types/components/wizard";

export function MetricWizard({ mode, existingMetric }: MetricWizardProps) {
  const router = useRouter();
  const { metrics, addMetric, updateMetric } = useMetricsContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<WizardFormData>(() =>
    existingMetric ? metricToWizardForm(existingMetric) : { ...EMPTY_WIZARD_FORM },
  );
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});
  const [step3Errors, setStep3Errors] = useState<Step3Errors>({});

  const updateForm = useCallback((updates: Partial<WizardFormData>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    if (currentStep === 1) {
      const result = validateStep1WithIds(
        form,
        metrics.map((m) => ({ id: m.id, name: m.name })),
        existingMetric?.id,
      );
      if (!result.success) {
        setStep1Errors(result.errors);
        return false;
      }
      setStep1Errors({});
      return true;
    }
    if (currentStep === 2) {
      const result = validateStep2(form);
      if (!result.success) {
        setStep2Errors(result.errors);
        return false;
      }
      setStep2Errors({});
      return true;
    }
    if (currentStep === 3) {
      const result = validateStep3(form);
      if (!result.success) {
        setStep3Errors(result.errors);
        return false;
      }
      setStep3Errors({});
      return true;
    }
    return true;
  }, [currentStep, form, metrics, existingMetric?.id]);

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setCurrentStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSave = (status: "draft" | "active") => {
    const s1 = validateStep1WithIds(
      form,
      metrics.map((m) => ({ id: m.id, name: m.name })),
      existingMetric?.id,
    );
    const s2 = validateStep2(form);
    const s3 = validateStep3(form);

    if (!s1.success) {
      setStep1Errors(s1.errors);
      setCurrentStep(1);
      return;
    }
    if (!s2.success) {
      setStep2Errors(s2.errors);
      setCurrentStep(2);
      return;
    }
    if (!s3.success) {
      setStep3Errors(s3.errors);
      setCurrentStep(3);
      return;
    }

    const metric = wizardFormToMetric(form, status, existingMetric);

    if (mode === "edit" && existingMetric) {
      updateMetric(metric);
      toast.success(
        status === "active"
          ? "Metric updated and activated"
          : "Metric saved as draft",
      );
    } else {
      addMetric(metric);
      toast.success(
        status === "active"
          ? "Metric activated successfully"
          : "Metric saved as draft",
      );
    }

    router.push("/");
  };

  const stepTitles = [
    "Basic Details",
    "Measurement Configuration",
    "Alerts and Ownership",
    "Review and Confirm",
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={mode === "edit" ? "Edit Metric" : "Configure New Metric"}
        description="Set up a Responsible AI metric for your organisation in four steps."
        actions={
          <Button variant="ghost" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 size-4" />
            Cancel
          </Button>
        }
      />

      <StepIndicator
        currentStep={currentStep}
        onStepClick={(step) => {
          if (step < currentStep) setCurrentStep(step);
        }}
      />

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">
          Step {currentStep}: {stepTitles[currentStep - 1]}
        </h2>

        {currentStep === 1 && (
          <StepBasic form={form} errors={step1Errors} onChange={updateForm} />
        )}
        {currentStep === 2 && (
          <StepMeasurement
            form={form}
            errors={step2Errors}
            onChange={updateForm}
          />
        )}
        {currentStep === 3 && (
          <StepAlerts form={form} errors={step3Errors} onChange={updateForm} />
        )}
        {currentStep === 4 && (
          <StepReview form={form} onEditStep={setCurrentStep} />
        )}
      </div>

      <div className="sticky bottom-0 mt-6 flex flex-wrap items-center justify-between gap-3 border-t bg-background/95 py-4 backdrop-blur-sm">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>

        <div className="flex flex-wrap gap-2">
          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSave("draft")}
              >
                <Save className="mr-2 size-4" />
                Save as Draft
              </Button>
              <Button type="button" onClick={() => handleSave("active")}>
                Activate Metric
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
