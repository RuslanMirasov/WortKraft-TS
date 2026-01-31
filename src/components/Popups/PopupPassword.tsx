'use client';

import { useTranslations } from 'next-intl';
import { Title, Text, PasswordForm } from '..';

const PopupPassword = () => {
  const tPopups = useTranslations('popups');

  return (
    <>
      <Title tag="h2" size="h5">
        {tPopups('reset-password-title')}
      </Title>
      <Text color="grey" size="small" align="center">
        {tPopups('reset-password-subtitle')}
      </Text>
      <PasswordForm />
    </>
  );
};

export default PopupPassword;
