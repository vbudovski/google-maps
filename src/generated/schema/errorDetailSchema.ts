import { z } from 'zod';
import { fieldViolationSchema } from './fieldViolationSchema';

export const errorDetailSchema = z.object({
    '@type': z.string().describe('The type of error.').optional(),
    message: z.string().describe('A short description of the error.').optional(),
    reason: z.string().describe('A reason for the error.').optional(),
    domain: z.string().describe('The domain in which the error occurred.').optional(),
    metadata: z.object({}).describe('Additional metadata about the error.').optional(),
    fieldViolations: z
        .array(z.lazy(() => fieldViolationSchema))
        .describe('A list of field violations.')
        .optional(),
});
