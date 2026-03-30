'use client';

import { useEffect, useRef } from 'react';
import { usePWAInstallStore } from '@/stores/pwa-install-store';
import { usePopup } from '@/stores/popup-store';

const SHOW_INTERVAL = 1000 * 10 * 1; // раз в 10 секунд
const TICK = 5000; // проверка каждые 5 секунд

const PWAInstallController = () => {
  const { openPopup } = usePopup();

  const { isStandalone, isIOS, deferredPrompt, isBlocked, lastShownAt, setLastShownAt } = usePWAInstallStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isStandalone || isBlocked || (!deferredPrompt && !isIOS)) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const now = Date.now();

      if (lastShownAt && now - lastShownAt < SHOW_INTERVAL) return;

      openPopup('download');
      setLastShownAt(now);
    }, TICK);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isStandalone, isBlocked, deferredPrompt, isIOS, lastShownAt, openPopup, setLastShownAt]);

  return null;
};

export default PWAInstallController;
