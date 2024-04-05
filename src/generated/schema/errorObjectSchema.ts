import { z } from 'zod';
import { errorDetailSchema } from './errorDetailSchema';

export const errorObjectSchema = z.object({
    code: z.number().describe('This is the same as the HTTP status of the response.'),
    message: z.string().describe('A short description of the error.'),
    errors: z
        .array(z.lazy(() => errorDetailSchema))
        .describe(
            'A list of errors which occurred. Each error contains an identifier for the type of error and a short description.'
        ),
    status: z.string().describe('A status code that indicates the error type.').optional(),
    details: z
        .array(z.lazy(() => errorDetailSchema))
        .describe('Additional details about the error.')
        .optional(),
});
