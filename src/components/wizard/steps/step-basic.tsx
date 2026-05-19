"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AI_SYSTEM_TYPES,
  METRIC_CATEGORIES,
  type WizardFormData,
  type AiSystemType,
} from "@/types/metric";
import type { Step1Errors } from "@/lib/validation";
import { toSelectValue } from "@/lib/utils";
import type { StepBasicProps } from "@/types/components/wizard";

export function StepBasic({ form, errors, onChange }: StepBasicProps) {
  const toggleSystemType = (type: AiSystemType, checked: boolean) => {
    const next = checked
      ? [...form.aiSystemTypes, type]
      : form.aiSystemTypes.filter((t) => t !== type);
    onChange({ aiSystemTypes: next });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Metric name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Demographic Parity"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">
          Category <span className="text-destructive">*</span>
        </Label>
        <Select
          value={toSelectValue(form.category)}
          onValueChange={(v) =>
            onChange({ category: v as WizardFormData["category"] })
          }
        >
          <SelectTrigger id="category" aria-invalid={!!errors.category}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {METRIC_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe what this metric measures and why it matters..."
          rows={4}
          aria-invalid={!!errors.description}
        />
        <p className="text-xs text-muted-foreground">
          {form.description.length}/500 characters
        </p>
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Applicable AI system types{" "}
          <span className="text-destructive">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {AI_SYSTEM_TYPES.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 has-checked:border-primary has-checked:bg-primary/5"
            >
              <Checkbox
                checked={form.aiSystemTypes.includes(type)}
                onCheckedChange={(checked) =>
                  toggleSystemType(type, checked === true)
                }
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
        {errors.aiSystemTypes && (
          <p className="text-sm text-destructive">{errors.aiSystemTypes}</p>
        )}
      </fieldset>
    </div>
  );
}
