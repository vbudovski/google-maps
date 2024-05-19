import { z } from 'zod';
import { elevationStatusSchema } from './elevationStatusSchema';
import { latLngArrayStringSchema } from './latLngArrayStringSchema';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const elevationQueryParamsSchema = z
    .object({
        locations: z.lazy(() => latLngArrayStringSchema).optional(),
        path: z.lazy(() => latLngArrayStringSchema).optional(),
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
