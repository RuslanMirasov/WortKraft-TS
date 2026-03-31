'use client';

import { useEffect } from 'react';
import { usePWAInstallStore, type BeforeInstallPromptEvent } from '@/stores/pwa-install-store';

const getIsStandalone = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
};

const getIsIOS = () => {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
};

const PWAInstallProvider = () => {
  const setEnvironment = usePWAInstallStore(state => state.setEnvironment);
  const setDeferredPrompt = usePWAInstallStore(state => state.setDeferredPrompt);
  const markInstalled = usePWAInstallStore(state => state.markInstalled);

  useEffect(() => {
    setEnvironment({
      isStandalone: getIsStandalone(),
      isIOS: getIsIOS(),
    });

    const handleBeforeInstallPrompt = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;

      installEvent.preventDefault();
      setDeferredPrompt(installEvent);
    };

    const handleAppInstalled = () => {
      markInstalled();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [markInstalled, setDeferredPrompt, setEnvironment]);

  return null;
};

export default PWAInstallProvider;

// 'use client';

// import { useEffect } from 'react';
// import { usePWAInstallStore } from '@/stores/pwa-install-store';

// type BeforeInstallPromptEvent = Event & {
//   prompt: () => Promise<void>;
//   userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
// };

// const PWAInstallProvider = () => {
//   const setDeferredPrompt = usePWAInstallStore(state => state.setDeferredPrompt);
//   const setStandalone = usePWAInstallStore(state => state.setStandalone);
//   const setIOS = usePWAInstallStore(state => state.setIOS);
//   const setState = usePWAInstallStore(state => state.setState);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const standalone =
//       window.matchMedia('(display-mode: standalone)').matches ||
//       (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

//     const ios = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

//     setStandalone(standalone);
//     setIOS(ios);

//     if (standalone) {
//       setState('installed');
//     }

//     const handleBeforeInstallPrompt = (event: Event) => {
//       const installEvent = event as BeforeInstallPromptEvent;
//       installEvent.preventDefault();
//       setDeferredPrompt(installEvent);
//     };

//     const handleAppInstalled = () => {
//       setState('installed');
//       setDeferredPrompt(null);
//       setStandalone(true);
//     };

//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//     window.addEventListener('appinstalled', handleAppInstalled);

//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//       window.removeEventListener('appinstalled', handleAppInstalled);
//     };
//   }, [setDeferredPrompt, setIOS, setStandalone, setState]);

//   return null;
// };

// export default PWAInstallProvider;
