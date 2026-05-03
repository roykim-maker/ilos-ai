import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://ilos.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ilos.ai — AI Operating Systems for Modern Businesses",
    template: "%s | ilos.ai",
  },
  description:
    "ilos.ai designs and deploys AI operating systems for service businesses — replacing manual workflows with intelligent, always-on infrastructure.",
  keywords: [
    "AI operating system",
    "AI front desk",
    "AI automation for business",
    "dental practice AI",
    "law firm automation",
    "SMB AI infrastructure",
    "workflow automation",
    "voice AI",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ilos.ai",
    title: "ilos.ai — AI Operating Systems for Modern Businesses",
    description:
      "We design and deploy AI systems that run your operations — so you don't have to.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ilos.ai — AI Operating Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ilos.ai — AI Operating Systems for Modern Businesses",
    description:
      "We design and deploy AI systems that run your operations — so you don't have to.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
