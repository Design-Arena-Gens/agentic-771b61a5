'use client';

import { ChangeEvent, useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { useCourseStore } from '@/store/course-store';
import { motion } from 'framer-motion';

type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function AdminPage() {
  const {
    content,
    updateHero,
    updateModule,
    addModule,
    removeModule,
    updatePricing,
    addPricing,
    removePricing,
    addTestimonial,
    removeTestimonial,
    addFaq,
    removeFaq,
    reset,
  } = useCourseStore();

  const [testimonialDraft, setTestimonialDraft] = useState({ name: '', title: '', quote: '' });
  const [faqDraft, setFaqDraft] = useState({ question: '', answer: '' });
  const handleHeroChange = (event: InputEvent) => {
    const { name, value } = event.target;
    updateHero({ [name]: value });
  };

  const handleModuleChange = (id: string, event: InputEvent) => {
    const { name, value } = event.target;
    updateModule(id, {
      [name]: name === 'outcomes' ? value.split('\n').filter(Boolean) : value,
    });
  };

  const handlePricingChange = (id: string, event: InputEvent) => {
    const { name, value } = event.target;
    updatePricing(id, {
      [name]:
        name === 'price'
          ? Number(value || 0)
          : name === 'benefits'
            ? value.split('\n').filter(Boolean)
            : value,
    });
  };

  const heroFields: { label: string; name: keyof typeof content.hero; placeholder: string }[] = [
    { label: 'Eyebrow', name: 'eyebrow', placeholder: 'Interactive Masterclass' },
    { label: 'Title', name: 'title', placeholder: 'The Secret of E-Commerce' },
    { label: 'Highlight', name: 'highlight', placeholder: 'Nobel Edition' },
    {
      label: 'Subtitle',
      name: 'subtitle',
      placeholder: 'A cinematic journey into profitable storefronts.',
    },
    { label: 'Primary CTA', name: 'primaryCta', placeholder: 'Start Your Storefront' },
    { label: 'Secondary CTA', name: 'secondaryCta', placeholder: 'Watch Program Trailer' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <TopNav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 pb-24 pt-12 sm:px-6">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Admin control center — Secret of E-Commerce Nobel
          </h1>
          <p className="max-w-3xl text-sm text-slate-400">
            Fine-tune messaging, curriculum, pricing, and conversion assets. These updates sync
            instantly across the public experience and persist locally so you can iterate without a
            backend.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            className="w-full max-w-xs rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Reset to default experience
          </motion.button>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Hero narrative</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {heroFields.map((field) => (
              <div key={field.name}>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  value={content.hero[field.name]}
                  onChange={handleHeroChange}
                  placeholder={field.placeholder}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Modules</h2>
              <p className="text-sm text-slate-400">
                Edit module narratives, expected outcomes, and runtime.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                addModule({
                  id: crypto.randomUUID(),
                  title: 'Untitled Module',
                  description: 'Describe the founder transformation this module unlocks.',
                  outcomes: ['Key outcome one', 'Key outcome two'],
                  duration: '1h 30m',
                })
              }
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Add module
            </motion.button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.modules.map((module) => (
              <div
                key={module.id}
                className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeModule(module.id)}
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300 hover:text-rose-200"
                  >
                    Remove
                  </motion.button>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Title
                  </label>
                  <input
                    name="title"
                    value={module.title}
                    onChange={(event) => handleModuleChange(module.id, event)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={module.description}
                    onChange={(event) => handleModuleChange(module.id, event)}
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Outcomes (one per line)
                  </label>
                  <textarea
                    name="outcomes"
                    value={module.outcomes.join('\n')}
                    onChange={(event) => handleModuleChange(module.id, event)}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Duration
                  </label>
                  <input
                    name="duration"
                    value={module.duration}
                    onChange={(event) => handleModuleChange(module.id, event)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Pricing tiers</h2>
              <p className="text-sm text-slate-400">Define value ladders and conversion hooks.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                addPricing({
                  id: crypto.randomUUID(),
                  name: 'New Tier',
                  description:
                    'Describe who this tier is for and the transformation they achieve.',
                  price: 499,
                  bestFor: 'Visionary operators',
                  benefits: ['Benefit one', 'Benefit two', 'Benefit three'],
                })
              }
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Add pricing tier
            </motion.button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.pricing.map((tier) => (
              <div
                key={tier.id}
                className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removePricing(tier.id)}
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300 hover:text-rose-200"
                  >
                    Remove
                  </motion.button>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Name
                    </label>
                    <input
                      name="name"
                      value={tier.name}
                      onChange={(event) => handlePricingChange(tier.id, event)}
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={tier.description}
                      onChange={(event) => handlePricingChange(tier.id, event)}
                      rows={3}
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        Price
                      </label>
                      <input
                        name="price"
                        type="number"
                        value={tier.price}
                        onChange={(event) => handlePricingChange(tier.id, event)}
                        className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        Best for
                      </label>
                      <input
                        name="bestFor"
                        value={tier.bestFor}
                        onChange={(event) => handlePricingChange(tier.id, event)}
                        className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Benefits (one per line)
                    </label>
                    <textarea
                      name="benefits"
                      value={tier.benefits.join('\n')}
                      onChange={(event) => handlePricingChange(tier.id, event)}
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Testimonials</h2>
              <p className="text-sm text-slate-400">
                Showcase proof points from alumni founders and operators.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!testimonialDraft.name || !testimonialDraft.quote) return;
                addTestimonial(testimonialDraft);
                setTestimonialDraft({ name: '', title: '', quote: '' });
              }}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Add testimonial
            </motion.button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.testimonials.map((testimonial) => (
              <div
                key={testimonial.quote}
                className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">{testimonial.title}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeTestimonial(testimonial.quote)}
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300 hover:text-rose-200"
                  >
                    Remove
                  </motion.button>
                </div>
                <p className="text-sm text-slate-300">“{testimonial.quote}”</p>
              </div>
            ))}
            <div className="space-y-4 rounded-3xl border border-dashed border-white/20 bg-slate-900/30 p-6">
              <h3 className="text-lg font-semibold text-white">New testimonial</h3>
              <input
                value={testimonialDraft.name}
                onChange={(event) =>
                  setTestimonialDraft((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Founder name"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
              <input
                value={testimonialDraft.title}
                onChange={(event) =>
                  setTestimonialDraft((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="Founder title"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
              <textarea
                value={testimonialDraft.quote}
                onChange={(event) =>
                  setTestimonialDraft((prev) => ({ ...prev, quote: event.target.value }))
                }
                placeholder="Impact statement"
                rows={4}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Frequently asked</h2>
              <p className="text-sm text-slate-400">Address objections with precise clarity.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!faqDraft.question || !faqDraft.answer) return;
                addFaq(faqDraft);
                setFaqDraft({ question: '', answer: '' });
              }}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Add FAQ
            </motion.button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.faq.map((item) => (
              <div
                key={item.question}
                className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">{item.question}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFaq(item.question)}
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300 hover:text-rose-200"
                  >
                    Remove
                  </motion.button>
                </div>
                <p className="text-sm text-slate-300">{item.answer}</p>
              </div>
            ))}
            <div className="space-y-4 rounded-3xl border border-dashed border-white/20 bg-slate-900/30 p-6">
              <h3 className="text-lg font-semibold text-white">New FAQ</h3>
              <input
                value={faqDraft.question}
                onChange={(event) =>
                  setFaqDraft((prev) => ({ ...prev, question: event.target.value }))
                }
                placeholder="What question do founders ask?"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
              <textarea
                value={faqDraft.answer}
                onChange={(event) =>
                  setFaqDraft((prev) => ({ ...prev, answer: event.target.value }))
                }
                placeholder="Deliver a decisive answer."
                rows={4}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
