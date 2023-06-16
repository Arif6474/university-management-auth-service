import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
