import mongoose, { Schema, type InferSchemaType, type Model, models } from 'mongoose';

const AuthRateLimitSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    firstAttemptAt: {
      type: Date,
      required: true,
    },

    count: {
      type: Number,
      required: true,
      default: 0,
    },

    blockedUntil: {
      type: Date,
      default: null,
    },

    updatedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

AuthRateLimitSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

export type AuthRateLimit = InferSchemaType<typeof AuthRateLimitSchema>;

const AuthRateLimitModel =
  (models.AuthRateLimit as Model<AuthRateLimit>) || mongoose.model<AuthRateLimit>('AuthRateLimit', AuthRateLimitSchema);

export default AuthRateLimitModel;
