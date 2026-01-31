import { create } from 'zustand';
import type { Popup, PopupStore } from '@/types/popup';

export const usePopup = create<PopupStore>((set, get) => ({
  currentPopup: null,
  isBackdropOpen: false,
  isPopupOpen: false,

  openPopup: (id, options) => {
    const state = get();
    const newPopup = { id, options } as Popup;

    if (state.isPopupOpen) {
      set({ isPopupOpen: false });

      setTimeout(() => {
        set({
          currentPopup: newPopup,
          isPopupOpen: true,
        });
      }, 400);
    } else {
      set({
        currentPopup: newPopup,
        isBackdropOpen: true,
        isPopupOpen: true,
      });
    }
  },

  closePopup: () => {
    set({
      isBackdropOpen: false,
      isPopupOpen: false,
    });

    setTimeout(() => {
      set({ currentPopup: null });
    }, 400);
  },

  setIsBackdropOpen: isOpen => {
    set({ isBackdropOpen: isOpen });
  },

  setIsPopupOpen: isOpen => {
    set({ isPopupOpen: isOpen });
  },
}));
