'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type HeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

type Module = {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  duration: string;
};

type Testimonial = {
  name: string;
  title: string;
  quote: string;
};

type PricingTier = {
  id: string;
  name: string;
  description: string;
  price: number;
  benefits: string[];
  bestFor: string;
};

type DashboardMetric = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
};

export type CourseContent = {
  hero: HeroContent;
  modules: Module[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  faq: { question: string; answer: string }[];
  metrics: DashboardMetric[];
};

type CourseStore = {
  content: CourseContent;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateModule: (id: string, payload: Partial<Module>) => void;
  addModule: (module: Module) => void;
  removeModule: (id: string) => void;
  updatePricing: (id: string, payload: Partial<PricingTier>) => void;
  addPricing: (tier: PricingTier) => void;
  removePricing: (id: string) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  removeTestimonial: (quote: string) => void;
  addFaq: (item: { question: string; answer: string }) => void;
  removeFaq: (question: string) => void;
  reset: () => void;
};

const defaults: CourseContent = {
  hero: {
    eyebrow: 'Interactive Masterclass',
    title: 'The Secret of E-Commerce',
    highlight: 'Nobel Edition',
    subtitle:
      'A cinematic, data-backed journey that reveals how to launch, automate, and scale profitable digital storefronts.',
    primaryCta: 'Start Your Storefront',
    secondaryCta: 'Watch Program Trailer',
  },
  modules: [
    {
      id: 'm1',
      title: 'Foundation Systems',
      description:
        'Discover market analysis techniques, resilient product sourcing, and compliant infrastructure for global commerce.',
      outcomes: [
        'Validate product-market fit within 72 hours',
        'Deploy bulletproof store architecture',
        'Automate fulfillment and compliance workflows',
      ],
      duration: '2h 15m',
    },
    {
      id: 'm2',
      title: 'Conversion Storytelling',
      description:
        'Blend neuroscience and motion commerce to craft brand narratives that convert browsers into loyal advocates.',
      outcomes: [
        'Architect high-velocity funnel experiences',
        'Deploy 3D product showcases with WebGL',
        'Unlock evergreen email and SMS playbooks',
      ],
      duration: '3h 05m',
    },
    {
      id: 'm3',
      title: 'Scaling with Intelligence',
      description:
        'Activate automation, predictive inventory, and analytics frameworks to scale profitably without burnout.',
      outcomes: [
        'Implement AI-driven demand forecasting',
        'Negotiate supplier partnerships at scale',
        'Build leadership dashboards for daily clarity',
      ],
      duration: '1h 50m',
    },
  ],
  testimonials: [
    {
      name: 'Aria Solace',
      title: 'Founder, Loom Labs',
      quote:
        'The program blends creativity and commerce flawlessly. We recouped tuition in week two and crossed seven figures in Q3.',
    },
    {
      name: 'Malik Chen',
      title: 'CEO, Nova Merch',
      quote:
        'Motion-driven storytelling doubled our conversion rate. The frameworks are immediately executable and deeply human.',
    },
  ],
  pricing: [
    {
      id: 'starter',
      name: 'Launch Cohort',
      description: 'Everything you need to build and launch your first automated store.',
      price: 349,
      benefits: [
        '12 immersive modules + bonus labs',
        'Access to the Founders Circle community',
        'Weekly tactical live calls with Nobel',
        'Launch-ready funnel templates',
      ],
      bestFor: 'New founders and emerging operators',
    },
    {
      id: 'elite',
      name: 'Elite Operator',
      description:
        'Scale with exclusive mentorship, conversion optimization sprints, and private deal flow.',
      price: 1299,
      benefits: [
        'Everything in Launch Cohort',
        'Private mastermind intensives',
        'Quarterly funnel teardown by Nobel',
        'White-label automation workflows',
      ],
      bestFor: 'Scaling founders ready to multiply revenue',
    },
  ],
  faq: [
    {
      question: 'How long do I keep access to the content?',
      answer: 'You receive lifetime updates to all modules, templates, and live call recordings.',
    },
    {
      question: 'Does this work if I do not have a product yet?',
      answer:
        'Yes. The discovery sprint walks you through validating product concepts and sourcing manufacturers step by step.',
    },
    {
      question: 'Will I get personal support?',
      answer:
        'Elite Operator members receive 1:1 strategy clinics and access to Nobel’s private founder circle.',
    },
  ],
  metrics: [
    { label: 'Stores Launched', value: '9,120', change: '+184%', trend: 'up' },
    { label: 'Average GMV Lift', value: '3.1x', change: '+72%', trend: 'up' },
    { label: 'Customer Retention', value: '88%', change: '+19%', trend: 'up' },
  ],
};

export const useCourseStore = create<CourseStore>()(
  devtools(
    persist(
      (set) => ({
        content: defaults,
        updateHero: (hero) =>
          set((state) => ({
            content: { ...state.content, hero: { ...state.content.hero, ...hero } },
          })),
        updateModule: (id, payload) =>
          set((state) => ({
            content: {
              ...state.content,
              modules: state.content.modules.map((module) =>
                module.id === id ? { ...module, ...payload } : module,
              ),
            },
          })),
        addModule: (module) =>
          set((state) => ({
            content: { ...state.content, modules: [...state.content.modules, module] },
          })),
        removeModule: (id) =>
          set((state) => ({
            content: {
              ...state.content,
              modules: state.content.modules.filter((module) => module.id !== id),
            },
          })),
        updatePricing: (id, payload) =>
          set((state) => ({
            content: {
              ...state.content,
              pricing: state.content.pricing.map((tier) =>
                tier.id === id ? { ...tier, ...payload } : tier,
              ),
            },
          })),
        addPricing: (tier) =>
          set((state) => ({
            content: { ...state.content, pricing: [...state.content.pricing, tier] },
          })),
        removePricing: (id) =>
          set((state) => ({
            content: {
              ...state.content,
              pricing: state.content.pricing.filter((tier) => tier.id !== id),
            },
          })),
        addTestimonial: (testimonial) =>
          set((state) => ({
            content: {
              ...state.content,
              testimonials: [...state.content.testimonials, testimonial],
            },
          })),
        removeTestimonial: (quote) =>
          set((state) => ({
            content: {
              ...state.content,
              testimonials: state.content.testimonials.filter(
                (testimonial) => testimonial.quote !== quote,
              ),
            },
          })),
        addFaq: (item) =>
          set((state) => ({
            content: { ...state.content, faq: [...state.content.faq, item] },
          })),
        removeFaq: (question) =>
          set((state) => ({
            content: {
              ...state.content,
              faq: state.content.faq.filter((item) => item.question !== question),
            },
          })),
        reset: () => set({ content: defaults }),
      }),
      {
        name: 'nobel-ecommerce-secret-store',
        version: 1,
      },
    ),
  ),
);
