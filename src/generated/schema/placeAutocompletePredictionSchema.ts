import { z } from 'zod';
import { placeAutocompleteMatchedSubstringSchema } from './placeAutocompleteMatchedSubstringSchema';
import { placeAutocompleteStructuredFormatSchema } from './placeAutocompleteStructuredFormatSchema';
import { placeAutocompleteTermSchema } from './placeAutocompleteTermSchema';

export const placeAutocompletePredictionSchema = z.object({
    description: z
        .string()
        .describe(
            'Contains the human-readable name for the returned result. For `establishment` results, this is usually the business name. This content is meant to be read as-is. Do not programmatically parse the formatted address.'
        ),
    matched_substrings: z
        .array(z.lazy(() => placeAutocompleteMatchedSubstringSchema))
        .describe(
            'A list of substrings that describe the location of the entered term in the prediction result text, so that the term can be highlighted if desired.'
        ),
    place_id: z
        .string()
        .describe(
            'A textual identifier that uniquely identifies a place. To retrieve information about the place, pass this identifier in the placeId field of a Places API request. For more information about place IDs, see the [Place IDs](https://developers.google.com/maps/documentation/places/web-service/place-id) overview.'
        )
        .optional(),
    reference: z.string().describe('See place_id.').optional(),
    structured_formatting: z
        .lazy(() => placeAutocompleteStructuredFormatSchema)
        .describe(
            'Provides pre-formatted text that can be shown in your autocomplete results. This content is meant to be read as-is. Do not programmatically parse the formatted address.'
        ),
    terms: z
        .array(z.lazy(() => placeAutocompleteTermSchema))
        .describe(
            'Contains an array of terms identifying each section of the returned description (a section of the description is generally terminated with a comma). Each entry in the array has a `value` field, containing the text of the term, and an `offset` field, defining the start position of this term in the description, measured in Unicode characters.'
        ),
    types: z
        .array(z.string())
        .describe(
            'Contains an array of types that apply to this place. For example: `[ "political", "locality" ]` or `[ "establishment", "geocode", "beauty_salon" ]`. The array can contain multiple values. Learn more about [Place types](https://developers.google.com/maps/documentation/places/web-service/supported_types).\n'
        )
        .optional(),
    distance_meters: z
        .number()
        .describe(
            'The straight-line distance in meters from the origin. This field is only returned for requests made with an `origin`.'
        )
        .optional(),
});
