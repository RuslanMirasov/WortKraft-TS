import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { dbConnect } from '@/shared/lib/mongodb';
import UserModel from '@/shared/models/User';
import AuthIdentityModel from '@/shared/models/AuthIdentity';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();

        const email = credentials.email.toLowerCase().trim();

        const identity = await AuthIdentityModel.findOne({
          type: 'credentials',
          identifier: email,
          revokedAt: null,
        }).select('+passwordHash');

        if (!identity) return null;

        const isValid = await identity.comparePassword(credentials.password);
        if (!isValid) return null;

        const user = await UserModel.findById(identity.userId);
        if (!user || user.status === 'deleted') return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      const userId = token.userId as string | undefined;
      if (!userId) return session;

      await dbConnect();

      const user = await UserModel.findById(userId);

      if (!user || user.status === 'deleted') {
        session.user = undefined as any;
        return session;
      }

      const subscriptionUntilIso = user.subscriptionUntil ? user.subscriptionUntil.toISOString() : null;

      if (session.user) {
        session.user.id = user._id.toString();
        session.user.email = user.email ?? null;
        session.user.name = user.name ?? null;
        session.user.image = user.image ?? null;
        session.user.role = user.role;
        session.user.status = user.status;
        session.user.language = user.language;
        session.user.subscriptionUntil = subscriptionUntilIso;
        session.user.isPro = user.isPro();
        session.user.hasRequiredConsents = user.hasRequiredConsents();
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
