"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarDays, KeyRound, Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRedeemCodeGrantLabel, redeemCodePlans } from "@/lib/redeem-code-plans";
import type { GeneratedRedeemCode, RedeemCodePlanId } from "@/lib/types";
import { GeneratedCodeCopyBox } from "./generated-code-copy-box";

export function RedeemCodeCreateDialog() {
  const [open, setOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<GeneratedRedeemCode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshAfterClose, setRefreshAfterClose] = useState(false);
  const [selectedPlanId, setSelectedPlanId] =
    useState<RedeemCodePlanId>("pro_monthly");
  const router = useRouter();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setGeneratedCode(null);
      setError(null);
      setRefreshAfterClose(false);

      if (refreshAfterClose) {
        router.refresh();
      }
    }
  }

  async function generateCode() {
    if (isGenerating) {
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/admin/redeem-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          planId: selectedPlanId
        })
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.error || "Could not create redeem code.");
        return;
      }

      if (!result?.plaintextCode) {
        setError("The API created a code but did not return the plaintext value.");
        return;
      }

      setGeneratedCode(result);
      setRefreshAfterClose(true);
    } catch {
      setError("Could not create redeem code. Check the API connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Trigger asChild>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-black text-white shadow-sm transition hover:bg-teal-800"
          type="button"
        >
          <Plus className="h-4 w-4" />
          Create code
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-stone-950/35 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-stone-200 bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-black text-stone-950">
                Create redeem code
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm font-medium leading-6 text-stone-600">
                Generate a one-time Pro code for monthly or yearly access.
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-stone-950">
                    Select grant type
                  </div>
                  <div className="text-sm font-medium text-stone-500">
                    One use globally, shown in plaintext once.
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {(Object.keys(redeemCodePlans) as RedeemCodePlanId[]).map((planId) => {
                  const plan = redeemCodePlans[planId];
                  const selected = selectedPlanId === planId;

                  return (
                    <button
                      key={planId}
                      className={`rounded-md border px-3 py-3 text-left transition ${
                        selected
                          ? "border-teal-700 bg-white ring-2 ring-teal-100"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                      onClick={() => setSelectedPlanId(planId)}
                      type="button"
                    >
                      <span className="flex items-center gap-2 text-sm font-black text-stone-950">
                        <CalendarDays
                          className={`h-4 w-4 ${
                            selected ? "text-teal-700" : "text-stone-400"
                          }`}
                        />
                        {plan.label}
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-stone-500">
                        {plan.durationDays} days Pro access
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {generatedCode ? <GeneratedCodeCopyBox code={generatedCode.plaintextCode} /> : null}
            {generatedCode ? (
              <div className="rounded-md border border-teal-100 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-900">
                Generated{" "}
                {getRedeemCodeGrantLabel({
                  durationDays: generatedCode.record.durationDays,
                  planGrant: generatedCode.record.planGrant
                })}
              </div>
            ) : null}
            {error ? (
              <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-800">
                {error}
              </div>
            ) : null}

            <div className="flex justify-end gap-2">
              <Dialog.Close className="h-10 rounded-md border border-stone-200 bg-white px-4 text-sm font-black text-stone-700">
                Close
              </Dialog.Close>
              <button
                className="inline-flex h-10 items-center gap-2 rounded-md bg-stone-950 px-4 text-sm font-black text-white disabled:opacity-60"
                disabled={isGenerating}
                onClick={generateCode}
                type="button"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                {generatedCode ? "Generate another" : "Generate code"}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
