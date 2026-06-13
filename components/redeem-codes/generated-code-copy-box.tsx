"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function GeneratedCodeCopyBox({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
      <div className="text-xs font-black uppercase tracking-[0.08em] text-amber-700">
        Plaintext shown once
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ring-1 ring-amber-100">
        <code className="break-all font-mono text-sm font-black text-stone-950">
          {code}
        </code>
        <button
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-stone-600 hover:bg-stone-100"
          onClick={copyCode}
          type="button"
          aria-label="Copy generated code"
        >
          {copied ? <Check className="h-4 w-4 text-teal-700" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
