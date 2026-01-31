'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PasswordFormData } from '@/zod-schemas';
import { useTranslations } from 'next-intl';
import { Form, Input, Button } from '..';

const PasswordForm = () => {
  const tForms = useTranslations('forms');
  const tPopups = useTranslations('popups');

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    console.log('Данные формы:', data);
  };

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <Input type="hidden" name="subject" value={tPopups('reset-password-title')} />
        <Input type="email" name="email" required placeholder={tForms('email-placeholder')} />

        <Button size="small" variant="green" icon="arrow-right" full>
          {tPopups('send')}
        </Button>
      </Form>
    </>
  );
};

export default PasswordForm;
