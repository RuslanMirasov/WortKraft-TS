import { buildInitialConsents } from '@/shared/lib/helpers/buildInitialConsents';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/api/auth';
import { onboardingSchema } from '@/zod-schemas';
import { dbConnect } from '@/shared/lib/mongodb';
import UserModel from '@/shared/models/User';

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = onboardingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'OnboardingValidationError' }, { status: 400 });
    }

    await dbConnect();

    const user = await UserModel.findById(session.user.id);

    if (!user || user.status === 'deleted') {
      return NextResponse.json({ error: 'UserNotFound' }, { status: 404 });
    }

    if (user.status !== 'pending') {
      return NextResponse.json({ error: 'OnboardingValidationError' }, { status: 400 });
    }

    user.language = parsed.data.language;
    user.status = 'active';
    user.consents = buildInitialConsents();

    await user.save();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'default-popup-error-text' }, { status: 500 });
  }
}
