import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://marabunta-labs.vercel.app"),
  title: "Marabunta Labs | 12 Projects. 12 Months",
  description: "Chaos, code, and constant construction. Join the challenge to launch a tech product every 30 days.",
  twitter: {
    card: "summary_large_image",
    site: "@marabunta_labs",
    creator: "@parodin",
    title: "Marabunta Labs: The Challenge 2026",
    description: "12 Projects. 12 Months. No looking back.",
  },
  openGraph: {
    type: "website",
    url: "https://marabunta-labs.vercel.app",
    title: "Marabunta Labs",
    description: "Chaos, code, and constant construction. Join the challenge to launch a tech product every 30 days.",
    siteName: "Marabunta Labs",
  },
  verification: {
    google: '9E9qC957fjoZRJkZ-oF2MVGW07hf21zbklJXKRMtToY',
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
        <Analytics />
        <div className="bg-noise"></div>
      </body>
    </html>
  );
}
