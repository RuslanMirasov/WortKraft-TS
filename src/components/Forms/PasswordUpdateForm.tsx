'use client';

import { useSession } from 'next-auth/react';
import { usePopup } from '@/stores/popup-store';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { passwordUpdateSchema, PasswordUpdateFormData } from '@/zod-schemas';
import { Form, Input, Button, Title, ProfileContent, Skeleton } from '@/components';
import { useEffect, useMemo } from 'react';
import { getErrorTextTranslation } from '@/shared/lib/getErrorTextTranslation';
import { updatePassword } from '@/shared/lib/api/updatePassword';
import { useRequest } from '@/shared/hooks/useRequest';

const PasswordUpdateForm = () => {
  const { data: session, status, update } = useSession();
  const tProfile = useTranslations('profile');
  const tForms = useTranslations('forms');
  const tErrors = useTranslations('errors');
  const hasPassword = session?.user?.hasPassword ?? false;
  const openPopup = usePopup(state => state.openPopup);
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

  const handleError = (error: unknown) => {
    const code = error instanceof Error ? error.message : undefined;

    openPopup('error', {
      title: tErrors('password-update-error-title'),
      text: getErrorTextTranslation(tErrors, code),
    });
  };

  const { run, loading } = useRequest(updatePassword, {
    preventParallel: true,
    onError: handleError,
  });

  const onSubmit = async (data: PasswordUpdateFormData) => {
    try {
      await run(data);
      openPopup('message', {
        freeze: true,
        image: '/img/lex/success.webp',
        title: tProfile('password-updated-title'),
        text: tProfile('password-updated-text'),
        buttonText: tProfile('updated-btn'),
      });
      await update();
      form.reset(initialValues);
    } catch {}
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
            <Input
              type="password"
              name="oldpassword"
              placeholder={tForms('oldpassword-placeholder')}
              disabled={!hasPassword}
            />
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
