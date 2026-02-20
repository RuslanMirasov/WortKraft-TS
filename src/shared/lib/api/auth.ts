import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { getClientIp, rateLimitLogin, clearLoginRateLimit } from '@/shared/lib/api';
import { dbConnect } from '@/shared/lib/mongodb';
import UserModel from '@/shared/models/User';
import AuthIdentityModel from '@/shared/models/AuthIdentity';

type GoogleProfile = {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toLowerCase().trim();
        const ip = getClientIp(req);
        const key = `${ip}:${email}`;

        await dbConnect();

        const rl = await rateLimitLogin(key);
        if (!rl.ok) {
          throw new Error('TooManyLoginAttempts');
        }

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

        await clearLoginRateLimit(key);

        return {
          id: user._id.toString(),
          status: user.status,
          role: user.role,
          name: user.name,
          email: user.email,
          image: user.image,
          language: user.language,
          subscriptionUntil: user.subscriptionUntil,
        };
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== 'google') return true;

      const gp = profile as GoogleProfile | undefined;
      const googleSub = gp?.sub;
      const email = gp?.email?.toLowerCase().trim();

      if (!googleSub || !email) return false;

      await dbConnect();

      let identity = await AuthIdentityModel.findOne({
        type: 'google',
        identifier: googleSub,
        revokedAt: null,
      });

      let dbUser;

      if (identity) {
        dbUser = await UserModel.findById(identity.userId);
        if (!dbUser || dbUser.status === 'deleted') return false;
      } else {
        dbUser = await UserModel.findOne({ email });

        if (!dbUser) {
          dbUser = await UserModel.create({
            email,
            name: gp?.name ?? null,
            image: gp?.picture ?? null,
            status: 'pending',
            role: 'free',
          });
        } else {
          const update: Partial<{ name: string; image: string }> = {};
          if (!dbUser.name && gp?.name) update.name = gp.name;
          if (!dbUser.image && gp?.picture) update.image = gp.picture;

          if (Object.keys(update).length > 0) {
            await UserModel.updateOne({ _id: dbUser._id }, update);
            dbUser = await UserModel.findById(dbUser._id);
          }
        }

        await AuthIdentityModel.create({
          userId: dbUser!._id,
          type: 'google',
          identifier: googleSub,
          verifiedAt: new Date(),
        });
      }

      user.id = dbUser!._id.toString();
      user.status = dbUser!.status;
      user.role = dbUser!.role;
      user.name = dbUser!.name;
      user.email = dbUser!.email;
      user.image = dbUser!.image;
      user.language = dbUser!.language;
      user.subscriptionUntil = dbUser!.subscriptionUntil;

      return true;
    },

    async jwt({ token, user, trigger }) {
      if (user) {
        token.sub = user.id;
        token.status = user.status;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.language = user.language;
        token.subscriptionUntil = user.subscriptionUntil;
      }

      if (trigger === 'update' && token.sub) {
        await dbConnect();
        const dbUser = await UserModel.findById(token.sub);

        if (dbUser) {
          token.status = dbUser.status;
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.language = dbUser.language;
          token.subscriptionUntil = dbUser.subscriptionUntil;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (!token?.sub) return session;

      session.user = {
        id: token.sub,
        status: token.status,
        role: token.role,
        name: token.name,
        email: token.email,
        image: token.image,
        language: token.language,
        subscriptionUntil: token.subscriptionUntil,
      };

      return session;
    },
  },
};
