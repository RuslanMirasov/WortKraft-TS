export interface PopupStore {
  currentPopup: Popup | null;
  isBackdropOpen: boolean;
  isPopupOpen: boolean;

  openPopup: <T extends Popup['id']>(id: T, options?: Extract<Popup, { id: T }>['options']) => void;

  closePopup: () => void;
  setIsBackdropOpen: (isOpen: boolean) => void;
  setIsPopupOpen: (isOpen: boolean) => void;
}

export type PopupId = 'login' | 'register' | 'password' | 'confirm' | 'error';

export interface BasePopupOptions {
  freeze?: boolean;
  autoClose?: number;
}

export interface CustomPopupOptions extends BasePopupOptions {
  icon?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  buttonEvent?: () => void;
}

export type Popup =
  | {
      id: 'login';
      options?: BasePopupOptions;
    }
  | {
      id: 'register';
      options?: BasePopupOptions;
    }
  | {
      id: 'password';
      options?: BasePopupOptions;
    }
  | {
      id: 'confirm';
      options?: CustomPopupOptions;
    }
  | {
      id: 'error';
      options?: CustomPopupOptions;
    };
