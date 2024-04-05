import { z } from 'zod';
import { placeSchema } from './placeSchema';
import { placesSearchStatusSchema } from './placesSearchStatusSchema';

export const placesFindPlaceFromTextResponseSchema = z.object({
    candidates: z
        .array(z.lazy(() => placeSchema))
        .describe(
            'Contains an array of Place candidates.\n<div class="caution">Place Search requests return a subset of the fields that are returned by Place Details requests. If the field you want is not returned by Place Search, you can use Place Search to get a place_id, then use that Place ID to make a Place Details request.</div>\n'
        ),
    status: z
        .lazy(() => placesSearchStatusSchema)
        .describe(
            'Contains the status of the request, and may contain debugging information to help you track down why the request failed.'
        ),
    error_message: z
        .string()
        .describe(
            'When the service returns a status code other than `OK<`, there may be an additional `error_message` field within the response object. This field contains more detailed information about thereasons behind the given status code. This field is not always returned, and its content is subject to change.\n'
        )
        .optional(),
    info_messages: z
        .array(z.string())
        .describe(
            'When the service returns additional information about the request specification, there may be an additional `info_messages` field within the response object. This field is only returned for successful requests. It may not always be returned, and its content is subject to change.\n'
        )
        .optional(),
});
