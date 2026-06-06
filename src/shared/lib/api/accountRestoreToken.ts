import crypto from 'crypto';

const RESTORE_TOKEN_TTL_MS = 5 * 60 * 1000;

type AccountRestoreTokenPayload = {
  userId: string;
  exp: number;
};

const getSecret = () => {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is required');
  }

  return process.env.NEXTAUTH_SECRET;
};

const encode = (value: string) => Buffer.from(value).toString('base64url');

const sign = (payload: string) => {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
};

export const createAccountRestoreToken = (userId: string) => {
  const payload: AccountRestoreTokenPayload = {
    userId,
    exp: Date.now() + RESTORE_TOKEN_TTL_MS,
  };

  const encodedPayload = encode(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
};

export const verifyAccountRestoreToken = (token?: string) => {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString()) as AccountRestoreTokenPayload;

  if (!payload.userId || payload.exp < Date.now()) {
    return null;
  }

  return payload;
};
