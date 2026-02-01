'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormData } from '@/zod-schemas';
import { useTranslations } from 'next-intl';
import { Form, Input, Button, Text } from '@/components';
import { registration } from '@/shared/lib/api/registration';
import { useRequest } from '@/shared/hooks/useRequest';
import { usePopup } from '@/stores/popup-store';
import { getErrorTextTranslation } from '@/shared/lib/getErrorTextTranslation';
import { signIn } from 'next-auth/react';

const RegistrationForm = () => {
  const tPopups = useTranslations('popups');
  const tForms = useTranslations('forms');
  const tErrors = useTranslations('errors');
  const { openPopup, closePopup } = usePopup();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      language: '',
      privacy: false,
      terms: false,
    },
  });

  const handleError = (error: unknown) => {
    const code = error instanceof Error ? error.message : undefined;

    openPopup('error', {
      title: tErrors('register-popup-error-title'),
      text: getErrorTextTranslation(tErrors, code),
      buttonEvent: () => openPopup('register'),
    });
  };

  const { run, loading } = useRequest(registration, {
    preventParallel: true,
    onError: handleError,
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await run(data);

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      await closePopup();
    } catch {}
  };

  return (
    <Form form={form} onSubmit={onSubmit} loading={loading}>
      <Input type="text" name="name" placeholder={tForms('name-placeholder')} />
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

      <Input type="email" name="email" placeholder={tForms('email-placeholder')} />
      <Input type="password" name="password" placeholder={tForms('password-placeholder')} />
      <Input type="checkbox" name="privacy">
        {tForms('policy-agree-placeholder')} <Text href="./profile">{tForms('policy-agree-link')}</Text>
      </Input>
      <Input type="checkbox" name="terms">
        {tForms('terms-agree-placeholder')} <Text href="./profile">{tForms('terms-agree-link')}</Text>
      </Input>
      <Button size="small" variant="green" icon="arrow-right" full loading={loading}>
        {tPopups('signup-action')}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
