import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Alfa_Slab_One, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alfaSlab = Alfa_Slab_One({
  variable: "--font-alfa",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://balmedie-beach.vercel.app"),
  title: {
    default: "Balmedie Beach — A Guided Coastal Walk",
    template: "%s — Balmedie Beach",
  },
  description:
    "A visitor's guide to Balmedie Beach, Aberdeenshire: walking routes, WW2 history, wildlife, and the geography of the coast.",
  openGraph: {
    title: "Balmedie Beach — A Guided Coastal Walk",
    description:
      "Walking routes, WW2 history, wildlife and 5,000 years of shifting dunes — a guided walk through Balmedie Country Park, Aberdeenshire.",
    type: "website",
    images: [
      {
        url: "/images/hero-home.png",
        width: 1408,
        height: 768,
        alt: "Vintage travel-poster illustration of the boardwalk through the dunes at Balmedie Beach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f4f4f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${alfaSlab.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-full px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-[#1f4f4f] focus:text-[#f6f1e4]"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
