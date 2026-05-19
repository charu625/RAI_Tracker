"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThresholdVisualizer } from "@/components/metrics/threshold-visualizer";
import {
  DATA_SOURCE_TYPES,
  MEASUREMENT_FREQUENCIES,
  THRESHOLD_OPERATORS,
  type WizardFormData,
} from "@/types/metric";
import type { Step2Errors } from "@/lib/validation";
import { toSelectValue } from "@/lib/utils";
import type { StepMeasurementProps } from "@/types/components/wizard";

export function StepMeasurement({
  form,
  errors,
  onChange,
}: StepMeasurementProps) {
  const updateThreshold = (
    field: keyof WizardFormData["threshold"],
    value: string | number,
  ) => {
    onChange({
      threshold: { ...form.threshold, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dataSource">
            Data source type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={toSelectValue(form.dataSource)}
            onValueChange={(v) =>
              onChange({ dataSource: v as WizardFormData["dataSource"] })
            }
          >
            <SelectTrigger id="dataSource" aria-invalid={!!errors.dataSource}>
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              {DATA_SOURCE_TYPES.map((src) => (
                <SelectItem key={src} value={src}>
                  {src}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.dataSource && (
            <p className="text-sm text-destructive">{errors.dataSource}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">
            Measurement frequency <span className="text-destructive">*</span>
          </Label>
          <Select
            value={toSelectValue(form.frequency)}
            onValueChange={(v) =>
              onChange({ frequency: v as WizardFormData["frequency"] })
            }
          >
            <SelectTrigger id="frequency" aria-invalid={!!errors.frequency}>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {MEASUREMENT_FREQUENCIES.map((freq) => (
                <SelectItem key={freq} value={freq}>
                  {freq}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.frequency && (
            <p className="text-sm text-destructive">{errors.frequency}</p>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
        <h3 className="font-medium">Threshold configuration</h3>

        <div className="space-y-2">
          <Label htmlFor="operator">Comparison operator</Label>
          <Select
            value={form.threshold.operator}
            onValueChange={(v) =>
              updateThreshold(
                "operator",
                v as WizardFormData["threshold"]["operator"],
              )
            }
          >
            <SelectTrigger id="operator">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {THRESHOLD_OPERATORS.map((op) => (
                <SelectItem key={op} value={op}>
                  {op === "gt"
                    ? "Greater than (>)"
                    : op === "lt"
                      ? "Less than (<)"
                      : op === "gte"
                        ? "Greater than or equal (≥)"
                        : "Less than or equal (≤)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="minimum">
              Minimum acceptable <span className="text-destructive">*</span>
            </Label>
            <Input
              id="minimum"
              type="number"
              step="any"
              value={form.threshold.minimum || ""}
              onChange={(e) =>
                updateThreshold("minimum", parseFloat(e.target.value) || 0)
              }
              aria-invalid={!!errors["threshold.minimum"]}
            />
            {errors["threshold.minimum"] && (
              <p className="text-sm text-destructive">
                {errors["threshold.minimum"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="target">
              Target value <span className="text-destructive">*</span>
            </Label>
            <Input
              id="target"
              type="number"
              step="any"
              value={form.threshold.target || ""}
              onChange={(e) =>
                updateThreshold("target", parseFloat(e.target.value) || 0)
              }
              aria-invalid={!!errors["threshold.target"]}
            />
            {errors["threshold.target"] && (
              <p className="text-sm text-destructive">
                {errors["threshold.target"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">
              Unit <span className="text-destructive">*</span>
            </Label>
            <Input
              id="unit"
              value={form.threshold.unit}
              onChange={(e) => updateThreshold("unit", e.target.value)}
              placeholder="e.g. ratio, rate, score"
              aria-invalid={!!errors["threshold.unit"]}
            />
            {errors["threshold.unit"] && (
              <p className="text-sm text-destructive">
                {errors["threshold.unit"]}
              </p>
            )}
          </div>
        </div>

        <ThresholdVisualizer threshold={form.threshold} />
      </div>
    </div>
  );
}
