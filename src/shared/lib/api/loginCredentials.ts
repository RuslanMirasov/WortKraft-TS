import { signIn } from 'next-auth/react';
import { LoginFormData } from '@/zod-schemas';

export async function loginCredentials(data: LoginFormData, callbackUrl?: string) {
  await signIn('credentials', {
    email: data.email,
    password: data.password,
    callbackUrl: callbackUrl ?? '/',
  });
  // const result = await signIn('credentials', {
  //   redirect: false,
  //   ...data,
  // });

  // if (!result) {
  //   throw new Error('Configuration');
  // }

  // if (result.error) {
  //   throw new Error(result.error);
  // }

  // return result;
}
