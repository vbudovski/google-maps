import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { withKey } from '../../params';
import {
    queryAutocompleteQueryParamsSchema,
    queryAutocompleteQueryResponseSchema,
} from '../schema/queryAutocompleteSchema';

const queryParamsSchema = withKey(queryAutocompleteQueryParamsSchema);

/**
 * @description The Query Autocomplete service can be used to provide a query prediction for text-based geographic searches, by returning suggested queries as you type.The Query Autocomplete service allows you to add on-the-fly geographic query predictions to your application. Instead of searching for a specific location, a user can type in a categorical search, such as "pizza near New York" and the service responds with a list of suggested queries matching the string. As the Query Autocomplete service can match on both full words and substrings, applications can send queries as the user types to provide on-the-fly predictions.
 * @link /maps/api/place/queryautocomplete/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function queryAutocomplete(
    params: z.output<typeof queryParamsSchema>,
    options?: Parameters<typeof fetcher>[2]
) {
    const parsedParams = queryParamsSchema.parse(params);

    const url = new URL('/maps/api/place/queryautocomplete/json', 'https://maps.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(queryAutocompleteQueryResponseSchema, url, { method: 'get', ...options });
}
