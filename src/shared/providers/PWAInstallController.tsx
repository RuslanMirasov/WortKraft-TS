'use client';

import { useEffect, useRef } from 'react';
import { usePWAInstallStore } from '@/stores/pwa-install-store';
import { usePopup } from '@/stores/popup-store';

const IOS_SHOW_INTERVAL = 1000 * 5;
const IOS_TICK = 1000;

const DEFAULT_SHOW_INTERVAL = 1000 * 5;
const DEFAULT_TICK = 1000;

const PWAInstallController = () => {
  const openPopup = usePopup(state => state.openPopup);

  const isStandalone = usePWAInstallStore(state => state.isStandalone);
  const isIOS = usePWAInstallStore(state => state.isIOS);
  const isInstalledOnDevice = usePWAInstallStore(state => state.isInstalledOnDevice);
  const deferredPrompt = usePWAInstallStore(state => state.deferredPrompt);
  const isPopupBlocked = usePWAInstallStore(state => state.isPopupBlocked);
  const lastShownAt = usePWAInstallStore(state => state.lastShownAt);
  const markPopupShown = usePWAInstallStore(state => state.markPopupShown);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canShowOnIOS = isIOS && !isStandalone && !isPopupBlocked;

    const canShowOnDefault =
      !isIOS && !isStandalone && !isInstalledOnDevice && !isPopupBlocked && Boolean(deferredPrompt);

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
  }, [
    deferredPrompt,
    isIOS,
    isInstalledOnDevice,
    isPopupBlocked,
    isStandalone,
    lastShownAt,
    markPopupShown,
    openPopup,
  ]);

  return null;
};

export default PWAInstallController;
