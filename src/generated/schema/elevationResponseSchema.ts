import { z } from 'zod';
import { elevationResultSchema } from './elevationResultSchema';
import { elevationStatusSchema } from './elevationStatusSchema';

export const elevationResponseSchema = z.object({
    error_message: z
        .string()
        .describe(
            'When the service returns a status code other than `OK`, there may be an additional `error_message` field within the response object. This field contains more detailed information about thereasons behind the given status code. This field is not always returned, and its content is subject to change.\n'
        )
        .optional(),
    status: z.lazy(() => elevationStatusSchema),
    results: z.array(z.lazy(() => elevationResultSchema)),
});
