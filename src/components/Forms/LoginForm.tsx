'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { loginSchema, LoginFormData } from '@/zod-schemas';
import { Form, Input, Button, Text } from '@/components';
import { usePopup } from '@/stores/popup-store';

import { useState } from 'react';

const LoginForm = () => {
  const { openPopup } = usePopup();
  const searchParams = useSearchParams();
  const tPopups = useTranslations('popups');
  const tForms = useTranslations('forms');
  const callbackUrl = searchParams.get('callbackUrl')?.startsWith('/') ? searchParams.get('callbackUrl')! : '/';
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
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? '/',
      });
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
