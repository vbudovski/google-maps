import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import {
    findPlaceFromTextQueryParamsSchema,
    findPlaceFromTextQueryResponseSchema,
} from '../schema/findPlaceFromTextSchema';

/**
 * @description A Find Place request takes a text input and returns a place. The input can be any kind of Places text data, such as a name, address, or phone number. The request must be a string. A Find Place request using non-string data such as a lat/lng coordinate or plus code generates an error.<div class="note">Note: If you omit the fields parameter from a Find Place request, only the place_id for the result will be returned.</div>
 * @link /maps/api/place/findplacefromtext/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function findPlaceFromText(
    params: z.output<typeof findPlaceFromTextQueryParamsSchema>,
    options: Parameters<typeof fetcher>[2]
) {
    const parsedParams = findPlaceFromTextQueryParamsSchema.parse(params);

    const url = new URL('/maps/api/place/findplacefromtext/json', 'https://maps.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(findPlaceFromTextQueryResponseSchema, url, { method: 'get', ...options });
}
