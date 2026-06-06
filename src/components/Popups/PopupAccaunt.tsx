'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { usePopup } from '@/stores/popup-store';
import { normalizeLocalePath } from '@/shared/config/routes';
import { useUrlError } from '@/shared/hooks/useUrlError';
import { Title, Text, Buttons, Button } from '..';
import Image from 'next/image';

const PopupAccaunt = () => {
  const closePopup = usePopup(state => state.closePopup);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setUrlError } = useUrlError();
  const tPopups = useTranslations('popups');
  const [loading, setLoading] = useState(false);

  const getCallbackUrl = () => {
    const normalizedPath = normalizeLocalePath(pathname);
    if (normalizedPath === '/login') return '/';

    const params = new URLSearchParams(searchParams.toString());
    params.delete('error');
    params.delete('restoreToken');

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const handleRestore = async () => {
    const token = searchParams.get('restoreToken');
    if (!token) {
      setUrlError('AccauntRestoreFailed');
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('restore-account', {
        token,
        redirect: false,
        callbackUrl: getCallbackUrl(),
      });

      if (result?.error) {
        setUrlError('AccauntRestoreFailed');
        return;
      }

      if (result?.url) {
        window.location.href = result.url;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('restoreToken');

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    closePopup();
  };

  return (
    <>
      <Image src="/img/lex/question.webp" alt="WortKraft question" width={280} height={280} />
      <Title tag="h2" size="h4">
        {tPopups('reset-accaunt-title')}
      </Title>
      <Text color="grey" size="small" align="center">
        {tPopups('reset-accaunt-subtitle')}
      </Text>
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
