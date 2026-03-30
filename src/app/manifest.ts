import type { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/shared/config/app';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_CONFIG.name,
    short_name: APP_CONFIG.shortName,
    description: APP_CONFIG.description.de,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: APP_CONFIG.backgroundColor,
    theme_color: APP_CONFIG.themeColor,

    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x800',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '390x844',
        type: 'image/png',
      },
    ],

    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        //purpose: 'maskable',
      },
    ],
  };
}
