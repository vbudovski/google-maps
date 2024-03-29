import { z } from 'zod';
import { latitudeLongitudeLiteralSchema } from './latitudeLongitudeLiteralSchema';

export const snappedPointSchema = z.object({
    location: z.lazy(() => latitudeLongitudeLiteralSchema),
    originalIndex: z
        .number()
        .describe(
            "An integer that indicates the corresponding value in the original request. Each value in the request should map to a snapped value in the response. However, if you've set interpolate=true or if you're using nearest roads, then it's possible that the response will contain more coordinates than the request. Interpolated values will not have an `originalIndex`. These values are indexed from `0`, so a point with an originalIndex of `4` will be the snapped value of the 5th latitude/longitude passed to the path parameter. Nearest Roads points may contain several points for single coordinates with differing location or placeId."
        )
        .optional(),
    placeId: z
        .string()
        .describe(
            'A unique identifier for a place. All place IDs returned by the Roads API correspond to road segments.'
        ),
});
