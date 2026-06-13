import type { ComponentType, SVGProps } from "react";

export type RedeemCodeStatus = "active" | "used" | "expired" | "revoked";

export type SubscriptionPlan = "free" | "pro";

export type SubscriptionStatus =
  | "free"
  | "active"
  | "trialing"
  | "past_due"
  | "expired"
  | "canceled";

export type ActivityType =
  | "chat_session"
  | "workspace_action"
  | "redeem_code"
  | "subscription";

export type UsageMetric = {
  date: string;
  activeUsers: number;
  chatSessions: number;
  workspaceActions: number;
  redeemCodesUsed: number;
};

export type RedeemCodeRedemption = {
  userId: string;
  userName: string;
  userEmail: string;
  redeemedAt: string;
  subscriptionGrantId: string;
  proAccessEndsAt: string;
};

export type RedeemCodeSummary = {
  id: string;
  codePreview: string;
  status: RedeemCodeStatus;
  planGrant: "pro_monthly";
  durationDays: number;
  createdAt: string;
  expiresAt: string;
  createdBy: string;
  redemption: RedeemCodeRedemption | null;
};

export type AuditEvent = {
  id: string;
  label: string;
  description: string;
  actor: string;
  createdAt: string;
};

export type RedeemCodeDetail = RedeemCodeSummary & {
  normalizedCodeHint: string;
  backendRule: string;
  auditTimeline: AuditEvent[];
};

export type GeneratedRedeemCode = {
  plaintextCode: string;
  record: RedeemCodeSummary;
};

export type AdminUserSummary = {
  id: string;
  name: string;
  email: string;
  initials: string;
  company: string;
  plan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  proAccessEndsAt: string | null;
  createdAt: string;
  lastActiveAt: string;
  chatSessions: number;
  workspaceActions: number;
  redeemCodesRedeemed: number;
};

export type RedeemHistoryItem = {
  codeId: string;
  codePreview: string;
  redeemedAt: string;
  grantLabel: string;
  proAccessEndsAt: string;
};

export type UserActivityItem = {
  id: string;
  type: ActivityType;
  label: string;
  metadata: string;
  createdAt: string;
};

export type AdminUserDetail = AdminUserSummary & {
  timezone: string;
  connectedServices: string[];
  usageByPeriod: {
    currentMonthChatSessions: number;
    currentMonthWorkspaceActions: number;
    totalChatMessages: number;
    lastSevenDayActions: number;
  };
  redeemCodeHistory: RedeemHistoryItem[];
  recentActivity: UserActivityItem[];
};

export type AnalyticsMetricCard = {
  label: string;
  value: number;
  deltaLabel: string;
  href?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export type RedeemCodeFunnelItem = {
  label: string;
  value: number;
};

export type AdminAnalyticsSummary = {
  generatedAt: string;
  dateRangeLabel: string;
  metrics: {
    totalUsers: number;
    activeUsers: number;
    totalChatSessions: number;
    totalWorkspaceActions: number;
    proUsers: number;
    redeemCodesGenerated: number;
    redeemCodesUsed: number;
  };
  metricCards: AnalyticsMetricCard[];
  usageSeries: UsageMetric[];
  redeemCodeFunnel: RedeemCodeFunnelItem[];
  topUsers: AdminUserSummary[];
};

export type ListResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type RedeemCodeListFilters = {
  search?: string;
  status?: RedeemCodeStatus | "all";
  page?: number;
  pageSize?: number;
};

export type UserListFilters = {
  search?: string;
  plan?: SubscriptionPlan | "all";
  page?: number;
  pageSize?: number;
};
