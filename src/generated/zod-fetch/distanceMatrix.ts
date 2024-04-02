import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { withKey } from '../../params';
import { distanceMatrixQueryParamsSchema, distanceMatrixQueryResponseSchema } from '../schema/distanceMatrixSchema';

const queryParamsSchema = withKey(distanceMatrixQueryParamsSchema);

/**
 * @description The Distance Matrix API is a service that provides travel distance and time for a matrix of origins and destinations. The API returns information based on the recommended route between start and end points, as calculated by the Google Maps API, and consists of rows containing duration and distance values for each pair.
 * @link /maps/api/distancematrix/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function distanceMatrix(
    params: z.output<typeof queryParamsSchema>,
    options?: Parameters<typeof fetcher>[2]
) {
    const parsedParams = queryParamsSchema.parse(params);

    const url = new URL('/maps/api/distancematrix/json', 'https://maps.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(distanceMatrixQueryResponseSchema, url, { method: 'get', ...options });
}
