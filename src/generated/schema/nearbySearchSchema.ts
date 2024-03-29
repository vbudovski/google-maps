import { z } from 'zod';
import { placesNearbySearchResponseSchema } from './placesNearbySearchResponseSchema';

export const nearbySearchQueryParamsSchema = z.object({
    keyword: z
        .string()
        .describe(
            'The text string on which to search, for example: "restaurant" or "123 Main Street". This must be a place name, address, or category of establishments.\nAny other types of input can generate errors and are not guaranteed to return valid results. The Google Places service will return candidate matches\nbased on this string and order the results based on their perceived relevance.\n\nExplicitly including location information using this parameter may conflict with the location, radius, and rankby parameters, causing unexpected results.\n\nIf this parameter is omitted, places with a business_status of CLOSED_TEMPORARILY or CLOSED_PERMANENTLY will not be returned.\n'
        )
        .optional(),
    location: z
        .string()
        .describe(
            'The point around which to retrieve place information. This must be specified as `latitude,longitude`.\n'
        ),
    maxprice: z
        .enum(['0', '1', '2', '3', '4'])
        .describe(
            'Restricts results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive. The exact amount indicated by a specific value will vary from region to region.\n'
        )
        .optional(),
    minprice: z
        .enum(['0', '1', '2', '3', '4'])
        .describe(
            'Restricts results to only those places within the specified range. Valid values range between 0 (most affordable) to 4 (most expensive), inclusive. The exact amount indicated by a specific value will vary from region to region.\n'
        )
        .optional(),
    name: z
        .string()
        .describe(
            'Equivalent to `keyword`. Values in this field are combined with values in the `keyword` field and passed as part of the same search string.\n'
        )
        .optional(),
    opennow: z
        .boolean()
        .describe(
            'Returns only those places that are open for business at the time the query is sent. Places that do not specify opening hours in the Google Places database will not be returned if you include this parameter in your query.\n'
        )
        .optional(),
    pagetoken: z
        .string()
        .describe(
            'Returns up to 20 results from a previously run search. Setting a `pagetoken` parameter will execute a search with the same parameters used previously \u2014 all parameters other than pagetoken will be ignored.\n'
        )
        .optional(),
    rankby: z
        .enum(['prominence', 'distance'])
        .describe(
            "Specifies the order in which results are listed. Possible values are:\n- `prominence` (default). This option sorts results based on their importance. Ranking will favor prominent places within the set radius over nearby places that match but that are less prominent. Prominence can be affected by a place's ranking in Google's index, global popularity, and other factors. When prominence is specified, the `radius` parameter is required.\n- `distance`. This option biases search results in ascending order by their distance from the specified location. When `distance` is specified, one or more of `keyword`, `name`, or `type` is required and `radius` is disallowed.\n"
        )
        .optional(),
    radius: z
        .number()
        .describe(
            'Defines the distance (in meters) within which to return place results. You may bias results to a specified circle by passing a `location` and a `radius` parameter. Doing so instructs the Places service to _prefer_ showing results within that circle; results outside of the defined area may still be displayed.\n\nThe radius will automatically be clamped to a maximum value depending on the type of search and other parameters.\n\n* Autocomplete: 50,000 meters\n* Nearby Search: \n  * with `keyword` or `name`: 50,000 meters\n  * without `keyword` or `name`\n    * Up to 50,000 meters, adjusted dynamically based on area density, independent of `rankby` parameter.\n    * When using `rankby=distance`, the radius parameter will not be accepted, and will result in an `INVALID_REQUEST`.\n* Query Autocomplete: 50,000 meters\n* Text Search: 50,000 meters\n'
        ),
    type: z
        .string()
        .describe(
            'Restricts the results to places matching the specified type. Only one type may be specified. If more than one type is provided, all types following the first entry are ignored.\n\n* `type=hospital|pharmacy|doctor` becomes `type=hospital`\n* `type=hospital,pharmacy,doctor` is ignored entirely\n\nSee the list of [supported types](https://developers.google.com/maps/documentation/places/web-service/supported_types).\n<div class="note">Note: Adding both `keyword` and `type` with the same value (`keyword=cafe&type=cafe` or `keyword=parking&type=parking`) can yield `ZERO_RESULTS`.</div>\n'
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
export const nearbySearch200Schema = z.lazy(() => placesNearbySearchResponseSchema);

/**
 * @description 200 OK
 */
export const nearbySearchQueryResponseSchema = z.lazy(() => placesNearbySearchResponseSchema);
