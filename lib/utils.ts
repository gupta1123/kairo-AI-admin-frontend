import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActivityType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function getFirstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function getActivityTone(type: ActivityType) {
  return {
    chat_session: "Chat",
    workspace_action: "Workspace",
    redeem_code: "Code",
    subscription: "Billing"
  }[type];
}
