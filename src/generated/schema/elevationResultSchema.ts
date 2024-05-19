import { z } from 'zod';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const elevationResultSchema = z.object({
    elevation: z.number().describe('The elevation of the location in meters.'),
    resolution: z
        .number()
        .describe(
            'The value indicating the maximum distance between data points from which the elevation was interpolated, in meters. This property will be missing if the resolution is not known. Note that elevation data becomes more coarse (larger resolution values) when multiple points are passed. To obtain the most accurate elevation value for a point, it should be queried independently.'
        )
        .optional(),
    location: z.lazy(() => latLngLiteralSchema),
});
