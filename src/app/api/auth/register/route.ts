import { buildInitialConsents } from '@/shared/lib/helpers/buildInitialConsents';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/shared/lib/mongodb';
import UserModel from '@/shared/models/User';
import AuthIdentityModel from '@/shared/models/AuthIdentity';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, language, privacy, terms } = body;

  if (!email || !password || !language) {
    return NextResponse.json({ error: 'RegisterValidationError' }, { status: 400 });
  }

  if (privacy !== true || terms !== true) {
    return NextResponse.json({ error: 'ConsentsRequired' }, { status: 400 });
  }

  await dbConnect();

  const normalizedEmail = email.toLowerCase().trim();

  const existing = await AuthIdentityModel.findOne({
    type: 'credentials',
    identifier: normalizedEmail,
  });

  if (existing) {
    return NextResponse.json({ error: 'UserAlreadyExists' }, { status: 409 });
  }

  const user = await UserModel.create({
    email: normalizedEmail,
    name: name ?? null,
    language,
    status: 'active',
    role: 'free',
    consents: buildInitialConsents(),
  });

  await AuthIdentityModel.create({
    userId: user._id,
    type: 'credentials',
    identifier: normalizedEmail,
    passwordHash: password,
    verifiedAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
