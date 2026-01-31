import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';

export const IDENTITY_TYPES = ['credentials', 'google'] as const;
export type IdentityType = (typeof IDENTITY_TYPES)[number];

const AuthIdentitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: IDENTITY_TYPES,
      required: true,
    },

    identifier: {
      type: String,
      required: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      select: false,
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    revokedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

AuthIdentitySchema.index({ type: 1, identifier: 1 }, { unique: true });

AuthIdentitySchema.pre('validate', function (next) {
  if (this.type === 'credentials' && typeof this.identifier === 'string') {
    this.identifier = this.identifier.toLowerCase().trim();
  }
  next();
});

AuthIdentitySchema.pre('save', async function (next) {
  if (this.type !== 'credentials') return next();
  if (!this.isModified('passwordHash') || !this.passwordHash) return next();

  try {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    next();
  } catch (err) {
    next(err as Error);
  }
});

AuthIdentitySchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  if (this.type !== 'credentials') return false;
  if (this.revokedAt) return false;
  if (!this.passwordHash) return false;
  return bcrypt.compare(candidate, this.passwordHash);
};

export type AuthIdentity = InferSchemaType<typeof AuthIdentitySchema>;

const AuthIdentityModel =
  mongoose.models.AuthIdentity || mongoose.model<AuthIdentity>('AuthIdentity', AuthIdentitySchema);

export default AuthIdentityModel;
