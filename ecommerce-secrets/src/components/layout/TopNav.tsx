'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Experience' },
  { href: '/purchase', label: 'Enroll' },
  { href: '/admin', label: 'Admin' },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-amber-500">
            <motion.span
              className="absolute inset-1 rounded-lg bg-slate-900/60"
              whileHover={{ scale: 0.94 }}
              transition={{ duration: 0.2 }}
            />
            <span className="relative text-lg font-semibold text-white">SN</span>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
              SECRET
            </span>
            <span className="text-lg font-bold text-white">E-Commerce Nobel</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/purchase"
          className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:border-indigo-400/60 hover:bg-indigo-500/30"
        >
          <span className="relative z-10">Join the Cohort</span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/40 via-sky-500/40 to-amber-400/40 opacity-0 transition group-hover:opacity-100" />
        </Link>
      </div>
    </header>
  );
}
