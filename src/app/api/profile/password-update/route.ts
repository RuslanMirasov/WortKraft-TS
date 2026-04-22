import { NextResponse } from 'next/server';
import { passwordUpdateSchema } from '@/zod-schemas';
import { getCurrentUser } from '@/shared/lib/helpers/getCurrentUser';
import AuthIdentityModel from '@/shared/models/AuthIdentity';

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

    const credentialsIdentity = await AuthIdentityModel.findOne({
      userId: user._id,
      type: 'credentials',
      revokedAt: null,
    }).select('+passwordHash');

    if (credentialsIdentity) {
      if (!parsed.data.oldpassword) {
        return NextResponse.json({ error: 'OldPasswordRequired' }, { status: 400 });
      }

      const isValidOldPassword = await credentialsIdentity.comparePassword(parsed.data.oldpassword);

      if (!isValidOldPassword) {
        return NextResponse.json({ error: 'InvalidOldPassword' }, { status: 400 });
      }

      credentialsIdentity.passwordHash = parsed.data.newpassword;
      credentialsIdentity.verifiedAt = credentialsIdentity.verifiedAt ?? new Date();
      await credentialsIdentity.save();
    } else {
      await AuthIdentityModel.create({
        userId: user._id,
        type: 'credentials',
        identifier: user.email,
        passwordHash: parsed.data.newpassword,
        verifiedAt: new Date(),
      });
    }

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json({ error: 'default-popup-error-text' }, { status: 500 });
  }
}
