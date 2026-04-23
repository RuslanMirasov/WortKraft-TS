export interface PopupStore {
  currentPopup: Popup | null;
  isBackdropOpen: boolean;
  isPopupOpen: boolean;

  openPopup: <T extends Popup['id']>(id: T, options?: Extract<Popup, { id: T }>['options']) => void;

  closePopup: () => void;
  setIsBackdropOpen: (isOpen: boolean) => void;
  setIsPopupOpen: (isOpen: boolean) => void;
}

type BasePopupId = 'login' | 'register' | 'password' | 'policy' | 'terms' | 'download';
type CustomPopupId = 'confirm' | 'error' | 'message';

export interface BasePopupOptions {
  freeze?: boolean;
  autoClose?: number;
}

export interface CustomPopupOptions extends BasePopupOptions {
  image?: string;
  icon?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  buttonEvent?: () => unknown | Promise<unknown>;
  choice?: boolean;
  loading?: boolean;
}

type PopupMap = {
  [K in BasePopupId]: BasePopupOptions;
} & {
  [K in CustomPopupId]: CustomPopupOptions;
};

export type Popup = {
  [K in keyof PopupMap]: {
    id: K;
    options?: PopupMap[K];
  };
}[keyof PopupMap];
