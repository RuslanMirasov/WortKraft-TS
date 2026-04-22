import { buildInitialConsents } from '@/shared/lib/helpers/buildInitialConsents';
import { NextResponse } from 'next/server';
import { onboardingSchema } from '@/zod-schemas';
import { getCurrentUser } from '@/shared/lib/helpers/getCurrentUser';

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser.ok) {
      return currentUser.response;
    }

    const { user } = currentUser;

    const body = await req.json();
    const parsed = onboardingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'OnboardingValidationError' }, { status: 400 });
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
