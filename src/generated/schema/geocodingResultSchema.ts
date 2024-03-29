import { z } from 'zod';
import { addressComponentSchema } from './addressComponentSchema';
import { geocodingGeometrySchema } from './geocodingGeometrySchema';
import { plusCodeSchema } from './plusCodeSchema';

export const geocodingResultSchema = z.object({
    address_components: z
        .array(z.lazy(() => addressComponentSchema))
        .describe('An array containing the separate components applicable to this address.'),
    formatted_address: z.string().describe('The human-readable address of this location.'),
    geometry: z.lazy(() => geocodingGeometrySchema),
    place_id: z
        .string()
        .describe(
            'A unique identifier that can be used with other Google APIs. For example, you can use the `place_id` in a Places API request to get details of a local business, such as phone number, opening hours, user reviews, and more. See the [place ID overview](https://developers.google.com/places/place-id).'
        ),
    plus_code: z.lazy(() => plusCodeSchema).optional(),
    types: z
        .array(z.string())
        .describe(
            'The `types[]` array indicates the type of the returned result. This array contains a set of zero or more tags identifying the type of feature returned in the result. For example, a geocode of "Chicago" returns "locality" which indicates that "Chicago" is a city, and also returns "political" which indicates it is a political entity.'
        ),
    postcode_localities: z
        .array(z.string())
        .describe(
            'An array denoting all the localities contained in a postal code. This is only present when the result is a postal code that contains multiple localities.'
        )
        .optional(),
    partial_match: z
        .boolean()
        .describe(
            'Indicates that the geocoder did not return an exact match for the original request, though it was able to match part of the requested address. You may wish to examine the original request for misspellings and/or an incomplete address.\n\nPartial matches most often occur for street addresses that do not exist within the locality you pass in the request. Partial matches may also be returned when a request matches two or more locations in the same locality.\n'
        )
        .optional(),
});
