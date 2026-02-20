import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/api/auth';
import { dbConnect } from '@/shared/lib/mongodb';
import UserModel from '@/shared/models/User';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const user = await UserModel.findById(session.user.id);

  if (!user || user?.status === 'deleted') {
    return NextResponse.json({ error: 'UserNotFound' }, { status: 404 });
  }

  return NextResponse.json({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role,
    language: user.language,
    subscriptionUntil: user.subscriptionUntil?.toISOString() ?? null,
    hasRequiredConsents: user.hasRequiredConsents(),
  });
}
