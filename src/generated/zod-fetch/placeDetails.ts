import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { urlWithParams, withKey } from '../../params';
import { placeDetailsQueryParamsSchema, placeDetailsQueryResponseSchema } from '../schema/placeDetailsSchema';

const queryParamsSchema = withKey(placeDetailsQueryParamsSchema);

/**
 * @description The Places API is a service that returns information about places using HTTP requests. Places are defined within this API as establishments, geographic locations, or prominent points of interest.
 * @link /maps/api/place/details/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function placeDetails(
    params: z.output<typeof queryParamsSchema>,
    options?: Parameters<typeof fetcher>[2]
) {
    const parsedParams = queryParamsSchema.parse(params);
    const url = urlWithParams('/maps/api/place/details/json', 'https://maps.googleapis.com', parsedParams);

    return fetcher(placeDetailsQueryResponseSchema, url, { method: 'get', ...options });
}
