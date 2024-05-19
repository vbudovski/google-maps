import { z } from 'zod';
import { distanceMatrixRowSchema } from './distanceMatrixRowSchema';
import { distanceMatrixStatusSchema } from './distanceMatrixStatusSchema';

export const distanceMatrixResponseSchema = z.object({
    origin_addresses: z
        .array(z.string())
        .describe(
            'An array of addresses as returned by the API from your original request. These are formatted by the geocoder and localized according to the language parameter passed with the request. This content is meant to be read as-is. Do not programatically parse the formatted addresses.'
        ),
    destination_addresses: z
        .array(z.string())
        .describe(
            'An array of addresses as returned by the API from your original request. As with `origin_addresses`, these are localized if appropriate. This content is meant to be read as-is. Do not programatically parse the formatted addresses.'
        ),
    rows: z
        .array(z.lazy(() => distanceMatrixRowSchema))
        .describe('An array of elements, which in turn each contain a `status`, `duration`, and `distance` element.'),
    status: z.lazy(() => distanceMatrixStatusSchema),
    error_message: z
        .string()
        .describe(
            'A string containing the human-readable text of any errors encountered while the request was being processed.'
        )
        .optional(),
});
