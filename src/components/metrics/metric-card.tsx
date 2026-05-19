"use client";

import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CategoryBadge } from "@/components/metrics/category-badge";
import { StatusBadge } from "@/components/metrics/status-badge";
import { formatThresholdShort, getInitials } from "@/lib/format";
import type { Metric } from "@/types/metric";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Link href={`/metrics/${metric.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-all duration-200 hover:border-primary/30 hover:shadow-lg">
        <CardHeader className="space-y-3 pb-2">
          <div className="flex items-start justify-between gap-2">
            <CategoryBadge category={metric.category} />
            <StatusBadge status={metric.status} />
          </div>
          <h3 className="text-lg font-semibold leading-tight tracking-tight group-hover:text-primary">
            {metric.name}
          </h3>
        </CardHeader>
        <CardContent className="flex-1 space-y-3 text-sm">
          <p className="line-clamp-2 text-muted-foreground">
            {metric.description || "No description provided."}
          </p>
          <div className="rounded-lg border bg-muted/40 px-3 py-2">
            <p className="text-xs text-muted-foreground">Threshold</p>
            <p className="font-mono text-sm font-medium">
              {formatThresholdShort(metric.threshold)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {getInitials(metric.owner)}
            </div>
            <span className="flex items-center gap-1">
              <User className="size-3.5" />
              {metric.owner}
            </span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </CardFooter>
      </Card>
    </Link>
  );
}
