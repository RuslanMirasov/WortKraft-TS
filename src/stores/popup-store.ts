import { create } from 'zustand';

export type PopupIds = 'login' | 'register' | 'confirmation' | 'error' | 'password';

export interface Popup {
  id: PopupIds;
  props?: Record<string, any>;
  options?: {
    freeze?: boolean;
    autoClose?: number;
  };
}

interface PopupStore {
  currentPopup: Popup | null;
  isBackdropOpen: boolean;
  isPopupOpen: boolean;

  openPopup: (popupId: PopupIds, props?: Record<string, any>, options?: Popup['options']) => void;
  closePopup: () => void;
  setIsBackdropOpen: (isOpen: boolean) => void;
  setIsPopupOpen: (isOpen: boolean) => void;
}

export const usePopup = create<PopupStore>((set, get) => ({
  currentPopup: null,
  isBackdropOpen: false,
  isPopupOpen: false,

  openPopup: (popupId, props = {}, options = {}) => {
    const state = get();
    const newPopup: Popup = { id: popupId, props, options };

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
