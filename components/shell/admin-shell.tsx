"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Gauge,
  KeyRound,
  Menu,
  Search,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/redeem-codes", label: "Redeem Codes", icon: KeyRound },
  { href: "/users", label: "Users", icon: UsersRound },
  { href: "/analytics", label: "Analytics", icon: BarChart3 }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-stone-200 bg-white/95 px-4 py-5 lg:block">
        <Link href="/" className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 text-sm font-black text-white">
            KA
          </span>
          <span>
            <span className="block text-sm font-black text-stone-950">Kairo AI</span>
            <span className="block text-xs font-semibold text-stone-500">Admin operations</span>
          </span>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-extrabold transition-colors",
                  active
                    ? "bg-teal-50 text-teal-800 ring-1 ring-teal-100"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-teal-200 bg-teal-50 p-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-teal-700">
            <ShieldCheck className="h-4 w-4" />
            Live API mode
          </div>
          <p className="mt-2 text-xs font-medium leading-5 text-teal-950">
            Screens read protected Kairo admin endpoints.
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-200 text-stone-600 lg:hidden"
                type="button"
                aria-label="Open navigation"
              >
                <Menu className="h-4 w-4" />
              </button>
              <Breadcrumbs pathname={pathname} />
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-9 min-w-64 items-center gap-2 rounded-md border border-stone-200 bg-stone-50 px-3 text-sm text-stone-500 md:flex">
                <Search className="h-4 w-4" />
                Search users, codes, campaigns
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-700 text-xs font-black text-white">
                VA
              </div>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-xs font-extrabold",
                    active
                      ? "bg-teal-50 text-teal-800"
                      : "bg-white text-stone-600 ring-1 ring-stone-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const segments = pathname === "/" ? ["Dashboard"] : pathname.split("/").filter(Boolean);
  const labels = segments.map((segment) =>
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );

  return (
    <div className="min-w-0">
      <div className="text-xs font-bold uppercase tracking-[0.08em] text-stone-400">
        Internal Admin
      </div>
      <div className="truncate text-sm font-black text-stone-950">
        {labels.join(" / ")}
      </div>
    </div>
  );
}
