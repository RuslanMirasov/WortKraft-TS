'use client';

import type { CustomPopupOptions } from '@/types/popup';

import { useTranslations } from 'next-intl';
import { useRestoreAccountActions } from '@/shared/lib/api/restoreAccount';
import { Title, Text, Buttons, Button } from '..';
import Image from 'next/image';

interface PopupErrorProps {
  options?: CustomPopupOptions;
}

const PopupAccaunt = ({ options }: PopupErrorProps) => {
  const tPopups = useTranslations('popups');
  const { handleRestore, handleCancel, loading } = useRestoreAccountActions();

  return (
    <>
      {options?.image && <Image src={options?.image} alt={options?.title || ''} width={280} height={280} />}
      {options?.title && (
        <Title tag="h2" size="h4">
          {options.title}
        </Title>
      )}
      {options?.text && (
        <Text color="grey" align="center">
          {options.text}
        </Text>
      )}

      <hr />

      <Buttons>
        <Button icon="confirm" variant="green" loading={loading} onClick={handleRestore}>
          {tPopups('yes')}
        </Button>

        <Button onClick={handleCancel} icon="close" variant="red" disabled={loading}>
          {tPopups('no')}
        </Button>
      </Buttons>
    </>
  );
};

export default PopupAccaunt;
