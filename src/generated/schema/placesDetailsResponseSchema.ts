import { z } from 'zod';
import { placeSchema } from './placeSchema';
import { placesDetailsStatusSchema } from './placesDetailsStatusSchema';

export const placesDetailsResponseSchema = z.object({
    html_attributions: z
        .array(z.string())
        .describe(
            'May contain a set of attributions about this listing which must be displayed to the user (some listings may not have attribution).'
        ),
    result: z.lazy(() => placeSchema).describe('Contains the detailed information about the place requested.'),
    status: z
        .lazy(() => placesDetailsStatusSchema)
        .describe(
            'Contains the status of the request, and may contain debugging information to help you track down why the request failed.'
        ),
    info_messages: z
        .array(z.string())
        .describe(
            'When the service returns additional information about the request specification, there may be an additional `info_messages` field within the response object. This field is only returned for successful requests. It may not always be returned, and its content is subject to change.\n'
        )
        .optional(),
});
