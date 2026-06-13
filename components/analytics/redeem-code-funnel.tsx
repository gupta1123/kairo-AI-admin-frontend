"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { RedeemCodeFunnelItem } from "@/lib/types";

export function RedeemCodeFunnel({ data }: { data: RedeemCodeFunnelItem[] }) {
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
        <h2 className="text-base font-black text-stone-950">Redeem code funnel</h2>
        <p className="mt-1 text-sm font-medium text-stone-500">
          Generated, active, used, and expired code states.
        </p>
      </div>
      <div className="h-[238px] min-w-0">
        {mounted ? (
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={data} margin={{ left: -16, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} />
              <YAxis tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} width={44} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#d6d3d1",
                  boxShadow: "0 12px 28px rgba(28, 25, 23, 0.12)"
                }}
              />
              <Bar dataKey="value" fill="#0f766e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-md bg-stone-50" />
        )}
      </div>
    </div>
  );
}
