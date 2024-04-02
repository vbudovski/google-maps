import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { withKey } from '../../params';
import { elevationQueryParamsSchema, elevationQueryResponseSchema } from '../schema/elevationSchema';

const queryParamsSchema = withKey(elevationQueryParamsSchema);

/**
 * @description The Elevation API provides a simple interface to query locations on the earth for elevation data. Additionally, you may request sampled elevation data along paths, allowing you to calculate elevation changes along routes. With the Elevation API, you can develop hiking and biking applications, positioning applications, or low resolution surveying applications.Elevation data is available for all locations on the surface of the earth, including depth locations on the ocean floor (which return negative values). In those cases where Google does not possess exact elevation measurements at the precise location you request, the service interpolates and returns an averaged value using the four nearest locations. Elevation values are expressed relative to local mean sea level (LMSL).Requests to the Elevation API utilize different parameters based on whether the request is for discrete locations or for an ordered path. For discrete locations, requests for elevation return data on the specific locations passed in the request; for paths, elevation requests are instead sampled along the given path.
 * @link /maps/api/elevation/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function elevation(params: z.output<typeof queryParamsSchema>, options?: Parameters<typeof fetcher>[2]) {
    const parsedParams = queryParamsSchema.parse(params);

    const url = new URL('/maps/api/elevation/json', 'https://maps.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(elevationQueryResponseSchema, url, { method: 'get', ...options });
}
