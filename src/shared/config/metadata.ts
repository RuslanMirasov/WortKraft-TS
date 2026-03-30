import type { Metadata, Viewport } from 'next';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { APP_CONFIG } from '@/shared/config/app';

type SupportedLocale = (typeof routing.locales)[number];

const OG_LOCALES: Record<SupportedLocale, string> = {
  de: 'de_DE',
  en: 'en_US',
  uk: 'uk_UA',
};

const DEFAULT_LOCALE: SupportedLocale = 'de';

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!url) return 'http://localhost:3000';
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function normalizeLocale(locale: string): SupportedLocale {
  if (hasLocale(routing.locales, locale)) {
    return locale as SupportedLocale;
  }
  return DEFAULT_LOCALE;
}

function normalizePathname(pathname?: string): string {
  if (!pathname || pathname === '/') return '';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function buildLocalizedPath(locale: SupportedLocale, pathname?: string): string {
  const path = normalizePathname(pathname);

  if (!path) return `/${locale}`;
  if (path.startsWith(`/${locale}`)) return path;

  return `/${locale}${path}`;
}

function absoluteUrl(path: string): string {
  return `${getBaseUrl()}${path}`;
}

function buildAlternates(pathname?: string) {
  return routing.locales.reduce(
    (acc, loc) => {
      const typed = loc as SupportedLocale;
      acc[typed] = absoluteUrl(buildLocalizedPath(typed, pathname));
      return acc;
    },
    {} as Record<SupportedLocale, string>
  );
}

export function buildLocaleViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: APP_CONFIG.themeColor },
      { media: '(prefers-color-scheme: dark)', color: APP_CONFIG.themeColor },
    ],
  };
}

export async function buildLocaleMetadata(
  locale: string,
  options?: {
    pathname?: string;
    noIndex?: boolean;
    ogImage?: string;
  }
): Promise<Metadata> {
  const resolvedLocale: SupportedLocale = normalizeLocale(locale);

  const pathname = options?.pathname;
  const noIndex = options?.noIndex ?? false;

  const canonical = absoluteUrl(buildLocalizedPath(resolvedLocale, pathname));
  const alternates = buildAlternates(pathname);

  const ogImage = absoluteUrl(options?.ogImage ?? '/og-image.jpg');

  const title = APP_CONFIG.title[resolvedLocale as keyof typeof APP_CONFIG.title];
  const description = APP_CONFIG.description[resolvedLocale as keyof typeof APP_CONFIG.description];

  return {
    metadataBase: new URL(getBaseUrl()),

    title: {
      default: APP_CONFIG.shortName,
      template: `${APP_CONFIG.shortName} | %s`,
    },

    description,

    applicationName: APP_CONFIG.name,

    alternates: {
      canonical,
      languages: alternates,
    },

    openGraph: {
      type: 'website',
      siteName: APP_CONFIG.name,
      locale: OG_LOCALES[resolvedLocale],
      alternateLocale: routing.locales.filter(l => l !== resolvedLocale).map(l => OG_LOCALES[l as SupportedLocale]),
      url: canonical,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },

    appleWebApp: {
      capable: true,
      title: APP_CONFIG.shortName,
      statusBarStyle: 'default',
    },

    icons: {
      apple: [
        {
          url: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },

    category: 'education',

    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-title': APP_CONFIG.shortName,
      'application-name': APP_CONFIG.name,
      'msapplication-TileColor': APP_CONFIG.themeColor,
      'format-detection': 'telephone=no',
    },
  };
}
