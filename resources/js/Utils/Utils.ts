import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(...classNames));
}

export function formatNumber(input: number) {
  return input.toLocaleString("de-DE");
}

export function isNumber(value: string): boolean {
  return /^\d+(\.\d+)?$/.test(value);
}
