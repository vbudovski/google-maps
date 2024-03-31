import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { nearestRoadsQueryParamsSchema, nearestRoadsQueryResponseSchema } from '../schema/nearestRoadsSchema';

/**
 * @description This service returns individual road segments for a given set of GPS coordinates. This services takes up to 100 GPS points and returns the closest road segments for each point. The points passed do not need to be part of a continuous path.
 * @link /v1/nearestRoads
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function nearestRoads(
    params: z.output<typeof nearestRoadsQueryParamsSchema>,
    options: Parameters<typeof fetcher>[2]
) {
    const parsedParams = nearestRoadsQueryParamsSchema.parse(params);

    const url = new URL('/v1/nearestRoads', 'https://roads.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(nearestRoadsQueryResponseSchema, url, { method: 'get', ...options });
}
