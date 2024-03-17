import { z } from 'zod';

export const todoFormSchema = z.object({
  content: z.string().min(1, { message: "Content can't be empty" }).max(2_000),
});

export type TodoFormSchema = z.infer<typeof todoFormSchema>;

export const defaultFormValues: TodoFormSchema = {
  content: '',
};
