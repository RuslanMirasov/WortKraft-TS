import { PasswordUpdateFormData } from '@/zod-schemas';

type updatePasswordResponse = {
  ok: true;
};

export async function updatePassword(data: PasswordUpdateFormData): Promise<updatePasswordResponse> {
  const res = await fetch('/api/profile/password-update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body?.error || 'PasswordUpdateFailed');
  }

  return body;
}
