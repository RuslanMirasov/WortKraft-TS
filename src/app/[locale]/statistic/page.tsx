import { useTranslations } from 'next-intl';
import { Title } from '@/components';

export default function StatisticPage() {
  const t = useTranslations('navigation');

  return (
    <>
      <Title tag="h1" size="h1">
        Statistic
      </Title>
    </>
  );
}
