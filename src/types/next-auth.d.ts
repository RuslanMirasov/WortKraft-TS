import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      status: string;
      language: string;
      isPro: boolean;
      subscriptionUntil: string | null;
      hasRequiredConsents: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: 'free' | 'pro' | 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
  }
}
