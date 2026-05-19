"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmailChipsInput } from "@/components/wizard/email-chips-input";
import {
  ALERT_CONDITIONS,
  ESCALATION_POLICIES,
  type AlertCondition,
  type WizardFormData,
} from "@/types/metric";
import type { StepAlertsProps } from "@/types/components/wizard";

export function StepAlerts({ form, errors, onChange }: StepAlertsProps) {
  const toggleCondition = (condition: AlertCondition, checked: boolean) => {
    const next = checked
      ? [...form.alerts.conditions, condition]
      : form.alerts.conditions.filter((c) => c !== condition);
    onChange({
      alerts: { ...form.alerts, conditions: next },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="owner">
          Metric owner <span className="text-destructive">*</span>
        </Label>
        <Input
          id="owner"
          value={form.owner}
          onChange={(e) => onChange({ owner: e.target.value })}
          placeholder="e.g. Sarah Chen"
          aria-invalid={!!errors.owner}
        />
        <p className="text-xs text-muted-foreground">
          Simulates a user picker — enter the responsible owner&apos;s name
        </p>
        {errors.owner && (
          <p className="text-sm text-destructive">{errors.owner}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Alert recipients <span className="text-destructive">*</span>
        </Label>
        <EmailChipsInput
          emails={form.alerts.recipients}
          onChange={(recipients) =>
            onChange({ alerts: { ...form.alerts, recipients } })
          }
          error={errors.recipients}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Alert conditions <span className="text-destructive">*</span>
        </legend>
        <div className="grid gap-2">
          {ALERT_CONDITIONS.map((condition) => (
            <label
              key={condition}
              className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted/50"
            >
              <Checkbox
                checked={form.alerts.conditions.includes(condition)}
                onCheckedChange={(checked) =>
                  toggleCondition(condition, checked === true)
                }
              />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </div>
        {errors.conditions && (
          <p className="text-sm text-destructive">{errors.conditions}</p>
        )}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="escalation">Escalation policy</Label>
        <Select
          value={form.alerts.escalation}
          onValueChange={(v) =>
            onChange({
              alerts: {
                ...form.alerts,
                escalation: v as WizardFormData["alerts"]["escalation"],
              },
            })
          }
        >
          <SelectTrigger id="escalation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ESCALATION_POLICIES.map((policy) => (
              <SelectItem key={policy} value={policy}>
                {policy}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
