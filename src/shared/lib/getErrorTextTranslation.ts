import { useTranslations } from 'next-intl';

type Translator = ReturnType<typeof useTranslations>;

export const getErrorTextTranslation = (t: Translator, code?: string) => {
  if (!code) return t('default-popup-error-text');

  try {
    return t(code);
  } catch {
    return t('default-popup-error-text');
  }
};
