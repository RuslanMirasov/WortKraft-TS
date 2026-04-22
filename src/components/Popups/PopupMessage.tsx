'use client';

import { Title, Text, Button } from '..';
import { usePopup } from '@/stores/popup-store';
import type { CustomPopupOptions } from '@/types/popup';
import Image from 'next/image';

interface PopupErrorProps {
  options?: CustomPopupOptions;
}

const PopupMessage = ({ options }: PopupErrorProps) => {
  const closePopup = usePopup(state => state.closePopup);
  const handleClick = options?.buttonEvent ?? closePopup;

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
      {options?.buttonText && (
        <Button onClick={handleClick} icon="arrow-right" variant="green" full>
          {options?.buttonText}
        </Button>
      )}
    </>
  );
};

export default PopupMessage;
