import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Keeps Base UI Select controlled when form state uses "" for empty. */
export function toSelectValue<T extends string>(value: T | ""): T | null {
  return value === "" ? null : value
}
