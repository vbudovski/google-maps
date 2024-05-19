import { z } from 'zod';
import { geocodingResultSchema } from './geocodingResultSchema';
import { geocodingStatusSchema } from './geocodingStatusSchema';
import { plusCodeSchema } from './plusCodeSchema';

export const geocodingResponseSchema = z.object({
    plus_code: z.lazy(() => plusCodeSchema).optional(),
    results: z.array(z.lazy(() => geocodingResultSchema)),
    status: z.lazy(() => geocodingStatusSchema),
    error_message: z.string().describe('A short description of the error.').optional(),
});
