'use client';

import { useEffect, useState, useCallback } from 'react';

type InstallState = 'idle' | 'installing' | 'installed';

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [state, setState] = useState<InstallState>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    const ios = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

    setIsStandalone(standalone);
    setIsIOS(ios);

    if (standalone) {
      setState('installed');
      return;
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleInstalled = () => {
      setState('installed');
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;

    setState('installing');

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome !== 'accepted') {
      setState('idle');
      return false;
    }

    return true;
  }, [deferredPrompt]);

  // 🚀 production logic
  const canInstall = typeof window !== 'undefined' && !isStandalone && !isIOS;

  return {
    state,
    isIOS,
    isStandalone,
    canInstall,
    hasPrompt: !!deferredPrompt,
    promptInstall,
  };
};
