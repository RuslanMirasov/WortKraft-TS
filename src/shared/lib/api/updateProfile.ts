import { ProfileUpdateFormData } from '@/zod-schemas';

type UpdateProfileResponse = {
  ok: true;
};

export async function updateProfile(data: ProfileUpdateFormData): Promise<UpdateProfileResponse> {
  const res = await fetch('/api/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body?.error || 'ProfileUpdateFailed');
  }

  return body;
}
