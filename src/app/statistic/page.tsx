import { useTranslations } from 'next-intl';
import { GoBack, Hero, Title } from '@/components';

export default function StatisticPage() {
  const t = useTranslations('navigation');

  return (
    <div className="container">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h1">
          {t('statistic')}
        </Title>
      </Hero>
    </div>
  );
}
