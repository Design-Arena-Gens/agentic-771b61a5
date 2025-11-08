'use client';

import { useCourseStore } from '@/store/course-store';
import { motion } from 'framer-motion';

export function MetricsSection() {
  const metrics = useCourseStore((state) => state.content.metrics);

  return (
    <section className="relative mx-auto mt-16 w-full max-w-6xl">
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl md:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-indigo-500/10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
            <p className="mt-4 text-4xl font-semibold text-white">{metric.value}</p>
            <p
              className={`mt-2 text-sm font-semibold ${
                metric.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {metric.change}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              {metric.trend === 'up'
                ? 'Momentum streak sustained by alumni brands.'
                : 'Short-term recalibration underway.'}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
