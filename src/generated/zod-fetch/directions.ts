import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { urlWithParams, withKey } from '../../params';
import { directionsQueryParamsSchema, directionsQueryResponseSchema } from '../schema/directionsSchema';

const queryParamsSchema = withKey(directionsQueryParamsSchema);

/**
 * @description The Directions API is a web service that uses an HTTP request to return JSON or XML-formatted directions between locations. You can receive directions for several modes of transportation, such as transit, driving, walking, or cycling.
 * @link /maps/api/directions/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function directions(params: z.output<typeof queryParamsSchema>, options?: Parameters<typeof fetcher>[2]) {
    const parsedParams = queryParamsSchema.parse(params);
    const url = urlWithParams('/maps/api/directions/json', 'https://maps.googleapis.com', parsedParams);

    return fetcher(directionsQueryResponseSchema, url, { method: 'get', ...options });
}
