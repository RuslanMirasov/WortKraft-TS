import mongoose, { Schema, type InferSchemaType } from 'mongoose';

export const USER_ROLES = ['free', 'pro', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const LANGUAGES = ['en', 'fr', 'ua', 'pl', 'it', 'es', 'tr', 'ru'] as const;
export type Language = (typeof LANGUAGES)[number];

export const USER_STATUS = ['pending', 'active', 'deleted'] as const;
export type UserStatus = (typeof USER_STATUS)[number];

const UserSchema = new Schema(
  {
    status: {
      type: String,
      enum: USER_STATUS,
      default: 'pending',
      index: true,
    },

    name: {
      type: String,
      trim: true,
      maxlength: 100,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
      index: true,
    },

    language: {
      type: String,
      enum: LANGUAGES,
      required: true,
    },

    role: {
      type: String,
      enum: USER_ROLES,
      default: 'free',
    },

    subscriptionUntil: {
      type: Date,
      default: null,
    },

    consents: {
      terms: {
        acceptedAt: {
          type: Date,
          default: null,
        },
        version: {
          type: String,
          default: null,
        },
      },

      privacy: {
        acceptedAt: {
          type: Date,
          default: null,
        },
        version: {
          type: String,
          default: null,
        },
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.isPro = function (): boolean {
  return this.role === 'pro' && !!this.subscriptionUntil && this.subscriptionUntil > new Date();
};

UserSchema.methods.hasRequiredConsents = function (): boolean {
  return !!(this.consents?.terms?.acceptedAt && this.consents?.privacy?.acceptedAt);
};

UserSchema.methods.toPublicJSON = function () {
  return {
    id: this._id.toString(),
    name: this.name,
    image: this.image,
    email: this.email,
    language: this.language,
    role: this.role,
    status: this.status,
    isPro: this.isPro(),
  };
};

export type User = InferSchemaType<typeof UserSchema>;

const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
