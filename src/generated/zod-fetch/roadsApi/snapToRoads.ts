import type { z } from 'zod';
import { fetcher, urlWithParams, withKey } from '../../../utils';
import { snapToRoadsQueryParamsSchema, snapToRoadsQueryResponseSchema } from '../../schema/snapToRoadsSchema';

const queryParamsSchema = withKey(snapToRoadsQueryParamsSchema);

/**
 * @description This service returns the best-fit road geometry for a given set of GPS coordinates. This service takes up to 100 GPS points collected along a route, and returns a similar set of data with the points snapped to the most likely roads the vehicle was traveling along. Optionally, you can request that the points be interpolated, resulting in a path that smoothly follows the geometry of the road.
 * @link /v1/snaptoroads
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function snapToRoads(params: z.output<typeof queryParamsSchema>, options?: Parameters<typeof fetcher>[2]) {
    const parsedParams = queryParamsSchema.parse(params);
    const url = urlWithParams('/v1/snaptoroads', 'https://roads.googleapis.com', parsedParams);

    return fetcher(snapToRoadsQueryResponseSchema, url, { method: 'get', ...options });
}
