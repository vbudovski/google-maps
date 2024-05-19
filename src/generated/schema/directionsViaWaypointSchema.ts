import { z } from 'zod';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const directionsViaWaypointSchema = z.object({
    location: z.lazy(() => latLngLiteralSchema).optional(),
    step_index: z.number().describe('The index of the step containing the waypoint.').optional(),
    step_interpolation: z
        .number()
        .describe("The position of the waypoint along the step's polyline, expressed as a ratio from 0 to 1.")
        .optional(),
});
