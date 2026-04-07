'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { profileUpdateSchema, ProfileUpdateFormData } from '@/zod-schemas';
import { Form, Input, Button, Title, ProfileContent } from '@/components';
import { useEffect, useMemo, useState } from 'react';

type ProfileUpdateFormProps = {
  fields?: Pick<ProfileUpdateFormData, 'name' | 'email' | 'language'>;
};

const ProfileUpdateForm = ({ fields }: ProfileUpdateFormProps) => {
  const tForms = useTranslations('forms');
  const [loading, setLoading] = useState(false);
  const initialValues = useMemo<ProfileUpdateFormData>(
    () => ({
      name: fields?.name ?? '',
      email: fields?.email ?? '',
      language: fields?.language ?? '',
    }),
    [fields?.email, fields?.language, fields?.name]
  );

  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const watchedValues = useWatch({
    control: form.control,
  });

  const hasChanges =
    (watchedValues.name ?? '') !== initialValues.name ||
    (watchedValues.email ?? '') !== initialValues.email ||
    (watchedValues.language ?? '') !== initialValues.language;

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const onSubmit = async (data: ProfileUpdateFormData) => {
    setLoading(true);
    try {
      console.log('Обновляем профиль');
      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContent>
      <Title tag="h2" size="h3">
        Profil Einstellungen
      </Title>

      <hr />

      <Form form={form} onSubmit={onSubmit} loading={loading}>
        <Input type="email" name="email" placeholder={tForms('email-placeholder')} disabled />
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

        <Button size="small" variant="green" icon="arrow-right" full loading={loading} disabled={!hasChanges}>
          {tForms('update-button-text')}
        </Button>
      </Form>
    </ProfileContent>
  );
};

export default ProfileUpdateForm;
