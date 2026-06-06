'use client';

import { useForm } from 'react-hook-form';
import { useUrlError } from '@/shared/hooks/useUrlError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { loginSchema, LoginFormData } from '@/zod-schemas';
import { Form, Input, Button, Text } from '@/components';
import { usePopup } from '@/stores/popup-store';
import { useAuthCallbackUrl } from '@/shared/hooks/useAuthCallbackUrl';

import { useState } from 'react';

const LoginForm = () => {
  const { setUrlError } = useUrlError();
  const openPopup = usePopup(state => state.openPopup);
  const tPopups = useTranslations('popups');
  const tForms = useTranslations('forms');
  const callbackUrl = useAuthCallbackUrl();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        const [code, restoreToken] = result.error.split(':');
        setUrlError(code, { restoreToken });
        return;
      }

      if (result?.url) {
        window.location.href = result.url;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form form={form} onSubmit={onSubmit} loading={loading}>
        <Input type="email" name="email" placeholder={tForms('email-placeholder')} />
        <Input type="password" name="password" placeholder={tForms('password-placeholder')} />
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
