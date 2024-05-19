import { z } from 'zod';
import { errorResponseSchema } from './errorResponseSchema';
import { geolocationRequestSchema } from './geolocationRequestSchema';
import { geolocationResponseSchema } from './geolocationResponseSchema';

/**
 * @description 200 OK
 */
export const geolocate200Schema = z.lazy(() => geolocationResponseSchema);
/**
 * @description 400 BAD REQUEST
 */
export const geolocate400Schema = z.lazy(() => errorResponseSchema);
/**
 * @description 404 NOT FOUND
 */
export const geolocate404Schema = z.lazy(() => errorResponseSchema);
/**
 * @description The request body must be formatted as JSON.
 */
export const geolocateMutationRequestSchema = z.lazy(() => geolocationRequestSchema);
/**
 * @description 200 OK
 */
export const geolocateMutationResponseSchema = z.lazy(() => geolocationResponseSchema);
