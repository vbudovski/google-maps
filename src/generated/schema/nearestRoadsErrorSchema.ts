import { z } from 'zod';

export const nearestRoadsErrorSchema = z.object({
    code: z.number().describe('This is the same as the HTTP status of the response.'),
    message: z.string().describe('A short description of the error.'),
    status: z.string().describe('An error such as `INVALID_ARGUMENT`.'),
});
