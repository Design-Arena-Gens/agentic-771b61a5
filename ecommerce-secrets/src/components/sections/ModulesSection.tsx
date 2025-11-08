'use client';

import { useCourseStore } from '@/store/course-store';
import { motion } from 'framer-motion';

export function ModulesSection() {
  const modules = useCourseStore((state) => state.content.modules);

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Curriculum</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Architect a resilient commerce engine
          </h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">
          Each module is paired with cinematic walkthroughs, live funnel teardowns, and automation
          templates engineered to reduce launch risk.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {modules.map((module, index) => (
          <motion.article
            key={module.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-indigo-950/50 p-6 shadow-xl shadow-indigo-500/10"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-300/80">
                Week {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{module.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{module.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {module.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-xs font-medium text-slate-300">
              <span>Runtime</span>
              <span className="text-white">{module.duration}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
