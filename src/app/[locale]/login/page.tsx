import { useTranslations } from 'next-intl';
import { Title } from '@/components';

export default function LoginPage() {
  const t = useTranslations('navigation');

  return (
    <>
      <Title tag="h1" size="h1">
        Login
      </Title>
    </>
  );
}
