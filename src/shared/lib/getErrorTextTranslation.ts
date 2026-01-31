import { useTranslations } from 'next-intl';

type Translator = ReturnType<typeof useTranslations>;

export const getErrorTextTranslation = (t: Translator, code?: string) => {
  if (!code) return t('default-popup-error-text');

  const translated = t(code);

  if (translated === code) {
    return t('default-popup-error-text');
  }

  return translated;
};
