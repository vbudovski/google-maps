import type { z } from 'zod';
import { fetcher, urlWithParams, withKey } from '../../../utils';
import { nearbySearchQueryParamsSchema, nearbySearchQueryResponseSchema } from '../../schema/nearbySearchSchema';

const queryParamsSchema = withKey(nearbySearchQueryParamsSchema);

/**
 * @description A Nearby Search lets you search for places within a specified area. You can refine your search request by supplying keywords or specifying the type of place you are searching for.
 * @link /maps/api/place/nearbysearch/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function nearbySearch(
    params: z.output<typeof queryParamsSchema>,
    options?: Parameters<typeof fetcher>[2]
) {
    const parsedParams = queryParamsSchema.parse(params);
    const url = urlWithParams('/maps/api/place/nearbysearch/json', 'https://maps.googleapis.com', parsedParams);

    return fetcher(nearbySearchQueryResponseSchema, url, { method: 'get', ...options });
}
