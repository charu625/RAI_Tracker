"use client";

import { MetricsProvider } from "@/context/metrics-context";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MetricsProvider>
        {children}
        <Toaster richColors position="top-right" />
      </MetricsProvider>
    </ThemeProvider>
  );
}
