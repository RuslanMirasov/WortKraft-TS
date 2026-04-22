'use client';

import { useSession } from 'next-auth/react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { passwordUpdateSchema, PasswordUpdateFormData } from '@/zod-schemas';
import { Form, Input, Button, Title, ProfileContent, Skeleton } from '@/components';
import { useEffect, useMemo, useState } from 'react';

const PasswordUpdateForm = () => {
  const { status } = useSession();
  const tProfile = useTranslations('profile');
  const tForms = useTranslations('forms');
  const [loading, setLoading] = useState(false);
  const initialValues = useMemo<PasswordUpdateFormData>(
    () => ({
      oldpassword: '',
      newpassword: '',
      newpasswordconfirm: '',
    }),
    []
  );

  const form = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const [oldpassword, newpassword, newpasswordconfirm] = useWatch({
    control: form.control,
    name: ['oldpassword', 'newpassword', 'newpasswordconfirm'],
  });

  const hasChanges =
    (oldpassword ?? '') !== initialValues.oldpassword ||
    (newpassword ?? '') !== initialValues.newpassword ||
    (newpasswordconfirm ?? '') !== initialValues.newpasswordconfirm;

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const newpasswordErrorMessage = form.formState.errors.newpassword?.message;
  const newpasswordconfirmErrorMessage = form.formState.errors.newpasswordconfirm?.message;

  useEffect(() => {
    const hasMismatchError =
      newpasswordErrorMessage === 'passwords-must-match' || newpasswordconfirmErrorMessage === 'passwords-must-match';

    if (!newpassword || !newpasswordconfirm) {
      if (hasMismatchError) {
        form.clearErrors(['newpassword', 'newpasswordconfirm']);
      }
      return;
    }

    void form.trigger(['newpassword', 'newpasswordconfirm']);
  }, [form, newpassword, newpasswordconfirm, newpasswordErrorMessage, newpasswordconfirmErrorMessage]);

  const onSubmit = async (data: PasswordUpdateFormData) => {
    setLoading(true);
    try {
      console.log('Обновляем пароль');
      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContent>
      <Title tag="h2" size="h3">
        {tProfile('password-settings-title')}
      </Title>

      <hr />

      <Form form={form} onSubmit={onSubmit} loading={loading}>
        {status === 'loading' && (
          <>
            <Skeleton height="48px" radius="48px" />
            <Skeleton height="48px" radius="48px" />
            <Skeleton height="48px" radius="48px" />
            <Skeleton height="48px" radius="48px" />
          </>
        )}
        {status !== 'loading' && (
          <>
            <Input type="password" name="oldpassword" placeholder={tForms('oldpassword-placeholder')} />
            <Input type="password" name="newpassword" placeholder={tForms('newpassword-placeholder')} />
            <Input type="password" name="newpasswordconfirm" placeholder={tForms('newpasswordconfirm-placeholder')} />

            <Button size="small" variant="green" icon="arrow-right" full loading={loading} disabled={!hasChanges}>
              {tForms('update-button-text')}
            </Button>
          </>
        )}
      </Form>
    </ProfileContent>
  );
};

export default PasswordUpdateForm;
