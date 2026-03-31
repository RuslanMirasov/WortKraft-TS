'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePopup } from '@/stores/popup-store';
import { usePWAInstallStore } from '@/stores/pwa-install-store';
import { Button, Buttons, DownloadInstruction, Icon, Text, Title, Checkbox } from '..';
import { usePWAInstall } from '@/shared/hooks/usePWAInstall';

const PopupDownload = () => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const t = useTranslations('download-app');
  const closePopup = usePopup(state => state.closePopup);
  const blockPopup = usePWAInstallStore(state => state.blockPopup);
  const { canInstall, promptInstall, isIOS, isStandalone, isInstalledOnDevice } = usePWAInstall();
  const showInstallButton = canInstall;
  const showIOSInstruction = isIOS && !isStandalone;
  const showActions = showInstallButton || showIOSInstruction;

  const handleClose = () => {
    if (doNotShowAgain) {
      blockPopup();
    }

    closePopup();
  };

  const handleInstall = async () => {
    const isInstalled = await promptInstall();

    if (isInstalled) {
      closePopup();
      return;
    }

    handleClose();
  };

  if (isInstalledOnDevice && !isIOS) {
    return null;
  }

  if (!showActions) {
    return null;
  }

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

      {showIOSInstruction && <DownloadInstruction />}

      <Buttons>
        {showInstallButton && (
          <Button onClick={handleInstall} size="small" icon="arrow-right" full variant="green">
            {t('button-text')}
          </Button>
        )}

        <Button onClick={handleClose} size="small" icon="close" full>
          {t('later')}
        </Button>
      </Buttons>

      <hr />

      <Checkbox checked={doNotShowAgain} onChange={setDoNotShowAgain} name="do-not-show-download-popup">
        <Text color="grey" size="small">
          {t('do-not-show-again')}
        </Text>
      </Checkbox>
    </>
  );
};

export default PopupDownload;
