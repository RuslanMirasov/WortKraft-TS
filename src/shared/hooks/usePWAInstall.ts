'use client';

import { useCallback } from 'react';
import { usePWAInstallStore } from '@/stores/pwa-install-store';

export const usePWAInstall = () => {
  const deferredPrompt = usePWAInstallStore(state => state.deferredPrompt);
  const isStandalone = usePWAInstallStore(state => state.isStandalone);
  const isIOS = usePWAInstallStore(state => state.isIOS);
  const isInstalledOnDevice = usePWAInstallStore(state => state.isInstalledOnDevice);
  const markInstalled = usePWAInstallStore(state => state.markInstalled);
  const setDeferredPrompt = usePWAInstallStore(state => state.setDeferredPrompt);

  const hasPrompt = Boolean(deferredPrompt);
  const canInstall = !isStandalone && !isIOS && !isInstalledOnDevice && hasPrompt;

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;

      if (result.outcome === 'accepted') {
        markInstalled();
        return true;
      }

      setDeferredPrompt(null);
      return false;
    } catch {
      return false;
    }
  }, [deferredPrompt, markInstalled, setDeferredPrompt]);

  return {
    isIOS,
    isStandalone,
    isInstalledOnDevice,
    hasPrompt,
    canInstall,
    promptInstall,
  };
};
