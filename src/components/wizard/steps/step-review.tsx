"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryBadge } from "@/components/metrics/category-badge";
import { ThresholdVisualizer } from "@/components/metrics/threshold-visualizer";
import { formatThreshold } from "@/lib/format";
import type { MetricCategory } from "@/types/metric";
import type {
  ReviewRowProps,
  ReviewSectionProps,
  StepReviewProps,
} from "@/types/components/wizard";

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: ReviewSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onEdit(step)}
        >
          <Pencil className="mr-1 size-3.5" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">{children}</CardContent>
    </Card>
  );
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium sm:text-right">{value}</span>
    </div>
  );
}

export function StepReview({ form, onEditStep }: StepReviewProps) {
  return (
    <div className="space-y-4">
      <ReviewSection title="Basic Details" step={1} onEdit={onEditStep}>
        <ReviewRow label="Name" value={form.name} />
        <ReviewRow
          label="Category"
          value={
            form.category ? (
              <CategoryBadge category={form.category as MetricCategory} />
            ) : (
              "—"
            )
          }
        />
        <ReviewRow
          label="Description"
          value={form.description || "—"}
        />
        <ReviewRow
          label="AI system types"
          value={form.aiSystemTypes.join(", ") || "—"}
        />
      </ReviewSection>

      <ReviewSection title="Measurement" step={2} onEdit={onEditStep}>
        <ReviewRow label="Data source" value={form.dataSource} />
        <ReviewRow label="Frequency" value={form.frequency} />
        <ReviewRow label="Threshold" value={formatThreshold(form.threshold)} />
        <ThresholdVisualizer threshold={form.threshold} readOnly />
      </ReviewSection>

      <ReviewSection title="Alerts & Ownership" step={3} onEdit={onEditStep}>
        <ReviewRow label="Owner" value={form.owner} />
        <ReviewRow
          label="Recipients"
          value={form.alerts.recipients.join(", ") || "—"}
        />
        <ReviewRow
          label="Conditions"
          value={form.alerts.conditions.join(", ") || "—"}
        />
        <ReviewRow label="Escalation" value={form.alerts.escalation} />
      </ReviewSection>
    </div>
  );
}
