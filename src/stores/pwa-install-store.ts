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
  isInstalledOnDevice: boolean;
  lastShownAt: number | null;
  isPopupBlocked: boolean;

  setEnvironment: (params: { isStandalone: boolean; isIOS: boolean }) => void;
  setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void;
  setInstalledOnDevice: (value: boolean) => void;
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
      isInstalledOnDevice: false,
      lastShownAt: null,
      isPopupBlocked: false,

      setEnvironment: ({ isStandalone, isIOS }) => set({ isStandalone, isIOS }),
      setDeferredPrompt: deferredPrompt => set({ deferredPrompt }),
      setInstalledOnDevice: isInstalledOnDevice => set({ isInstalledOnDevice }),
      markInstalled: () =>
        set({
          isStandalone: true,
          isInstalledOnDevice: true,
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
