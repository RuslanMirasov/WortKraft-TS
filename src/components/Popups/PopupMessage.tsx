'use client';

import { Title, Text, Button, Buttons } from '..';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePopup } from '@/stores/popup-store';
import type { CustomPopupOptions } from '@/types/popup';
import Image from 'next/image';

interface PopupErrorProps {
  options?: CustomPopupOptions;
}

const PopupMessage = ({ options }: PopupErrorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const tpopup = useTranslations('popups');
  const closePopup = usePopup(state => state.closePopup);

  const handleClick = async () => {
    if (!options?.buttonEvent) {
      closePopup();
      return;
    }

    setIsLoading(true);

    try {
      await options.buttonEvent();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {options?.image && <Image src={options?.image} alt={options?.title || ''} width={280} height={280} />}
      {options?.title && (
        <Title tag="h2" size="h4">
          {options?.title}
        </Title>
      )}
      {options?.text && (
        <Text color="grey" align="center">
          {options?.text}
        </Text>
      )}
      <hr />
      <Buttons>
        <Button
          onClick={handleClick}
          icon="confirm"
          variant="green"
          full={options?.choice ? false : true}
          loading={isLoading}
        >
          {options?.choice ? tpopup('yes') : options?.buttonText}
        </Button>

        {options?.choice && (
          <Button onClick={closePopup} icon="close" variant="red">
            {tpopup('no')}
          </Button>
        )}
      </Buttons>
    </>
  );
};

export default PopupMessage;
