"use client";

import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { METRIC_CATEGORIES, METRIC_STATUSES } from "@/types/metric";
import type {
  MetricsFilters,
  MetricsFiltersBarProps,
} from "@/types/components/metrics";
import { cn } from "@/lib/utils";

export function MetricsFiltersBar({
  filters,
  onChange,
  resultCount,
}: MetricsFiltersBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        onChange({ ...filters, search: searchInput });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, filters, onChange]);

  const clearFilters = useCallback(() => {
    setSearchInput("");
    onChange({ search: "", category: "all", status: "all" });
  }, [onChange]);

  const hasActiveFilters =
    filters.search || filters.category !== "all" || filters.status !== "all";

  const categoryLabel =
    filters.category === "all" ? "All categories" : filters.category;
  const statusLabel =
    filters.status === "all"
      ? "All statuses"
      : filters.status.charAt(0).toUpperCase() + filters.status.slice(1);

  return (
    <div className="sticky top-14 z-30 -mx-4 mb-6 border-b border-border/60 bg-background/95 px-4 py-4 backdrop-blur-md md:static md:mx-0 md:rounded-xl md:border md:px-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative flex-1 space-y-1.5">
          <Label htmlFor="metrics-search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="metrics-search"
              placeholder="Search by metric name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="filter-category">Category</Label>
            <Select
              value={filters.category}
              onValueChange={(v) =>
                onChange({
                  ...filters,
                  category: v as MetricsFilters["category"],
                })
              }
            >
              <SelectTrigger id="filter-category" className="w-[180px]">
                <SelectValue>{categoryLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {METRIC_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="filter-status">Status</Label>
            <Select
              value={filters.status}
              onValueChange={(v) =>
                onChange({
                  ...filters,
                  status: v as MetricsFilters["status"],
                })
              }
            >
              <SelectTrigger id="filter-status" className="w-[160px]">
                <SelectValue>{statusLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {METRIC_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="mb-0.5"
            >
              <X className="mr-1 size-4" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
      <p
        className={cn(
          "mt-3 text-xs text-muted-foreground",
          resultCount === 0 && "text-destructive",
        )}
      >
        {resultCount} metric{resultCount !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}
