import { RegistrationFormData } from '@/zod-schemas';

type RegistrationResponse = {
  ok: true;
};

export async function registration(data: RegistrationFormData): Promise<RegistrationResponse> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body?.error || 'RegistrationFailed');
  }

  return body;
}
