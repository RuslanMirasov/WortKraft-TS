import { useTranslations } from 'next-intl';
import { Title, CenteredMessage, Text, OnboardingForm, Icon } from '@/components';

export default function OnboardingPage() {
  const t = useTranslations('onboarding');

  return (
    <CenteredMessage small>
      <Icon name="logo" size={100} />
      <Title tag="h1" size="h2" align="center">
        {t('title')}
      </Title>
      <Text color="grey" align="center">
        {t('subtitle')}
      </Text>

      <OnboardingForm />
    </CenteredMessage>
  );
}
