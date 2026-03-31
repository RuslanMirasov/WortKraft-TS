'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type PWAInstallStore = {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isStandalone: boolean;
  isIOS: boolean;
  lastShownAt: number | null;
  isPopupBlocked: boolean;

  setEnvironment: (params: { isStandalone: boolean; isIOS: boolean }) => void;
  setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void;
  markInstalled: () => void;
  markPopupShown: () => void;
  blockPopup: () => void;
};

export const usePWAInstallStore = create<PWAInstallStore>()(
  persist(
    set => ({
      deferredPrompt: null,
      isStandalone: false,
      isIOS: false,
      lastShownAt: null,
      isPopupBlocked: false,

      setEnvironment: ({ isStandalone, isIOS }) => set({ isStandalone, isIOS }),
      setDeferredPrompt: deferredPrompt => set({ deferredPrompt }),

      markInstalled: () =>
        set({
          isStandalone: true,
          deferredPrompt: null,
        }),

      markPopupShown: () => set({ lastShownAt: Date.now() }),
      blockPopup: () => set({ isPopupBlocked: true }),
    }),
    {
      name: 'pwa-install',
      partialize: state => ({
        lastShownAt: state.lastShownAt,
        isPopupBlocked: state.isPopupBlocked,
      }),
    }
  )
);

// 'use client';

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// type BeforeInstallPromptEvent = Event & {
//   prompt: () => Promise<void>;
//   userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
// };

// type InstallState = 'idle' | 'installing' | 'installed';

// type PWAInstallStore = {
//   deferredPrompt: BeforeInstallPromptEvent | null;
//   isStandalone: boolean;
//   isIOS: boolean;
//   state: InstallState;

//   lastShownAt: number | null;
//   isBlocked: boolean;

//   setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void;
//   setStandalone: (value: boolean) => void;
//   setIOS: (value: boolean) => void;
//   setState: (value: InstallState) => void;

//   setLastShownAt: (time: number) => void;
//   block: () => void;

//   resetPrompt: () => void;
// };

// export const usePWAInstallStore = create<PWAInstallStore>()(
//   persist(
//     set => ({
//       deferredPrompt: null,
//       isStandalone: false,
//       isIOS: false,
//       state: 'idle',

//       lastShownAt: null,
//       isBlocked: false,

//       setLastShownAt: lastShownAt => set({ lastShownAt }),
//       block: () => set({ isBlocked: true }),

//       setDeferredPrompt: deferredPrompt => set({ deferredPrompt }),
//       setStandalone: isStandalone => set({ isStandalone }),
//       setIOS: isIOS => set({ isIOS }),
//       setState: state => set({ state }),

//       resetPrompt: () => set({ deferredPrompt: null }),
//     }),
//     {
//       name: 'pwa-install',

//       partialize: state => ({
//         lastShownAt: state.lastShownAt,
//         isBlocked: state.isBlocked,
//       }),
//     }
//   )
// );
