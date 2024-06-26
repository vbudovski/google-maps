import { z } from 'zod';
import { errorObjectSchema } from './errorObjectSchema';

/**
 * @description In the case of an error, a standard format error response body will be returned and the HTTP status code will be set to an error status. The response contains an object with a single error object.
 */
export const errorResponseSchema = z
    .object({ error: z.lazy(() => errorObjectSchema) })
    .describe(
        'In the case of an error, a standard format error response body will be returned and the HTTP status code will be set to an error status. The response contains an object with a single error object.'
    );
