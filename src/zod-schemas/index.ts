import { z } from 'zod';

const name = z
  .string()
  .optional()
  .refine(val => !val || (val.length >= 2 && !/\d/.test(val)), {
    message: 'name-invalid',
  });

const email = z.string().min(1, 'email-required').email('email-invalid');

const passwordRules = z
  .string()
  .min(6, 'password-minLength')
  .regex(/^[^\u0400-\u04FF]*$/, 'password-no-cyrillic')
  .regex(/[A-Z]/, 'password-uppercase')
  .regex(/[a-z]/, 'password-lowercase')
  .regex(/[0-9]/, 'password-number');

const password = passwordRules;

const oldpassword = z.union([z.literal(''), passwordRules]);

const newpassword = passwordRules;

const newpasswordconfirm = passwordRules;

const language = z.string().min(1, 'language-required');

const subject = z.string().optional();

const privacy = z.boolean().refine(value => value === true, {
  message: 'privacy-required',
});

const terms = z.boolean().refine(value => value === true, {
  message: 'terms-required',
});

export const loginSchema = z.object({
  email,
  password,
});

export const registrationSchema = z.object({
  name,
  language,
  email,
  password,
  privacy,
  terms,
});

export const passwordSchema = z.object({
  subject,
  email,
});

export const onboardingSchema = z.object({
  language,
  privacy,
  terms,
});

export const profileUpdateSchema = z.object({
  name,
  email,
  language,
});

export const passwordUpdateSchema = z
  .object({
    oldpassword,
    newpassword,
    newpasswordconfirm,
  })
  .superRefine((data, ctx) => {
    if (data.newpassword === data.newpasswordconfirm) return;

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'passwords-must-match',
      path: ['newpassword'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'passwords-must-match',
      path: ['newpasswordconfirm'],
    });
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type PasswordUpdateFormData = z.infer<typeof passwordUpdateSchema>;
