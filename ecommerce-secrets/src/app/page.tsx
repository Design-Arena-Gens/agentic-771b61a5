'use client';

import { TopNav } from '@/components/layout/TopNav';
import { HeroSection } from '@/components/hero/HeroSection';
import { MetricsSection } from '@/components/sections/MetricsSection';
import { ModulesSection } from '@/components/sections/ModulesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ExperienceTrailer } from '@/components/sections/ExperienceTrailer';
import { PricingSection } from '@/components/sections/PricingSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <TopNav />
      <main className="flex flex-1 flex-col items-center px-4 pb-24 pt-10 sm:px-6">
        <HeroSection />
        <MetricsSection />
        <ModulesSection />
        <TestimonialsSection />
        <ExperienceTrailer />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
