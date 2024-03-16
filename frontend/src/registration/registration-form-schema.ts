import { z } from 'zod';

export const hasLowerCase = (str: string): boolean => str.toUpperCase() != str;
export const hasUpperCase = (str: string): boolean => str.toLowerCase() != str;
export const hasSpecialCharacter = (str: string): boolean => {
  const specialCharacterRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return specialCharacterRegex.test(str);
};

export const registrationFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email can't be empty" })
    .max(254),

  password: z
    .string()
    .min(8, { message: 'Password minimal length is 8 characters' })
    .max(250)
    .refine(
      (pass) => hasLowerCase(pass),
      'Password must contain at least one lowercase letter',
    )
    .refine(
      (pass) => hasUpperCase(pass),
      'Password must contain at least one uppercase letter',
    )
    .refine(
      (pass) => hasSpecialCharacter(pass),
      'Password must contain at least one special character like `!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]',
    ),
});

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;

export const defaultFormValues: RegistrationFormSchema = {
  email: '',
  password: '',
};
