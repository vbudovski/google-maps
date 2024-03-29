import { z } from 'zod';

export const fieldViolationSchema = z.object({
    field: z.string().describe('The name of the invalid field.'),
    description: z.string().describe('A short description of the error.'),
});
