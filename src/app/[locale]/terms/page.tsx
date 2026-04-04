import { getTranslations } from 'next-intl/server';
import { GoBack, Hero, TermsDe, TermsEn, TermsUk, Text, Title } from '@/components';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
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
