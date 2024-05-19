import { z } from 'zod';
import { latLngArrayStringSchema } from './latLngArrayStringSchema';
import { snapToRoadsResponseSchema } from './snapToRoadsResponseSchema';

export const snapToRoadsQueryParamsSchema = z.object({
    path: z.lazy(() => latLngArrayStringSchema),
    interpolate: z
        .boolean()
        .describe(
            'Whether to interpolate a path to include all points forming the full road-geometry. When true, additional interpolated points will also be returned, resulting in a path that smoothly follows the geometry of the road, even around corners and through tunnels. Interpolated paths will most likely contain more points than the original path. Defaults to `false`.\n'
        )
        .optional(),
});
/**
 * @description 200 OK
 */
export const snapToRoads200Schema = z.lazy(() => snapToRoadsResponseSchema);
/**
 * @description 200 OK
 */
export const snapToRoadsQueryResponseSchema = z.lazy(() => snapToRoadsResponseSchema);
