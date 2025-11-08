'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { TopNav } from '@/components/layout/TopNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { motion } from 'framer-motion';

function ThankYouScreen() {
  const params = useSearchParams();
  const name = params.get('name') || 'Visionary Founder';
  const email = params.get('email') || 'your inbox';
  const tier = params.get('tier') || 'Launch Cohort';
  const amount = params.get('amount') || '0';

  useEffect(() => {
    const duration = 2200;
    const animationEnd = Date.now() + duration;
    const colors = ['#38bdf8', '#fbbf24', '#a855f7'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <TopNav />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-4 pb-24 pt-16 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full rounded-3xl border border-white/15 bg-slate-900/60 p-10 backdrop-blur-2xl shadow-2xl shadow-amber-500/20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">
            Welcome aboard
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Thank you, {name}! You’re officially in.
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            We’ve sent your onboarding dossier, cohort calendar, and access instructions to{' '}
            <span className="font-semibold text-white">{email}</span>. Your seat in the{' '}
            <span className="font-semibold text-white">{tier}</span> track is secured.
          </p>

          <div className="mt-8 grid gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-left sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Investment</p>
              <p className="mt-2 text-2xl font-semibold text-white">${Number(amount).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Cohort access</p>
              <p className="mt-2 text-sm text-slate-300">
                Live intensives start next Monday. We recommend onboarding this weekend.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Next steps</p>
              <p className="mt-2 text-sm text-slate-300">
                Join the Founders Circle, book your welcome call, and activate automation templates.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5"
            >
              Return to experience
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Configure admin dashboard
            </Link>
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-white">Loading celebration...</div>}>
      <ThankYouScreen />
    </Suspense>
  );
}
