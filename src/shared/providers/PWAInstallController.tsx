'use client';

import { useEffect, useRef } from 'react';
import { usePWAInstallStore } from '@/stores/pwa-install-store';
import { usePopup } from '@/stores/popup-store';

const IOS_SHOW_INTERVAL = 1000 * 5; // раз в 5 секунд
const IOS_TICK = 1000; // проверка каждую 1 секунду

const DEFAULT_SHOW_INTERVAL = 1000 * 5; // раз в 10 секунд
const DEFAULT_TICK = 1000; // проверка каждую 1 секунду

const PWAInstallController = () => {
  const openPopup = usePopup(state => state.openPopup);

  const isStandalone = usePWAInstallStore(state => state.isStandalone);
  const isIOS = usePWAInstallStore(state => state.isIOS);
  const deferredPrompt = usePWAInstallStore(state => state.deferredPrompt);
  const isPopupBlocked = usePWAInstallStore(state => state.isPopupBlocked);
  const lastShownAt = usePWAInstallStore(state => state.lastShownAt);
  const markPopupShown = usePWAInstallStore(state => state.markPopupShown);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canShowOnIOS = isIOS && !isStandalone && !isPopupBlocked;
    const canShowOnDefault = !isIOS && !isStandalone && !isPopupBlocked && Boolean(deferredPrompt);

    const canRun = canShowOnIOS || canShowOnDefault;

    if (!canRun) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const tick = isIOS ? IOS_TICK : DEFAULT_TICK;
    const showInterval = isIOS ? IOS_SHOW_INTERVAL : DEFAULT_SHOW_INTERVAL;

    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const now = Date.now();

      if (lastShownAt && now - lastShownAt < showInterval) return;

      openPopup('download', { freeze: true });
      markPopupShown();
    }, tick);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [deferredPrompt, isIOS, isPopupBlocked, isStandalone, lastShownAt, markPopupShown, openPopup]);

  return null;
};

export default PWAInstallController;

// 'use client';

// import { useEffect, useRef } from 'react';
// import { usePWAInstallStore } from '@/stores/pwa-install-store';
// import { usePopup } from '@/stores/popup-store';

// const SHOW_INTERVAL = 1000 * 10 * 1; // раз в 10 секунд
// const TICK = 1000; // проверка каждые 1 секунду

// const PWAInstallController = () => {
//   const { openPopup } = usePopup();

//   const { isStandalone, isIOS, deferredPrompt, isBlocked, lastShownAt, setLastShownAt } = usePWAInstallStore();

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     if (isStandalone || isBlocked || (!deferredPrompt && !isIOS)) {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//       return;
//     }

//     if (intervalRef.current) return;

//     intervalRef.current = setInterval(() => {
//       const now = Date.now();

//       if (lastShownAt && now - lastShownAt < SHOW_INTERVAL) return;

//       openPopup('download', { freeze: true });
//       setLastShownAt(now);
//     }, TICK);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, [isStandalone, isBlocked, deferredPrompt, isIOS, lastShownAt, openPopup, setLastShownAt]);

//   return null;
// };

// export default PWAInstallController;
