import { z } from 'zod';
import { placeAutocompletePredictionSchema } from './placeAutocompletePredictionSchema';
import { placesAutocompleteStatusSchema } from './placesAutocompleteStatusSchema';

export const placesQueryAutocompleteResponseSchema = z.object({
    predictions: z
        .array(z.lazy(() => placeAutocompletePredictionSchema))
        .describe('Contains an array of predictions.\n'),
    status: z.lazy(() => placesAutocompleteStatusSchema),
    error_message: z
        .string()
        .describe(
            'When the service returns a status code other than `OK`, there may be an additional `error_message` field within the response object. This field contains more detailed information about thereasons behind the given status code. This field is not always returned, and its content is subject to change.\n'
        )
        .optional(),
    info_messages: z
        .array(z.string())
        .describe(
            'When the service returns additional information about the request specification, there may be an additional `info_messages` field within the response object. This field is only returned for successful requests. It may not always be returned, and its content is subject to change.\n'
        )
        .optional(),
});
