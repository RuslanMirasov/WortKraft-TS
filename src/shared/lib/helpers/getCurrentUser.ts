import { NextResponse } from 'next/server';
import { getServerSession, type Session } from 'next-auth';
import { authOptions } from '@/shared/lib/api/auth';
import { dbConnect } from '@/shared/lib/mongodb';
import UserModel, { type User } from '@/shared/models/User';
import type { HydratedDocument } from 'mongoose';

type GetCurrentUserSuccess = {
  ok: true;
  session: Session;
  user: HydratedDocument<User>;
};

type GetCurrentUserError = {
  ok: false;
  response: NextResponse;
};

export type GetCurrentUserResult = GetCurrentUserSuccess | GetCurrentUserError;

export async function getCurrentUser(): Promise<GetCurrentUserResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  await dbConnect();

  const user = await UserModel.findById(session.user.id);

  if (!user || user.status === 'deleted') {
    return {
      ok: false,
      response: NextResponse.json({ error: 'UserNotFound' }, { status: 404 }),
    };
  }

  return {
    ok: true,
    session,
    user,
  };
}
