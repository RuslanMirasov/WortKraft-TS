import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: 'free' | 'pro' | 'admin';
      status?: string;
      language?: string;
      subscriptionUntil?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      hasRequiredConsents?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: 'free' | 'pro' | 'admin';
    status: string;
    language: string;
    hasRequiredConsents?: boolean;
    subscriptionUntil: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub?: string;
    role?: 'free' | 'pro' | 'admin';
    status?: string;
    language?: string;
    subscriptionUntil?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    hasRequiredConsents?: boolean;
  }
}
