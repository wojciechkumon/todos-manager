import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email can't be empty" })
    .max(254),

  password: z.string().max(250),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const defaultFormValues: LoginFormSchema = {
  email: '',
  password: '',
};
