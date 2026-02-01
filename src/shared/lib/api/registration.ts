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

  if (!res.ok) {
    let errorCode = 'RegistrationFailed';

    try {
      const body = await res.json();
      if (body?.error) {
        errorCode = body.error;
      }
    } catch {}

    throw new Error(errorCode);
  }

  return { ok: true };
}
