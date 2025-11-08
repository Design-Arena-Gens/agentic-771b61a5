'use client';

import { useCourseStore } from '@/store/course-store';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function FaqSection() {
  const faq = useCourseStore((state) => state.content.faq);
  const [open, setOpen] = useState(faq[0]?.question ?? '');

  return (
    <section className="mx-auto mt-24 w-full max-w-4xl">
      <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Precision answers</h2>
        <p className="mt-4 max-w-2xl text-sm text-slate-400">
          We anticipate the questions commerce leaders ask before they deploy capital. Explore the
          details and reach out if you need a private consult.
        </p>

        <div className="mt-8 space-y-4">
          {faq.map((item) => {
            const isOpen = open === item.question;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50"
              >
                <button
                  onClick={() => setOpen(isOpen ? '' : item.question)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white transition hover:bg-white/5"
                >
                  <span>{item.question}</span>
                  <span className="text-xl text-slate-400">{isOpen ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-sm text-slate-300">{item.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
