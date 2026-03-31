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

const getIsInstalledOnDevice = async () => {
  const navigatorWithRelatedApps = navigator as Navigator & {
    getInstalledRelatedApps?: () => Promise<unknown[]>;
  };

  if (!navigatorWithRelatedApps.getInstalledRelatedApps) {
    return false;
  }

  try {
    const installedApps = await navigatorWithRelatedApps.getInstalledRelatedApps();
    return installedApps.length > 0;
  } catch {
    return false;
  }
};

const PWAInstallProvider = () => {
  const setEnvironment = usePWAInstallStore(state => state.setEnvironment);
  const setDeferredPrompt = usePWAInstallStore(state => state.setDeferredPrompt);
  const setInstalledOnDevice = usePWAInstallStore(state => state.setInstalledOnDevice);
  const markInstalled = usePWAInstallStore(state => state.markInstalled);

  useEffect(() => {
    const isStandalone = getIsStandalone();
    const isIOS = getIsIOS();

    setEnvironment({ isStandalone, isIOS });

    if (isStandalone) {
      markInstalled();
    }

    void (async () => {
      if (isIOS) return;

      const isInstalledOnDevice = await getIsInstalledOnDevice();

      if (isInstalledOnDevice) {
        setInstalledOnDevice(true);
      }
    })();

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
  }, [markInstalled, setDeferredPrompt, setEnvironment, setInstalledOnDevice]);

  return null;
};

export default PWAInstallProvider;
