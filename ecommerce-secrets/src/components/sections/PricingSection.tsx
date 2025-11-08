'use client';

import { useCourseStore } from '@/store/course-store';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function PricingSection() {
  const tiers = useCourseStore((state) => state.content.pricing);

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Investment</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Choose your velocity, unlock Nobel-level guidance
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-400">
          All tiers include immersive curriculum, lightning-fast support, and a toolkit of automation
          assets designed to accelerate every step of your commerce journey.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-indigo-950/60 p-8 shadow-xl shadow-indigo-500/10"
          >
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-300/80">
                {tier.bestFor}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-3 text-sm text-slate-300">{tier.description}</p>
              <p className="mt-6 text-4xl font-bold text-white">
                ${tier.price.toLocaleString()}
                <span className="text-base font-medium text-slate-400"> USD</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-amber-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/purchase?tier=${tier.id}`}
              className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500/40"
            >
              Secure Your Seat
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
