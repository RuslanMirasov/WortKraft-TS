import type { Metadata, Viewport } from 'next';
import { APP_CONFIG } from '@/shared/config/app';

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!url) return 'http://localhost:3000';
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function normalizePathname(pathname?: string): string {
  if (!pathname || pathname === '/') return '';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function absoluteUrl(path: string): string {
  return `${getBaseUrl()}${path}`;
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
  _locale: string = 'de',
  options?: {
    pathname?: string;
    noIndex?: boolean;
    ogImage?: string;
  }
): Promise<Metadata> {
  const noIndex = options?.noIndex ?? false;
  const canonical = absoluteUrl(normalizePathname(options?.pathname));
  const ogImage = absoluteUrl(options?.ogImage ?? '/og-image.jpg');

  const title = APP_CONFIG.title.de;
  const description = APP_CONFIG.description.de;

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
    },

    openGraph: {
      type: 'website',
      siteName: APP_CONFIG.name,
      locale: 'de_DE',
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
          url: '/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false, noimageindex: true },
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
