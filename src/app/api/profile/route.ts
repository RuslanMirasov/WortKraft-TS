import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/api/auth';
import { dbConnect } from '@/shared/lib/mongodb';
import { profileUpdateSchema } from '@/zod-schemas';
import UserModel from '@/shared/models/User';

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = profileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'FormValidationError' }, { status: 400 });
    }

    await dbConnect();

    const user = await UserModel.findById(session.user.id);

    if (!user || user.status === 'deleted') {
      return NextResponse.json({ error: 'UserNotFound' }, { status: 404 });
    }

    user.name = parsed.data.name ?? '';
    user.language = parsed.data.language;
    await user.save();

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json({ error: 'default-popup-error-text' }, { status: 500 });
  }
}
