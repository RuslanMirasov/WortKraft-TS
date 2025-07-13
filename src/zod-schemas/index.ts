import { z } from 'zod';

const nameValidator = z
  .string()
  .optional()
  .refine(val => !val || (val.length >= 2 && !/\d/.test(val)), {
    message: 'Имя должно содержать минимум 2 буквы и не содержать цифр',
  });

const emailValidator = z.string().min(1, 'Email обязателен').email('Некорректный email');

const passwordValidator = z
  .string()
  .min(8, 'Пароль должен содержать минимум 8 символов')
  .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
  .regex(/[a-z]/, 'Пароль должен содержать строчную букву')
  .regex(/[0-9]/, 'Пароль должен содержать цифру');

const languageValidator = z.string().min(1, 'Язык обязателен');
const subjectValidator = z.string().optional();

export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const registrationSchema = z.object({
  name: nameValidator,
  language: languageValidator,
  email: emailValidator,
  password: passwordValidator,
});

export const passwordSchema = z.object({
  subject: subjectValidator,
  email: emailValidator,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
