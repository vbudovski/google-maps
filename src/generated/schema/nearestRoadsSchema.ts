import { z } from 'zod';
import { latLngArrayStringSchema } from './latLngArrayStringSchema';
import { nearestRoadsErrorResponseSchema } from './nearestRoadsErrorResponseSchema';
import { nearestRoadsResponseSchema } from './nearestRoadsResponseSchema';

export const nearestRoadsQueryParamsSchema = z.object({
    points: z
        .lazy(() => latLngArrayStringSchema)
        .describe(
            'The points to be snapped. The points parameter accepts a list of latitude/longitude pairs. Separate latitude and longitude values with commas. Separate coordinates with the pipe character: "|". For example: `points=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796`.\n'
        ),
});

/**
 * @description 200 OK
 */
export const nearestRoads200Schema = z.lazy(() => nearestRoadsResponseSchema);

/**
 * @description 400 BAD REQUEST
 */
export const nearestRoads400Schema = z.lazy(() => nearestRoadsErrorResponseSchema);

/**
 * @description 200 OK
 */
export const nearestRoadsQueryResponseSchema = z.lazy(() => nearestRoadsResponseSchema);
