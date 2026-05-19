"use client";

import { Check } from "lucide-react";
import { WIZARD_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { StepIndicatorProps } from "@/types/components/wizard";

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="Wizard progress" className="mb-8">
      <ol className="flex items-center justify-between gap-2">
        {WIZARD_STEPS.map((step, index) => {
          const stepNum = step.id;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isClickable = onStepClick && stepNum < currentStep;

          return (
            <li key={step.id} className="flex flex-1 items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(stepNum)}
                className={cn(
                  "flex w-full flex-col items-center gap-2 text-center",
                  isClickable && "cursor-pointer",
                  !isClickable && "cursor-default",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isComplete &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-primary/10 text-primary",
                    !isComplete &&
                      !isCurrent &&
                      "border-muted-foreground/30 text-muted-foreground",
                  )}
                >
                  {isComplete ? <Check className="size-4" /> : stepNum}
                </span>
                <span className="hidden text-xs font-medium sm:block md:text-sm">
                  <span className="md:hidden">{step.shortLabel}</span>
                  <span className="hidden md:inline">{step.label}</span>
                </span>
              </button>
              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 hidden h-0.5 flex-1 sm:block",
                    isComplete ? "bg-primary" : "bg-border",
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
