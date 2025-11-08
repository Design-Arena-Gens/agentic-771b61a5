'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            The Secret of E-Commerce Nobel
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {year} © Immersive commerce education crafted for founders who create the future.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <Link href="/purchase" className="hover:text-white">
            Enroll
          </Link>
          <Link href="/thank-you" className="hover:text-white">
            Thank You
          </Link>
          <motion.a
            href="mailto:studio@nobelcommerce.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium text-white hover:-translate-y-0.5 hover:bg-white/10"
          >
            Contact
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
