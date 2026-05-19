"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryBadge } from "@/components/metrics/category-badge";
import { StatusBadge } from "@/components/metrics/status-badge";
import { ThresholdVisualizer } from "@/components/metrics/threshold-visualizer";
import { useMetricsContext } from "@/context/metrics-context";
import { formatDate, formatThreshold } from "@/lib/format";
import type { MetricStatus } from "@/types/metric";
import type { DetailRowProps, MetricDetailProps } from "@/types/components/metrics";

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium sm:col-span-2">{value}</dd>
    </div>
  );
}

export function MetricDetail({ metric }: MetricDetailProps) {
  const router = useRouter();
  const { setMetricStatus } = useMetricsContext();

  const handleStatusChange = (status: MetricStatus) => {
    setMetricStatus(metric.id, status);
    toast.success(`Status updated to ${status}`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-2")}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to library
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={metric.category} />
            <StatusBadge status={metric.status} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {metric.name}
          </h1>
          <p className="text-muted-foreground">{metric.description}</p>
        </div>
        <Link
          href={`/metrics/${metric.id}/edit`}
          className={buttonVariants()}
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={metric.status}
            onValueChange={(v) => handleStatusChange(v as MetricStatus)}
          >
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <dl>
              <DetailRow label="Owner" value={metric.owner} />
              <Separator />
              <DetailRow
                label="AI system types"
                value={metric.aiSystemTypes.join(", ")}
              />
              <Separator />
              <DetailRow label="Created" value={formatDate(metric.createdAt)} />
              <Separator />
              <DetailRow label="Updated" value={formatDate(metric.updatedAt)} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Measurement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl>
              <DetailRow label="Data source" value={metric.dataSource} />
              <Separator />
              <DetailRow label="Frequency" value={metric.frequency} />
              <Separator />
              <DetailRow
                label="Threshold"
                value={formatThreshold(metric.threshold)}
              />
            </dl>
            <ThresholdVisualizer threshold={metric.threshold} readOnly />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alerts & Escalation</CardTitle>
        </CardHeader>
        <CardContent>
          <dl>
            <DetailRow
              label="Recipients"
              value={metric.alerts.recipients.join(", ")}
            />
            <Separator />
            <DetailRow
              label="Conditions"
              value={metric.alerts.conditions.join(", ")}
            />
            <Separator />
            <DetailRow label="Escalation" value={metric.alerts.escalation} />
          </dl>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Button variant="outline" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 size-4" />
          Back to Metrics Library
        </Button>
      </div>
    </div>
  );
}
