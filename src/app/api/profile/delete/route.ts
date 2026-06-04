import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/shared/lib/helpers/getCurrentUser';

const ACCOUNT_DELETE_DELAY_MS = 5 * 60 * 1000;

export async function PATCH() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser.ok) {
      return currentUser.response;
    }

    const { user } = currentUser;

    user.status = 'deleted';
    user.deletedAt = new Date(Date.now() + ACCOUNT_DELETE_DELAY_MS);
    await user.save();

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json({ error: 'default-popup-error-text' }, { status: 500 });
  }
}
