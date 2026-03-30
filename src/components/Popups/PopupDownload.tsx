'use client';

import { useTranslations } from 'next-intl';
import { usePopup } from '@/stores/popup-store';
import { Buttons, Button, Title, Icon, Text, DownloadInstruction, Input } from '..';
import { usePWAInstall } from '@/shared/hooks/usePWAInstall';

const PopupDownload = () => {
  const { closePopup } = usePopup();
  const t = useTranslations('download-app');
  const { canInstall, hasPrompt, promptInstall, isIOS, isStandalone } = usePWAInstall();

  const handleInstall = async () => {
    if (hasPrompt) {
      const installed = await promptInstall();

      if (installed) {
        closePopup();
      }

      return;
    }

    closePopup();
  };

  return (
    <>
      <Icon name="logo" size="100" />

      <Title tag="h2" size="h5">
        {t('title')}
      </Title>

      <Text color="grey" size="small" align="center">
        {t('subtitle')}
      </Text>

      <hr />

      {canInstall && (
        <Buttons>
          <Button onClick={handleInstall} size="small" icon="arrow-right" full variant="green">
            {t('button-text')}
          </Button>

          <Input type="checkbox" name="instal" />

          <Button onClick={closePopup} size="small" icon="close" full>
            {t('later')}
          </Button>
        </Buttons>
      )}

      {isIOS && !isStandalone && (
        <>
          <DownloadInstruction />

          <Buttons>
            <Button onClick={closePopup} size="small" icon="arrow-right" full>
              {t('ok')}
            </Button>
          </Buttons>
        </>
      )}
    </>
  );
};

export default PopupDownload;
