import { z } from 'zod';

const name = z
  .string()
  .optional()
  .refine(val => !val || (val.length >= 2 && !/\d/.test(val)), {
    message: 'Имя должно содержать минимум 2 буквы и не содержать цифр',
  });

const email = z.string().min(1, 'Email обязателен').email('Некорректный email');

const password = z
  .string()
  .min(6, 'Пароль должен содержать минимум 6 символов')
  .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
  .regex(/[a-z]/, 'Пароль должен содержать строчную букву')
  .regex(/[0-9]/, 'Пароль должен содержать цифру');

const language = z.string().min(1, 'Язык обязателен');
const subject = z.string().optional();
const agree = z.boolean().refine(value => value === true, {
  message: 'Необходимо согласие с условиями использования',
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
  agree,
});

export const passwordSchema = z.object({
  subject,
  email,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
