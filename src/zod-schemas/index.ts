import { z } from 'zod';

const name = z
  .string()
  .optional()
  .refine(val => !val || (val.length >= 2 && !/\d/.test(val)), {
    message: 'name-invalid',
  });

const email = z.string().min(1, 'email-required').email('email-invalid');

const password = z
  .string()
  .min(6, 'password-minLength')
  .regex(/[A-Z]/, 'password-uppercase')
  .regex(/[a-z]/, 'password-lowercase')
  .regex(/[0-9]/, 'password-number');

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

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
