import { getLocale, getTranslations } from 'next-intl/server';
import { GoBack, Hero, TermsDe, TermsEn, TermsUk, Title } from '@/components';

export default async function TermsPage() {
  const locale = await getLocale();
  const t = await getTranslations('policy-terms');

  return (
    <div className="container mini">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h3">
          {t('terms')}
        </Title>
      </Hero>

      {locale === 'en' && <TermsEn />}
      {locale === 'uk' && <TermsUk />}
      {locale === 'de' && <TermsDe />}
    </div>
  );
}
