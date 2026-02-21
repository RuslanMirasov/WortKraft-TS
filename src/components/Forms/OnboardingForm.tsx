'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingFormData } from '@/zod-schemas';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Text, Fieldset } from '@/components';
import { onboarding } from '@/shared/lib/api/onboarding';
import { useRequest } from '@/shared/hooks/useRequest';
import { useSearchParams } from 'next/navigation';
import { usePopup } from '@/stores/popup-store';
import { getErrorTextTranslation } from '@/shared/lib/getErrorTextTranslation';

const OnboardingForm = () => {
  const tForms = useTranslations('forms');
  const tErrors = useTranslations('errors');
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/';
  const { update } = useSession();
  const { openPopup } = usePopup();

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      language: '',
      privacy: false,
      terms: false,
    },
  });

  const handleError = (error: unknown) => {
    const code = error instanceof Error ? error.message : undefined;

    openPopup('error', {
      title: tErrors('onboarding-popup-error-title'),
      text: getErrorTextTranslation(tErrors, code),
    });
  };

  const { run, loading } = useRequest(onboarding, {
    preventParallel: true,
    onError: handleError,
  });

  const onSubmit = async (data: OnboardingFormData) => {
    await run(data);
    await update();
    window.location.href = callbackUrl;
  };

  return (
    <Form form={form} onSubmit={onSubmit} loading={loading}>
      <Input
        type="select"
        name="language"
        placeholder={tForms('language-placeholder')}
        options={[
          { value: 'en', label: 'English' },
          { value: 'fr', label: 'Français' },
          { value: 'ua', label: 'Українська' },
          { value: 'pl', label: 'Polski' },
          { value: 'it', label: 'Italiano' },
          { value: 'es', label: 'Español' },
          { value: 'tr', label: 'Türkçe' },
          { value: 'ru', label: 'Русский' },
        ]}
      />
      <Fieldset cal={1}>
        <Input type="checkbox" name="privacy">
          {tForms('policy-agree-placeholder')}{' '}
          <Text
            tag="span"
            size="small"
            color="grey"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              openPopup('policy');
            }}
          >
            {tForms('policy-agree-link')}
          </Text>
        </Input>
        <Input type="checkbox" name="terms">
          {tForms('terms-agree-placeholder')}{' '}
          <Text
            tag="span"
            size="small"
            color="grey"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              openPopup('terms');
            }}
          >
            {tForms('terms-agree-link')}
          </Text>
        </Input>
      </Fieldset>

      <Button size="small" variant="green" icon="arrow-right" full loading={loading}>
        {tForms('onboarding-button')}
      </Button>
    </Form>
  );
};

export default OnboardingForm;
