import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/shared/lib/helpers/getCurrentUser';

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser.ok) {
    return currentUser.response;
  }

  const { user } = currentUser;

  return NextResponse.json({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role,
    language: user.language,
    subscriptionUntil: user.subscriptionUntil?.toISOString() ?? null,
  });
}
