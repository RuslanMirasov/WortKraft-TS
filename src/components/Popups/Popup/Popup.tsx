'use client';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { usePopup } from '@/stores/popup-store';
import css from './Popup.module.scss';
import { Icon, PopupLogin, PopupRegister, PopupPassword, PopupError } from '@/components';

const Popup = () => {
  const { currentPopup, closePopup, isBackdropOpen, isPopupOpen } = usePopup();

  useEffect(() => {
    if (isBackdropOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.add('locked');
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        setTimeout(() => {
          document.body.classList.remove('locked');
          document.body.style.paddingRight = '';
        }, 400);
      };
    }
  }, [isBackdropOpen]);

  useEffect(() => {
    if (!currentPopup?.options?.autoClose) {
      return;
    }

    const timer = setTimeout(() => {
      closePopup();
    }, currentPopup.options.autoClose * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPopup, closePopup]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !currentPopup?.options?.freeze) {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [currentPopup, closePopup]);

  if (!currentPopup) {
    return null;
  }

  const { id, options } = currentPopup;

  return createPortal(
    <section
      className={`${css.Backdrop} ${isBackdropOpen ? css.Open : ''} `}
      onMouseDown={options?.freeze ? undefined : closePopup}
      onTouchStart={options?.freeze ? undefined : closePopup}
    >
      <div
        className={`${css.Popup} ${isPopupOpen ? css.Open : ''} ${id === 'error' ? css.Error : ''}`}
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
      >
        {!options?.freeze && (
          <button className={css.PopupClose} onClick={closePopup}>
            <Icon name="close" />
          </button>
        )}
        {id === 'login' && <PopupLogin />}
        {id === 'register' && <PopupRegister />}
        {id === 'password' && <PopupPassword />}
        {id === 'error' && <PopupError options={options} />}
      </div>
    </section>,
    document.body
  );
};

export default Popup;
