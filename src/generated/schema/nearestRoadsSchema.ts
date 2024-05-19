import { z } from 'zod';
import { latLngArrayStringSchema } from './latLngArrayStringSchema';
import { nearestRoadsErrorResponseSchema } from './nearestRoadsErrorResponseSchema';
import { nearestRoadsResponseSchema } from './nearestRoadsResponseSchema';

export const nearestRoadsQueryParamsSchema = z.object({ points: z.lazy(() => latLngArrayStringSchema) });
/**
 * @description 200 OK
 */
export const nearestRoads200Schema = z.lazy(() => nearestRoadsResponseSchema);
/**
 * @description 400 BAD REQUEST
 */
export const nearestRoads400Schema = z.lazy(() => nearestRoadsErrorResponseSchema);
/**
 * @description 200 OK
 */
export const nearestRoadsQueryResponseSchema = z.lazy(() => nearestRoadsResponseSchema);
