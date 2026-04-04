import { getTranslations } from 'next-intl/server';
import { GoBack, Hero, PolicyDe, PolicyEn, PolicyUk, Title } from '@/components';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PolicyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('policy-terms');

  return (
    <div className="container mini">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h3">
          {t('policy')}
        </Title>
      </Hero>

      {locale === 'en' && <PolicyEn />}
      {locale === 'uk' && <PolicyUk />}
      {locale === 'de' && <PolicyDe />}
    </div>
  );
}
