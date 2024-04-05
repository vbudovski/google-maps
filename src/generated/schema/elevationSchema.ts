import { z } from 'zod';
import { elevationStatusSchema } from './elevationStatusSchema';
import { latLngArrayStringSchema } from './latLngArrayStringSchema';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const elevationQueryParamsSchema = z
    .object({
        locations: z
            .lazy(() => latLngArrayStringSchema)
            .describe(
                'Positional requests are indicated through use of the locations parameter, indicating elevation requests for the specific locations passed as latitude/longitude values.\n\nThe locations parameter may take the following arguments:\n\n- A single coordinate: `locations=40.714728,-73.998672`\n- An array of coordinates separated using the pipe (\'|\') character: \n  ```\n  locations=40.714728,-73.998672|-34.397,150.644\n  ```\n- A set of encoded coordinates using the [Encoded Polyline Algorithm](https://developers.google.com/maps/documentation/utilities/polylinealgorithm): \n  ```\n  locations=enc:gfo}EtohhU\n  ```\n\nLatitude and longitude coordinate strings are defined using numerals within a comma-separated text string. For example, "40.714728,-73.998672" is a valid locations value. Latitude and longitude values must correspond to a valid location on the face of the earth. Latitudes can take any value between -90 and 90 while longitude values can take any value between -180 and 180. If you specify an invalid latitude or longitude value, your request will be rejected as a bad request.\n\nYou may pass any number of multiple coordinates within an array or encoded polyline, while still constructing a valid URL. Note that when passing multiple coordinates, the accuracy of any returned data may be of lower resolution than when requesting data for a single coordinate.\n'
            )
            .optional(),
        path: z
            .lazy(() => latLngArrayStringSchema)
            .describe('An array of comma separated `latitude,longitude` strings.')
            .optional(),
        samples: z.number().describe('Required if path parameter is set.').optional(),
    })
    .optional();

/**
 * @description 200 OK
 */
export const elevation200Schema = z.object({
    error_message: z
        .string()
        .describe(
            'When the service returns a status code other than `OK<`, there may be an additional `error_message` field within the response object. This field contains more detailed information about thereasons behind the given status code. This field is not always returned, and its content is subject to change.\n'
        )
        .optional(),
    status: z.lazy(() => elevationStatusSchema),
    results: z.array(
        z.object({
            elevation: z.number().optional(),
            resolution: z.number().optional(),
            location: z.lazy(() => latLngLiteralSchema).optional(),
        })
    ),
});

/**
 * @description 200 OK
 */
export const elevationQueryResponseSchema = z.object({
    error_message: z
        .string()
        .describe(
            'When the service returns a status code other than `OK<`, there may be an additional `error_message` field within the response object. This field contains more detailed information about thereasons behind the given status code. This field is not always returned, and its content is subject to change.\n'
        )
        .optional(),
    status: z.lazy(() => elevationStatusSchema),
    results: z.array(
        z.object({
            elevation: z.number().optional(),
            resolution: z.number().optional(),
            location: z.lazy(() => latLngLiteralSchema).optional(),
        })
    ),
});
