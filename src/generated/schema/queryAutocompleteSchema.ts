import { z } from 'zod';
import { placesQueryAutocompleteResponseSchema } from './placesQueryAutocompleteResponseSchema';

export const queryAutocompleteQueryParamsSchema = z.object({
    input: z
        .string()
        .describe(
            'The text string on which to search. The Place Autocomplete service will return candidate matches based on this string and order results based on their perceived relevance.\n'
        ),
    offset: z
        .number()
        .describe(
            'The position, in the input term, of the last character that the service uses to match predictions. For example, if the input is `Google` and the offset is 3, the service will match on `Goo`. The string determined by the offset is matched against the first word in the input term only. For example, if the input term is `Google abc` and the offset is 3, the service will attempt to match against `Goo abc`. If no offset is supplied, the service will use the whole term. The offset should generally be set to the position of the text caret.\n'
        )
        .optional(),
    location: z
        .string()
        .describe(
            'The point around which to retrieve place information. This must be specified as `latitude,longitude`. \n\n<div class="note">The <code>location</code> parameter may be overriden if the <code>query</code> contains an explicit location such as <code>Market in Barcelona</code>. Using quotes around the query may also influence the weight given to the <code>location</code> and <code>radius</code>.</div>\n'
        )
        .optional(),
    radius: z
        .number()
        .describe(
            'Defines the distance (in meters) within which to return place results. You may bias results to a specified circle by passing a `location` and a `radius` parameter. Doing so instructs the Places service to _prefer_ showing results within that circle; results outside of the defined area may still be displayed.\n\nThe radius will automatically be clamped to a maximum value depending on the type of search and other parameters.\n\n* Autocomplete: 50,000 meters\n* Nearby Search: \n  * with `keyword` or `name`: 50,000 meters\n  * without `keyword` or `name`\n    * Up to 50,000 meters, adjusted dynamically based on area density, independent of `rankby` parameter.\n    * When using `rankby=distance`, the radius parameter will not be accepted, and will result in an `INVALID_REQUEST`.\n* Query Autocomplete: 50,000 meters\n* Text Search: 50,000 meters\n'
        ),
    language: z
        .enum([
            'ar',
            'bg',
            'bn',
            'ca',
            'cs',
            'da',
            'de',
            'el',
            'en',
            'en-AU',
            'en-GB',
            'es',
            'eu',
            'fa',
            'fi',
            'fil',
            'fr',
            'gl',
            'gu',
            'hi',
            'hr',
            'hu',
            'id',
            'it',
            'iw',
            'ja',
            'kn',
            'ko',
            'lt',
            'lv',
            'ml',
            'mr',
            'nl',
            'no',
            'pl',
            'pt',
            'pt-BR',
            'pt-PT',
            'ro',
            'ru',
            'sk',
            'sl',
            'sr',
            'sv',
            'ta',
            'te',
            'th',
            'tl',
            'tr',
            'uk',
            'vi',
            'zh-CN',
            'zh-TW',
        ])
        .default('en')
        .describe(
            'The language in which to return results.\n\n* See the [list of supported languages](https://developers.google.com/maps/faq#languagesupport). Google often updates the supported languages, so this list may not be exhaustive.\n* If `language` is not supplied, the API attempts to use the preferred language as specified in the `Accept-Language` header.\n* The API does its best to provide a street address that is readable for both the user and locals. To achieve that goal, it returns street addresses in the local language, transliterated to a script readable by the user if necessary, observing the preferred language. All other addresses are returned in the preferred language. Address components are all returned in the same language, which is chosen from the first component.\n* If a name is not available in the preferred language, the API uses the closest match.\n* The preferred language has a small influence on the set of results that the API chooses to return, and the order in which they are returned. The geocoder interprets abbreviations differently depending on language, such as the abbreviations for street types, or synonyms that may be valid in one language but not in another. For example, _utca_ and _t\u00E9r_ are synonyms for street in Hungarian.'
        )
        .optional(),
});
/**
 * @description 200 OK
 */
export const queryAutocomplete200Schema = z.lazy(() => placesQueryAutocompleteResponseSchema);
/**
 * @description 200 OK
 */
export const queryAutocompleteQueryResponseSchema = z.lazy(() => placesQueryAutocompleteResponseSchema);
