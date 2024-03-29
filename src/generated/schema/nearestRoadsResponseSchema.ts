import { z } from 'zod';
import { snappedPointSchema } from './snappedPointSchema';

export const nearestRoadsResponseSchema = z.object({
    snappedPoints: z
        .array(z.lazy(() => snappedPointSchema))
        .describe(
            'An array of snapped points. Sometimes containing several snapped points for the same point with differing placeId or location.'
        )
        .optional(),
});
