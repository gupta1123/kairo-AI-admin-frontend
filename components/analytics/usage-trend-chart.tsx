"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { UsageMetric } from "@/lib/types";

export function UsageTrendChart({ data }: { data: UsageMetric[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="h-80 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-black text-stone-950">Usage trend</h2>
        <p className="mt-1 text-sm font-medium text-stone-500">
          Active users, chat sessions, and workspace actions over time.
        </p>
      </div>
      <div className="h-[238px] min-w-0">
        {mounted ? (
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={data} margin={{ left: -16, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} />
              <YAxis tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} width={44} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#d6d3d1",
                  boxShadow: "0 12px 28px rgba(28, 25, 23, 0.12)"
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="activeUsers" name="Active users" stroke="#0f766e" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="chatSessions" name="Chat sessions" stroke="#4f46e5" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="workspaceActions" name="Workspace actions" stroke="#d97706" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-md bg-stone-50" />
        )}
      </div>
    </div>
  );
}
