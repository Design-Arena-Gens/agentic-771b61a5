'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function FinalCta() {
  return (
    <section className="mx-auto mt-24 w-full max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/60 via-slate-900/70 to-sky-500/40 p-10 text-center shadow-2xl shadow-indigo-500/30">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45 }}
        className="text-4xl font-bold text-white"
      >
        Your brand deserves a Nobel-level playbook
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-4 text-sm text-slate-200"
      >
        Join founders redefining commerce with immersive storytelling, predictive data, and
        automation engineered for conversion.
      </motion.p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/purchase"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5"
        >
          Secure Your Seat
        </Link>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
        >
          Configure Experience
        </Link>
      </div>
    </section>
  );
}
