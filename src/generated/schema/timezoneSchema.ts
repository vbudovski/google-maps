import { z } from 'zod';
import { timeZoneResponseSchema } from './timeZoneResponseSchema';

export const timezoneQueryParamsSchema = z.object({
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
    location: z
        .string()
        .describe(
            'A comma-separated latitude,longitude tuple, `location=39.6034810,-119.6822510`, representing the location to look up.\n'
        ),
    timestamp: z
        .number()
        .describe(
            'The desired time as seconds since midnight, January 1, 1970 UTC. The Time Zone API uses the `timestamp` to determine whether or not Daylight Savings should be applied, based on the time zone of the `location`. \n\nNote that the API does not take historical time zones into account. That is, if you specify a past timestamp, the API does not take into account the possibility that the location was previously in a different time zone.\n'
        ),
});

/**
 * @description 200 OK
 */
export const timezone200Schema = z.lazy(() => timeZoneResponseSchema);

/**
 * @description 200 OK
 */
export const timezoneQueryResponseSchema = z.lazy(() => timeZoneResponseSchema);
