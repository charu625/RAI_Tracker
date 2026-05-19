"use client";

import Link from "next/link";
import { useMemo, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, LayoutGrid } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/metrics/metric-card";
import { MetricsFiltersBar } from "@/components/metrics/metrics-filters-bar";
import type { MetricsFilters } from "@/types/components/metrics";
import { useMetrics } from "@/context/metrics-context";
import type { Metric, MetricCategory, MetricStatus } from "@/types/metric";

function filterMetrics(metrics: Metric[], filters: MetricsFilters): Metric[] {
  return metrics.filter((metric) => {
    const matchesSearch =
      !filters.search ||
      metric.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory =
      filters.category === "all" || metric.category === filters.category;
    const matchesStatus =
      filters.status === "all" || metric.status === filters.status;
    return matchesSearch && matchesCategory && matchesStatus;
  });
}

function MetricsLibraryContent() {
  const metrics = useMetrics();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<MetricsFilters>(() => ({
    search: searchParams.get("q") ?? "",
    category: (searchParams.get("category") as MetricCategory | "all") || "all",
    status: (searchParams.get("status") as MetricStatus | "all") || "all",
  }));

  const updateFilters = useCallback(
    (next: MetricsFilters) => {
      setFilters(next);
      const params = new URLSearchParams();
      if (next.search) params.set("q", next.search);
      if (next.category !== "all") params.set("category", next.category);
      if (next.status !== "all") params.set("status", next.status);
      const query = params.toString();
      router.replace(query ? `/?${query}` : "/", { scroll: false });
    },
    [router],
  );

  const filtered = useMemo(
    () => filterMetrics(metrics, filters),
    [metrics, filters],
  );

  return (
    <div className="rai-grid-bg mx-auto max-w-7xl rounded-2xl p-1 md:p-2">
      <PageHeader
        title="Metrics Library"
        description="Configure, monitor, and manage Responsible AI metrics across your organisation's AI systems."
        actions={
          <Link href="/metrics/new" className={buttonVariants()}>
            <Plus className="mr-2 size-4" />
            Add New Metric
          </Link>
        }
      />

      <MetricsFiltersBar
        filters={filters}
        onChange={updateFilters}
        resultCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 py-16 text-center">
          <LayoutGrid className="mb-4 size-12 text-muted-foreground/50" />
          <h3 className="text-lg font-medium">No metrics found</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try adjusting your search or filters, or create a new metric to get
            started.
          </p>
          <Link
            href="/metrics/new"
            className={cn(buttonVariants(), "mt-6")}
          >
            <Plus className="mr-2 size-4" />
            Add New Metric
          </Link>
        </div>
      )}
    </div>
  );
}

export function MetricsLibrary() {
  return (
    <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
      <MetricsLibraryContent />
    </Suspense>
  );
}
