import { z } from 'zod';
import { latLngArrayStringSchema } from './latLngArrayStringSchema';
import { snapToRoadsResponseSchema } from './snapToRoadsResponseSchema';

export const snapToRoadsQueryParamsSchema = z.object({
    path: z
        .lazy(() => latLngArrayStringSchema)
        .describe(
            'The path to be snapped. The path parameter accepts a list of latitude/longitude pairs. Latitude and longitude values should be separated by commas. Coordinates should be separated by the pipe character: "|". For example: `path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796`.\n<div class="note">Note: The snapping algorithm works best for points that are not too far apart. If you observe odd snapping behavior, try creating paths that have points closer together. To ensure the best snap-to-road quality, you should aim to provide paths on which consecutive pairs of points are within 300m of each other. This will also help in handling any isolated, long jumps between consecutive points caused by GPS signal loss, or noise.</div>\n'
        ),
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
