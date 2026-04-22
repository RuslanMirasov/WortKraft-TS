'use client';

import { useSession } from 'next-auth/react';
import { usePopup } from '@/stores/popup-store';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRequest } from '@/shared/hooks/useRequest';
import { profileUpdateSchema, ProfileUpdateFormData } from '@/zod-schemas';
import { Form, Input, Button, Title, ProfileContent, Skeleton } from '@/components';
import { useEffect, useMemo } from 'react';
import { updateProfile } from '@/shared/lib/api/updateProfile';
import { getErrorTextTranslation } from '@/shared/lib/getErrorTextTranslation';

const ProfileUpdateForm = () => {
  const tProfile = useTranslations('profile');
  const tForms = useTranslations('forms');
  const tErrors = useTranslations('errors');
  const { data: session, update } = useSession();
  const { name, email, language } = session?.user ?? {};
  const openPopup = usePopup(state => state.openPopup);

  const initialValues = useMemo<ProfileUpdateFormData>(
    () => ({
      name: name ?? '',
      email: email ?? '',
      language: language ?? '',
    }),
    [email, language, name]
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

  const handleError = (error: unknown) => {
    const code = error instanceof Error ? error.message : undefined;

    openPopup('error', {
      title: tErrors('profile-update-error-title'),
      text: getErrorTextTranslation(tErrors, code),
    });
  };

  const { run, loading } = useRequest(updateProfile, {
    preventParallel: true,
    onError: handleError,
  });

  const onSubmit = async (data: ProfileUpdateFormData) => {
    try {
      await run(data);
      await update();
      openPopup('message', {
        freeze: true,
        image: '/img/lex/success.webp',
        title: tProfile('profile-updated-title'),
        text: tProfile('profile-updated-text'),
        buttonText: tProfile('updated-btn'),
      });
    } catch {}
  };

  return (
    <ProfileContent>
      <Title tag="h2" size="h3">
        {tProfile('profile-settings-title')}
      </Title>

      <hr />

      <Form form={form} onSubmit={onSubmit} loading={loading}>
        {!session && (
          <>
            <Skeleton height="48px" radius="48px" />
            <Skeleton height="48px" radius="48px" />
            <Skeleton height="48px" radius="48px" />
            <Skeleton height="48px" radius="48px" />
          </>
        )}

        {session && (
          <>
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
          </>
        )}
      </Form>
    </ProfileContent>
  );
};

export default ProfileUpdateForm;
