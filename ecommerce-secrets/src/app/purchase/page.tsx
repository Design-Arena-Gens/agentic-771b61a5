'use client';

import { FormEvent, Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TopNav } from '@/components/layout/TopNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { useCourseStore } from '@/store/course-store';
import { motion } from 'framer-motion';

type FormState = {
  fullName: string;
  email: string;
  company: string;
  tier: string;
};

function PurchaseScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tiers = useCourseStore((state) => state.content.pricing);
  const [state, setState] = useState<FormState>({
    fullName: '',
    email: '',
    company: '',
    tier: searchParams.get('tier') ?? tiers[0]?.id ?? '',
  });

  const selectedTier = useMemo(
    () => tiers.find((tier) => tier.id === state.tier) ?? tiers[0],
    [state.tier, tiers],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTier) return;
    const query = new URLSearchParams({
      name: state.fullName,
      email: state.email,
      tier: selectedTier.name,
      amount: selectedTier.price.toString(),
    });
    router.push(`/thank-you?${query.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <TopNav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-24 pt-12 sm:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-sm text-slate-400 hover:text-white">
            ← Back to experience
          </Link>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Complete your Nobel enrollment
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Access the full curriculum, community intelligence, and motion commerce toolkit. Secure
            your seat in the upcoming cohort and receive immediate onboarding instructions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl shadow-xl shadow-indigo-500/20"
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Full name
              </label>
              <input
                required
                value={state.fullName}
                onChange={(event) => setState((prev) => ({ ...prev, fullName: event.target.value }))}
                placeholder="Nobel Carter"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Email
              </label>
              <input
                required
                type="email"
                value={state.email}
                onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="founder@brand.com"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Company (optional)
              </label>
              <input
                value={state.company}
                onChange={(event) => setState((prev) => ({ ...prev, company: event.target.value }))}
                placeholder="Nova Merch"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Select tier
              </label>
              <div className="mt-2 space-y-3">
                {tiers.map((tier) => {
                  const isActive = state.tier === tier.id;
                  return (
                    <motion.button
                      type="button"
                      key={tier.id}
                      onClick={() => setState((prev) => ({ ...prev, tier: tier.id }))}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                        isActive
                          ? 'border-sky-400/60 bg-sky-500/10 text-white shadow-lg shadow-sky-500/25'
                          : 'border-white/15 bg-white/5 text-slate-300 hover:border-sky-400/40 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{tier.name}</span>
                        <span className="text-sm font-semibold text-slate-200">
                          ${tier.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-300">{tier.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5"
            >
              Continue to secure seat
            </button>
          </form>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Selected tier</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{selectedTier?.name}</h2>
              <p className="mt-3 text-sm text-slate-300">{selectedTier?.description}</p>
              <p className="mt-4 text-4xl font-bold text-white">
                ${selectedTier?.price.toLocaleString()}
                <span className="text-base font-medium text-slate-400"> USD</span>
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">You receive</p>
              <ul className="mt-3 space-y-3 text-sm text-slate-300">
                {selectedTier?.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-amber-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              <p className="font-semibold text-white">Secure checkout</p>
              <p className="mt-2">
                Your enrollment is protected by a 14-day risk reversal. You’ll receive a welcome
                email with onboarding assets immediately.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-white">Loading checkout...</div>}>
      <PurchaseScreen />
    </Suspense>
  );
}
