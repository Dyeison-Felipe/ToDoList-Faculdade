import { addTodoSchema } from '@/validations/schemas';
import { z } from 'zod';

export type AddTodoFormData = z.infer<typeof addTodoSchema>;

export type Todo = {
  id: string;
  title: string;
  description: string;
  finished: boolean;
  userId: string;
};
