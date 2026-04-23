type deleteAccountResponse = {
  ok: true;
};

export async function deleteAccount(): Promise<deleteAccountResponse> {
  const res = await fetch('/api/profile/delete', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body?.error || 'ProfileDeleteFailed');
  }

  return body;
}
