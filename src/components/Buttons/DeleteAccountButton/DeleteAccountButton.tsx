'use client';

import { useTranslations } from 'next-intl';
import { deleteAccount } from '@/shared/lib/api/deleteAccount';
import { signOut } from 'next-auth/react';
import { usePopup } from '@/stores/popup-store';
import { useRequest } from '@/shared/hooks/useRequest';
import { getErrorTextTranslation } from '@/shared/lib/getErrorTextTranslation';
import { Button } from '@/components';

const DeleteAccountButton = () => {
  const t = useTranslations('profile');
  const tpopup = useTranslations('popups');
  const tErrors = useTranslations('errors');
  const openPopup = usePopup(state => state.openPopup);

  const handleError = (error: unknown) => {
    const code = error instanceof Error ? error.message : undefined;

    openPopup('error', {
      title: tErrors('default-popup-error-title'),
      text: getErrorTextTranslation(tErrors, code),
    });
  };

  const { run } = useRequest(deleteAccount, {
    preventParallel: true,
    onError: handleError,
  });

  const onDeleteButtonClick = () => {
    openPopup('message', {
      image: '/img/lex/question.webp',
      title: tpopup('are-you-sure'),
      text: tpopup('delete-accaunt-popup-text'),
      choice: true,
      buttonEvent: async () => {
        try {
          await run();

          openPopup('message', {
            freeze: true,
            image: '/img/lex/404.webp',
            title: 'Аккаунт удалён!',
            text: 'Теперь только восстанавливать',
            buttonText: tErrors('default-popup-error-button-text'),
            buttonEvent: async () => {
              await signOut();
            },
          });
        } catch {}
      },
    });
  };

  return (
    <Button icon="user" size="small" full variant="red" onClick={onDeleteButtonClick}>
      {t('delete-button-text')}
    </Button>
  );
};

export default DeleteAccountButton;
