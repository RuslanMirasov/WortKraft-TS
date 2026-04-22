import { NextResponse } from 'next/server';
import { passwordUpdateSchema } from '@/zod-schemas';
import { getCurrentUser } from '@/shared/lib/helpers/getCurrentUser';

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser.ok) {
      return currentUser.response;
    }

    const { user } = currentUser;

    const body = await req.json();
    const parsed = passwordUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'FormValidationError' }, { status: 400 });
    }

    console.log(user);
    //  user.name = parsed.data.name ?? '';
    //  user.language = parsed.data.language;
    //  await user.save();

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json({ error: 'default-popup-error-text' }, { status: 500 });
  }
}
