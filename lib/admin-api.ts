import {
  AdminAnalyticsSummary,
  AdminUserDetail,
  AdminUserSummary,
  GeneratedRedeemCode,
  ListResponse,
  RedeemCodeDetail,
  RedeemCodeListFilters,
  RedeemCodeSummary,
  UserListFilters
} from "./types";
import { getAdminAccessToken } from "./admin-session";

const DEFAULT_PAGE_SIZE = 20;

type AdminMe = {
  email: string | null;
  name: string | null;
  permissions: Record<string, unknown>;
  role: string;
  userId: string;
};

export async function getAdminMe(): Promise<AdminMe> {
  const data = await adminApiFetch<{ adminUser: AdminMe }>("/api/admin/me");
  return data.adminUser;
}

export async function getAnalyticsSummary(): Promise<AdminAnalyticsSummary> {
  return adminApiFetch<AdminAnalyticsSummary>("/api/admin/analytics");
}

export async function getDashboardData() {
  const [summary, codeList, userList] = await Promise.all([
    getAnalyticsSummary(),
    getRedeemCodes({ pageSize: 5 }),
    getUsers({ pageSize: 5 })
  ]);

  return {
    summary,
    recentCodes: codeList.items,
    recentUsers: userList.items
  };
}

export async function getRedeemCodes(
  filters: RedeemCodeListFilters = {}
): Promise<ListResponse<RedeemCodeSummary>> {
  const params = buildSearchParams({
    page: filters.page || 1,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
    search: filters.search,
    status: filters.status && filters.status !== "all" ? filters.status : undefined
  });

  return adminApiFetch<ListResponse<RedeemCodeSummary>>(
    `/api/admin/redeem-codes?${params}`
  );
}

export async function getRedeemCodeDetail(
  id: string
): Promise<RedeemCodeDetail | null> {
  try {
    return await adminApiFetch<RedeemCodeDetail>(
      `/api/admin/redeem-codes/${encodeURIComponent(id)}`
    );
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    throw error;
  }
}

export async function createRedeemCode(): Promise<GeneratedRedeemCode> {
  const data = await adminApiFetch<{
    code: string;
    redeemCode: RedeemCodeSummary;
  }>("/api/admin/redeem-codes", {
    body: JSON.stringify({
      durationDays: 30,
      planId: "pro_monthly"
    }),
    method: "POST"
  });

  return {
    plaintextCode: data.code,
    record: data.redeemCode
  };
}

export async function getUsers(
  filters: UserListFilters = {}
): Promise<ListResponse<AdminUserSummary>> {
  const params = buildSearchParams({
    page: filters.page || 1,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
    plan: filters.plan && filters.plan !== "all" ? filters.plan : undefined,
    search: filters.search
  });

  return adminApiFetch<ListResponse<AdminUserSummary>>(
    `/api/admin/users?${params}`
  );
}

export async function getUserDetail(id: string): Promise<AdminUserDetail | null> {
  try {
    return await adminApiFetch<AdminUserDetail>(
      `/api/admin/users/${encodeURIComponent(id)}`
    );
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    throw error;
  }
}

async function adminApiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const baseUrl = getAdminApiBaseUrl();
  const token = (await getAdminAccessToken()) || getAdminApiBearerToken();
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers
    }
  });

  const bodyText = await response.text();
  const data = bodyText ? JSON.parse(bodyText) : null;

  if (!response.ok) {
    const error = new Error(data?.error || "Admin API request failed.");
    (error as Error & { statusCode?: number }).statusCode = response.status;
    throw error;
  }

  return data as T;
}

export function getAdminApiBaseUrl() {
  const value =
    process.env.ADMIN_API_URL ||
    process.env.NEXT_PUBLIC_ADMIN_API_URL ||
    "http://localhost:3333";

  return value.replace(/\/+$/, "");
}

function getAdminApiBearerToken() {
  return (
    process.env.ADMIN_API_BEARER_TOKEN ||
    process.env.SUPABASE_ADMIN_ACCESS_TOKEN ||
    ""
  ).trim();
}

function buildSearchParams(values: Record<string, unknown>) {
  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    params.set(key, String(value));
  });

  return params.toString();
}

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    (error as { statusCode?: number }).statusCode === 404
  );
}
