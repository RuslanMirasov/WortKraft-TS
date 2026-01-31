'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { loginSchema, LoginFormData } from '@/zod-schemas';
import { Form, Input, Button, Text } from '@/components';
import { usePopup } from '@/stores/popup-store';
import { useRequest } from '@/shared/hooks/useRequest';
import { getErrorTextTranslation } from '@/shared/lib/getErrorTextTranslation';
import { loginCredentials } from '@/shared/lib/api';

const LoginForm = () => {
  const { openPopup } = usePopup();

  const tErrors = useTranslations('errors');
  const tPopups = useTranslations('popups');
  const tForms = useTranslations('forms');

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleError = (error: unknown) => {
    const code = error instanceof Error ? error.message : undefined;

    openPopup('error', {
      title: tErrors('login-popup-error-title'),
      text: getErrorTextTranslation(tErrors, code),
      buttonEvent: () => openPopup('login'),
    });
  };

  const { run, loading } = useRequest(loginCredentials, {
    preventParallel: true,
    onError: handleError,
  });

  const onSubmit = async (data: LoginFormData) => {
    await run(data);
  };

  return (
    <>
      <Form form={form} onSubmit={onSubmit} loading={loading}>
        <Input type="email" name="email" required placeholder={tForms('email-placeholder')} />
        <Input type="password" name="password" required placeholder={tForms('password-placeholder')} />
        <Button size="small" variant="green" icon="arrow-right" full loading={loading}>
          {tPopups('signin-action')}
        </Button>
      </Form>

      <Text align="center" light size="small" color="green" onClick={() => openPopup('password')}>
        {tPopups('forgot-password')}
      </Text>
    </>
  );
};

export default LoginForm;
