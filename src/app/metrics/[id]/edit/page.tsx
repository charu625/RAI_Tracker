"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { MetricWizard } from "@/components/wizard/metric-wizard";
import { useMetric } from "@/context/metrics-context";

export default function EditMetricPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const metric = useMetric(id);

  if (!metric) {
    notFound();
  }

  return <MetricWizard mode="edit" existingMetric={metric} />;
}
