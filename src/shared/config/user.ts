export const USER_ROLES = ['free', 'pro', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const LANGUAGES = ['en', 'fr', 'ua', 'pl', 'it', 'es', 'tr', 'ru'] as const;
export type Language = (typeof LANGUAGES)[number];

export const USER_STATUS = ['pending', 'active', 'deleted'] as const;
export type UserStatus = (typeof USER_STATUS)[number];
