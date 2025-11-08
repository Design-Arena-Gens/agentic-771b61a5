'use client';

import { motion } from 'framer-motion';

export function ExperienceTrailer() {
  return (
    <section
      id="experience-trailer"
      className="mx-auto mt-24 w-full max-w-5xl rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Inside the program</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            A cinematic walkthrough of the Nobel methodology
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Experience the immersive storytelling and interactive dashboards you’ll deploy. The
            trailer blends 3D motion graphics, conversion psychology, and the step-by-step frameworks
            taught throughout the curriculum.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/50 via-slate-900 to-amber-500/40 p-1 shadow-xl shadow-indigo-500/20 md:max-w-sm"
        >
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950/70">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              <span className="relative z-10">Play Motion Preview</span>
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                ▶
              </span>
              <span className="absolute inset-0 rounded-full bg-amber-400/40 opacity-0 transition group-hover:opacity-100" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
