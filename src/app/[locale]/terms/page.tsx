import { useTranslations } from 'next-intl';
import { Title } from '@/components';

export default function TermsPage() {
  const t = useTranslations('navigation');

  return (
    <>
      <Title tag="h1" size="h1">
        Terms
      </Title>
    </>
  );
}
