import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/shared/lib/helpers/getCurrentUser';

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser.ok) {
      return currentUser.response;
    }

    const { id } = currentUser.user;

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json({ error: 'default-popup-error-text' }, { status: 500 });
  }
}
