import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { profile } from "@/content/profile";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { FloatingQuickAction } from "@/components/ui/FloatingQuickAction";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dita-devops.zabisa.my.id";
const isIndexable = process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dita Setya Kurniawan | DevOps & Platform Engineer",
    template: "%s | Dita Setya Kurniawan",
  },
  description:
    "Portofolio DevOps Dita Setya Kurniawan: pengelolaan CI/CD Bamboo, Helm, OpenShift, dan DevSecOps untuk 200+ microservices di BRI serta rancang bangun platform Kubernetes Multi-VM dari 0.",
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: "Dita Setya Kurniawan | DevOps & Platform Engineer",
    description:
      "Pengelolaan CI/CD Bamboo, Helm, OpenShift, dan DevSecOps untuk 200+ microservices di BRI serta rancang bangun platform Kubernetes Multi-VM dari 0.",
    url: siteUrl,
    siteName: "Dita Setya Kurniawan Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dita Setya Kurniawan | DevOps & Platform Engineer",
    description:
      "Pengelolaan CI/CD Bamboo, Helm, OpenShift, dan DevSecOps untuk 200+ microservices di BRI serta rancang bangun platform Kubernetes Multi-VM dari 0.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  sameAs: [profile.githubUrl, profile.linkedinUrl],
  worksFor: {
    "@type": "Organization",
    name: "Bank Rakyat Indonesia (BRI)",
  },
  description: profile.currentWork,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ScrollProgressBar />
        {children}
        <FloatingQuickAction />
        <CommandMenu />
      </body>
    </html>
  );
}
