import { useTranslations } from 'next-intl';
import { Title } from '@/components';

export default function PlicyPage() {
  const t = useTranslations('navigation');

  return (
    <>
      <Title tag="h1" size="h1">
        Privacy Policy
      </Title>
    </>
  );
}
