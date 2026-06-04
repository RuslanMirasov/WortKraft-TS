import { useTranslations } from 'next-intl';

type Translator = ReturnType<typeof useTranslations>;

export const getErrorTextTranslation = (t: Translator, code?: string) => {
  if (!code || !t.has(code)) {
    return t('default-popup-error-text');
  }

  return t(code);
};
