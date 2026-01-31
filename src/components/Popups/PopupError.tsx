'use client';

import { Title, Text, Icon, Button } from '..';
import { useTranslations } from 'next-intl';
import { usePopup } from '@/stores/popup-store';
import type { CustomPopupOptions } from '@/types/popup';

interface PopupErrorProps {
  options?: CustomPopupOptions;
}

const PopupError = ({ options }: PopupErrorProps) => {
  const { closePopup } = usePopup();
  const t = useTranslations('errors');

  const DEFAULT_ERROR_OPTIONS: Required<Pick<CustomPopupOptions, 'icon' | 'title' | 'text' | 'buttonText'>> = {
    icon: 'error',
    title: t('default-popup-error-title'),
    text: t('default-popup-error-text'),
    buttonText: t('default-popup-error-button-text'),
  };

  const merged = {
    ...DEFAULT_ERROR_OPTIONS,
    ...options,
  };

  const handleClick = merged.buttonEvent ?? closePopup;

  return (
    <>
      <Icon name={merged.icon} size={80} stroke="var(--white)" />
      <Title tag="h2" size="h6">
        {merged.title}
      </Title>
      <hr />
      <Text color="grey" size="small" align="center">
        {merged.text}
      </Text>
      <Button onClick={handleClick} size="small" icon="arrow-right" variant="white" full>
        {merged.buttonText}
      </Button>
    </>
  );
};

export default PopupError;
