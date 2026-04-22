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

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body?.error || 'OnboardingFailed');
  }

  return body;
}
