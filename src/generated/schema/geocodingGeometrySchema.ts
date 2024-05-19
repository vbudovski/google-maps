import { z } from 'zod';
import { boundsSchema } from './boundsSchema';
import { latLngLiteralSchema } from './latLngLiteralSchema';

/**
 * @description An object describing the location.
 */
export const geocodingGeometrySchema = z
    .object({
        location: z.lazy(() => latLngLiteralSchema),
        location_type: z
            .enum(['ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'])
            .describe(
                'Stores additional data about the specified location. The following values are currently supported:\n\n- "ROOFTOP" indicates that the returned result is a precise geocode for which we have location information accurate down to street address precision.\n- "RANGE_INTERPOLATED" indicates that the returned result reflects an approximation (usually on a road) interpolated between two precise points (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.\n- "GEOMETRIC_CENTER" indicates that the returned result is the geometric center of a result such as a polyline (for example, a street) or polygon (region).\n- "APPROXIMATE" indicates that the returned result is approximate.\n'
            ),
        bounds: z.lazy(() => boundsSchema).optional(),
        viewport: z.lazy(() => boundsSchema),
    })
    .describe('An object describing the location.');
