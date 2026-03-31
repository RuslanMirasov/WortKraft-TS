'use client';

import { useCallback } from 'react';
import { usePWAInstallStore } from '@/stores/pwa-install-store';

export const usePWAInstall = () => {
  const deferredPrompt = usePWAInstallStore(state => state.deferredPrompt);
  const isStandalone = usePWAInstallStore(state => state.isStandalone);
  const isIOS = usePWAInstallStore(state => state.isIOS);
  const markInstalled = usePWAInstallStore(state => state.markInstalled);
  const setDeferredPrompt = usePWAInstallStore(state => state.setDeferredPrompt);

  const hasPrompt = Boolean(deferredPrompt);
  const canInstall = !isStandalone && !isIOS && hasPrompt;

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
    hasPrompt,
    canInstall,
    promptInstall,
  };
};
// 'use client';

// import { useCallback } from 'react';
// import { usePWAInstallStore } from '@/stores/pwa-install-store';

// export const usePWAInstall = () => {
//   const deferredPrompt = usePWAInstallStore(state => state.deferredPrompt);
//   const isStandalone = usePWAInstallStore(state => state.isStandalone);
//   const isIOS = usePWAInstallStore(state => state.isIOS);
//   const state = usePWAInstallStore(state => state.state);

//   const setState = usePWAInstallStore(state => state.setState);
//   const resetPrompt = usePWAInstallStore(state => state.resetPrompt);

//   const hasPrompt = !!deferredPrompt;

//   const canInstall = !isStandalone && !isIOS && hasPrompt;

//   const promptInstall = useCallback(async () => {
//     if (!deferredPrompt) return false;

//     try {
//       setState('installing');

//       await deferredPrompt.prompt();
//       const result = await deferredPrompt.userChoice;

//       if (result.outcome === 'accepted') {
//         resetPrompt();
//         return true;
//       }

//       setState('idle');
//       return false;
//     } catch (error) {
//       setState('idle');
//       return false;
//     }
//   }, [deferredPrompt, resetPrompt, setState]);

//   return {
//     state,
//     isIOS,
//     isStandalone,
//     canInstall,
//     hasPrompt,
//     promptInstall,
//   };
// };
