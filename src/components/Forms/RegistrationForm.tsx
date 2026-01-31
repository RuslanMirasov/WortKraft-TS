'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormData } from '@/zod-schemas';
import { useTranslations } from 'next-intl';
import { Form, Input, Button, Text } from '..';

const RegistrationForm = () => {
  const tPopups = useTranslations('popups');
  const tForms = useTranslations('forms');

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      privacy: false,
      terms: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    console.log('Данные формы:', data);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Input type="text" name="name" placeholder={tForms('name-placeholder')} />
      <Input
        type="select"
        name="language"
        placeholder={tForms('language-placeholder')}
        required
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

      <Input type="email" name="email" required placeholder={tForms('email-placeholder')} />
      <Input type="password" name="password" required placeholder={tForms('password-placeholder')} />
      <Input type="checkbox" name="privacy" required>
        {tForms('policy-agree-placeholder')} <Text href="./profile">{tForms('policy-agree-link')}</Text>
      </Input>
      <Input type="checkbox" name="terms" required>
        {tForms('terms-agree-placeholder')} <Text href="./profile">{tForms('terms-agree-link')}</Text>
      </Input>
      <Button size="small" variant="green" icon="arrow-right" full>
        {tPopups('signup-action')}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
