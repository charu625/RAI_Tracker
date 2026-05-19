"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { MetricDetail } from "@/components/metrics/metric-detail";
import { useMetric } from "@/context/metrics-context";

export default function MetricDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const metric = useMetric(id);

  if (!metric) {
    notFound();
  }

  return <MetricDetail metric={metric} />;
}
