import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secret of E-Commerce Nobel",
  description:
    "Learn the complete blueprint to launch and scale an e-commerce empire with immersive visuals, masterclass curriculum, and dynamic coaching.",
  metadataBase: new URL("https://agentic-771b61a5.vercel.app"),
  openGraph: {
    title: "Secret of E-Commerce Nobel",
    description:
      "Discover the playbook, systems, and automation to dominate e-commerce in 2024.",
    url: "https://agentic-771b61a5.vercel.app",
    siteName: "Secret of E-Commerce Nobel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secret of E-Commerce Nobel",
    description:
      "Build, launch, and scale your e-commerce brand with cinematic storytelling and a hands-on curriculum.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
