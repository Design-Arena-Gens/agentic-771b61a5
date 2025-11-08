'use client';

import { useCourseStore } from '@/store/course-store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeroCanvas } from './HeroCanvas';

export function HeroSection() {
  const hero = useCourseStore((state) => state.content.hero);

  return (
    <section className="relative mx-auto mt-12 flex w-full max-w-6xl flex-col gap-12 rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-2xl md:flex-row md:p-12">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-slate-900/40 to-amber-500/10 blur-3xl" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-6">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.5em] text-slate-300"
        >
          {hero.eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-white md:text-6xl"
        >
          {hero.title}{' '}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
            {hero.highlight}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="max-w-xl text-base text-slate-300"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/purchase"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-400 via-amber-500 to-pink-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-[0_18px_40px_rgba(251,191,36,0.35)]"
          >
            <span className="relative z-10">{hero.primaryCta}</span>
            <span className="absolute inset-0 rounded-full bg-white/30 opacity-0 transition group-hover:opacity-40" />
          </Link>
          <Link
            href="#experience-trailer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
          >
            {hero.secondaryCta}
          </Link>
        </motion.div>
      </div>
      <div className="flex-1">
        <HeroCanvas />
      </div>
    </section>
  );
}
