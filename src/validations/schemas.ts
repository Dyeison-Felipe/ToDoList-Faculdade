import { z } from 'zod';

const requiredCommonField = (requiredMessage: string) =>
  z.string({ required_error: requiredMessage }).trim().min(1, requiredMessage);

export const addTodoSchema = z.object({
  title: requiredCommonField('O título é obrigatório.'),
  description: requiredCommonField('A descrição é obrigatória.'),
});
