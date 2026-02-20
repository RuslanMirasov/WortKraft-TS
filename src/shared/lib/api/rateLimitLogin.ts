import { AUTH_SECURITY } from '@/shared/config/security';
import AuthRateLimitModel, { type AuthRateLimit } from '@/shared/models/AuthRateLimit';

export type RateLimitResult = { ok: true } | { ok: false; retryAfterMs: number };

type RateLimitOptions = {
  windowMs?: number;
  maxAttempts?: number;
  blockMs?: number;
};

export async function rateLimitLogin(key: string, opts?: RateLimitOptions): Promise<RateLimitResult> {
  const windowMs = opts?.windowMs ?? AUTH_SECURITY.windowMs;
  const maxAttempts = opts?.maxAttempts ?? AUTH_SECURITY.maxAttempts;
  const blockMs = opts?.blockMs ?? AUTH_SECURITY.blockMs;

  const now = new Date();

  const doc = await AuthRateLimitModel.findOneAndUpdate(
    { key },
    {
      $setOnInsert: {
        firstAttemptAt: now,
        blockedUntil: null,
      },
      $set: {
        updatedAt: now,
      },
      $inc: {
        count: 1,
      },
    },
    {
      upsert: true,
      new: true,
    }
  ).lean<AuthRateLimit>();

  if (!doc) {
    return { ok: true };
  }

  if (doc.blockedUntil && doc.blockedUntil.getTime() > now.getTime()) {
    return {
      ok: false,
      retryAfterMs: doc.blockedUntil.getTime() - now.getTime(),
    };
  }

  if (now.getTime() - doc.firstAttemptAt.getTime() > windowMs) {
    await AuthRateLimitModel.updateOne(
      { key },
      {
        $set: {
          firstAttemptAt: now,
          count: 1,
          blockedUntil: null,
          updatedAt: now,
        },
      }
    );
    return { ok: true };
  }

  if (doc.count > maxAttempts) {
    const blockedUntil = new Date(now.getTime() + blockMs);
    await AuthRateLimitModel.updateOne(
      { key },
      {
        $set: {
          blockedUntil,
          updatedAt: now,
        },
      }
    );

    return {
      ok: false,
      retryAfterMs: blockMs,
    };
  }

  return { ok: true };
}

export async function clearLoginRateLimit(key: string): Promise<void> {
  await AuthRateLimitModel.deleteOne({ key });
}
