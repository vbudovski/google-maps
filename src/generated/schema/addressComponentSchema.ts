import { z } from 'zod';

export const addressComponentSchema = z.object({
    long_name: z
        .string()
        .describe('The full text description or name of the address component as returned by the Geocoder.'),
    short_name: z
        .string()
        .describe(
            'An abbreviated textual name for the address component, if available. For example, an address component for the state of Alaska may have a long_name of "Alaska" and a short_name of "AK" using the 2-letter postal abbreviation.'
        ),
    types: z
        .array(z.string())
        .describe(
            'An array indicating the type of the address component. See the list of [supported types](https://developers.google.com/maps/documentation/places/web-service/supported_types).'
        ),
});
