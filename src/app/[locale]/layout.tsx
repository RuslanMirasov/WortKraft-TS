import type { Metadata } from "next";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import localFont from "next/font/local";
import "./../styles/globals.scss";
import { Header, Navigation } from "./../components";

const sfProDisplayLight = localFont({
  src: "./../fonts/sf-pro-display-light.woff",
  variable: "--light",
  weight: "600",
  display: "swap",
  preload: true,
});

const sfProDisplayRegular = localFont({
  src: "./../fonts/sf-pro-display-regular.woff",
  variable: "--regular",
  weight: "700",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "WortKraft - Deutsch lernen von A1 bis C1",
  description:
    "WortKraft ist eine App zum Deutschlernen von A1 bis C1 - mit Wortschatz, Dialogen, Übungen und Fortschrittsanzeige. Perfekt für Anfänger und Fortgeschrittene.",
  keywords: [
    "Deutsch lernen",
    "A1 bis C1",
    "Vokabeltrainer",
    "Deutsch App",
    "Wortschatz Deutsch",
    "Deutschkurse",
    "Deutsch für Anfänger",
    "Deutschübungen",
    "Deutsch App kostenlos",
    "Deutsch C1",
  ],
  openGraph: {
    title: "WortKraft - Deutsch lernen von A1 bis C1",
    description:
      "Mit WortKraft lernst du Deutsch effektiv: Wortschatz, Dialoge, Übungen und Lernfortschritt - alles in einer App.",
    url: "https://dein-domain.de",
    siteName: "WortKraft",
    images: [
      {
        url: "https://dein-domain.de/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WortKraft App - Deutsch lernen A1 bis C1",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`body ${sfProDisplayLight.variable} ${sfProDisplayRegular.variable}`}
      >
        <NextIntlClientProvider>
          <Header />
          <Navigation />
          <main className="main">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
