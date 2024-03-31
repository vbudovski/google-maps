import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { textSearchQueryParamsSchema, textSearchQueryResponseSchema } from '../schema/textSearchSchema';

/**
 * @description The Google Places API Text Search Service is a web service that returns information about a set of places based on a string — for example "pizza in New York" or "shoe stores near Ottawa" or "123 Main Street". The service responds with a list of places matching the text string and any location bias that has been set.The service is especially useful for making [ambiguous address](https://developers.google.com/maps/documentation/geocoding/best-practices) queries in an automated system, and non-address components of the string may match businesses as well as addresses. Examples of ambiguous address queries are incomplete addresses, poorly formatted addresses, or a request that includes non-address components such as business names.The search response will include a list of places. You can send a Place Details request for more information about any of the places in the response.
 * @link /maps/api/place/textsearch/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function textSearch(
    params: z.output<typeof textSearchQueryParamsSchema>,
    options: Parameters<typeof fetcher>[2]
) {
    const parsedParams = textSearchQueryParamsSchema.parse(params);

    const url = new URL('/maps/api/place/textsearch/json', 'https://maps.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(textSearchQueryResponseSchema, url, { method: 'get', ...options });
}
