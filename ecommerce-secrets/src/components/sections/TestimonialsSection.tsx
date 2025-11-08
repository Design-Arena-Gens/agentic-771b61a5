'use client';

import { useCourseStore } from '@/store/course-store';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = useCourseStore((state) => state.content.testimonials);

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Alumni Wins</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Commerce stories with Nobel precision
          </h2>
        </div>
        <p className="max-w-lg text-sm text-slate-400">
          Visionary operators across 41 countries have accelerated growth, reduced churn, and built
          audience-first brands guided by Nobel’s frameworks.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.blockquote
            key={testimonial.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-8 shadow-lg shadow-sky-500/10"
          >
            <p className="text-lg font-semibold text-white">“{testimonial.quote}”</p>
            <footer className="mt-6 text-sm text-slate-400">
              <p className="font-medium text-white">{testimonial.name}</p>
              <p>{testimonial.title}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
