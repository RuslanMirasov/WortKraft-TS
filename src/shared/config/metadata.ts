import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export const metadataByLocale = {
  de: {
    title: 'WortKraft - Systematischer Wortschatzaufbau im Deutschen (A1-C1)',
    description:
      'Systematisches Lernen und Festigen des deutschen Grundwortschatzes nach dem Programm der Integrationskurse (A1-C1). Jedes Wort durchläuft 6 Trainingsstufen: Verstehen, Hören, Übersetzungsauswahl, Schreiben und Aussprache. Ein starker Wortschatz hilft, Prüfungen in Deutschland sicher zu bestehen.',
  },
  en: {
    title: 'WortKraft - Build Your German Vocabulary (A1-C1)',
    description:
      'Structured learning and reinforcement of core German vocabulary aligned with integration course levels (A1-C1). Each word is trained in 6 stages: comprehension, listening, translation choice, writing and pronunciation. A strong vocabulary helps you confidently pass exams in Germany.',
  },
  uk: {
    title: 'WortKraft - Розширення словникового запасу з німецької (A1-C1)',
    description:
      'Системне вивчення та закріплення базової лексики німецької мови за програмою інтеграційних курсів (A1-C1). Кожне слово проходить 6 етапів практики: розуміння, аудіювання, вибір перекладу, письмо та вимова. Сильний словниковий запас допомагає впевнено складати іспити в Німеччині.',
  },
};

export async function buildLocaleMetadata(locale: string): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) return {};

  const meta = metadataByLocale[locale as keyof typeof metadataByLocale] ?? metadataByLocale.de;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const ogLocales: Record<string, string> = {
    de: 'de_DE',
    en: 'en_US',
    uk: 'uk_UA',
  };

  return {
    metadataBase: new URL(baseUrl),
    manifest: `${baseUrl}/manifest.json`,
    title: meta.title,
    description: meta.description,

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        de: `${baseUrl}/de`,
        en: `${baseUrl}/en`,
        uk: `${baseUrl}/uk`,
      },
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}`,
      siteName: 'WortKraft',
      locale: ogLocales[locale] ?? 'de_DE',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.jpg'],
    },

    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { url: `/logo/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
        { url: `/logo/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: `/logo/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
