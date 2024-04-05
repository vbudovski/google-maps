import { z } from 'zod';
import { snappedPointSchema } from './snappedPointSchema';

export const snapToRoadsResponseSchema = z.object({
    snappedPoints: z
        .array(z.lazy(() => snappedPointSchema))
        .describe('An array of snapped points.')
        .optional(),
    warningMessage: z.string().describe('A string containing a user-visible warning.').optional(),
});
