import { OnboardingFormData } from '@/zod-schemas';

type OnboardingResponse = {
  ok: true;
};

export async function onboarding(data: OnboardingFormData): Promise<OnboardingResponse> {
  const res = await fetch('/api/auth/onboarding', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorCode = 'OnboardingFailed';

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
