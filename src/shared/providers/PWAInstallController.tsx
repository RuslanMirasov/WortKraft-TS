'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { usePWAInstallStore } from '@/stores/pwa-install-store';
import { usePopup } from '@/stores/popup-store';
import { isPublicRoute } from '@/shared/config/routes';

const IOS_SHOW_INTERVAL = 1000 * 60 * 60 * 24 * 3;
const DEFAULT_SHOW_INTERVAL = 1000 * 60 * 60 * 24;

const PWAInstallController = () => {
  const pathname = usePathname();
  const openPopup = usePopup(state => state.openPopup);

  const isStandalone = usePWAInstallStore(state => state.isStandalone);
  const isIOS = usePWAInstallStore(state => state.isIOS);
  const isInstalledOnDevice = usePWAInstallStore(state => state.isInstalledOnDevice);
  const deferredPrompt = usePWAInstallStore(state => state.deferredPrompt);
  const isPopupBlocked = usePWAInstallStore(state => state.isPopupBlocked);
  const lastShownAt = usePWAInstallStore(state => state.lastShownAt);
  const markPopupShown = usePWAInstallStore(state => state.markPopupShown);

  useEffect(() => {
    if (!isPublicRoute(pathname)) return;
    if (isPopupBlocked) return;
    if (isStandalone) return;

    const canShowOnIOS = isIOS;
    const canShowOnDefault = !isIOS && !isInstalledOnDevice && Boolean(deferredPrompt);
    const canShow = canShowOnIOS || canShowOnDefault;

    if (!canShow) return;

    const now = Date.now();
    const showInterval = isIOS ? IOS_SHOW_INTERVAL : DEFAULT_SHOW_INTERVAL;

    if (lastShownAt && now - lastShownAt < showInterval) return;

    openPopup('download', { freeze: true });
    markPopupShown();
  }, [
    deferredPrompt,
    isIOS,
    isInstalledOnDevice,
    isPopupBlocked,
    isStandalone,
    lastShownAt,
    markPopupShown,
    openPopup,
    pathname,
  ]);

  return null;
};

export default PWAInstallController;

// 'use client';

// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { usePWAInstallStore } from '@/stores/pwa-install-store';
// import { usePopup } from '@/stores/popup-store';

// const PUBLIC_ROUTES = ['/login', '/levels', '/terms', '/policy', '/search', '/404', '/500'];

// const IOS_SHOW_INTERVAL = 1000 * 60 * 60 * 24 * 3;
// const DEFAULT_SHOW_INTERVAL = 1000 * 60 * 60 * 24;

// const PWAInstallController = () => {
//   const pathname = usePathname();
//   const openPopup = usePopup(state => state.openPopup);

//   const isStandalone = usePWAInstallStore(state => state.isStandalone);
//   const isIOS = usePWAInstallStore(state => state.isIOS);
//   const isInstalledOnDevice = usePWAInstallStore(state => state.isInstalledOnDevice);
//   const deferredPrompt = usePWAInstallStore(state => state.deferredPrompt);
//   const isPopupBlocked = usePWAInstallStore(state => state.isPopupBlocked);
//   const lastShownAt = usePWAInstallStore(state => state.lastShownAt);
//   const markPopupShown = usePWAInstallStore(state => state.markPopupShown);

//   useEffect(() => {
//     const normalizedPath = pathname.replace(/^\/(de|en|uk)(?=\/|$)/, '') || '/';
//     const isPublicRoute = PUBLIC_ROUTES.some(route => normalizedPath.startsWith(route));

//     if (!isPublicRoute) return;
//     if (isPopupBlocked) return;
//     if (isStandalone) return;

//     const canShowOnIOS = isIOS;
//     const canShowOnDefault = !isIOS && !isInstalledOnDevice && Boolean(deferredPrompt);

//     const canShow = canShowOnIOS || canShowOnDefault;

//     if (!canShow) return;

//     const now = Date.now();
//     const showInterval = isIOS ? IOS_SHOW_INTERVAL : DEFAULT_SHOW_INTERVAL;

//     if (lastShownAt && now - lastShownAt < showInterval) return;

//     openPopup('download', { freeze: true });
//     markPopupShown();
//   }, [
//     deferredPrompt,
//     isIOS,
//     isInstalledOnDevice,
//     isPopupBlocked,
//     isStandalone,
//     lastShownAt,
//     markPopupShown,
//     openPopup,
//     pathname,
//   ]);

//   return null;
// };

// export default PWAInstallController;
