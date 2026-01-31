import { signIn } from 'next-auth/react';
import { LoginFormData } from '@/zod-schemas';

export async function loginCredentials(data: LoginFormData) {
  const result = await signIn('credentials', {
    redirect: false,
    ...data,
  });

  if (!result) {
    throw new Error('Configuration');
  }

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
}
