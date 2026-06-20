import { useTranslations } from 'next-intl';
import { GoBack, Hero, Title } from '@/components';

export default function SearchPage() {
  const t = useTranslations('navigation');

  return (
    <div className="container">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h1">
          {t('search')}
        </Title>
      </Hero>
    </div>
  );
}
