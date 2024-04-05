import { z } from 'zod';
import { errorResponseSchema } from './errorResponseSchema';
import { geolocationRequestSchema } from './geolocationRequestSchema';
import { geolocationResponseSchema } from './geolocationResponseSchema';

/**
 * @description 200 OK
 */
export const geolocate200Schema = z
    .lazy(() => geolocationResponseSchema)
    .describe('A successful geolocation request will return a JSON-formatted response defining a location and radius.');

/**
 * @description 400 BAD REQUEST
 */
export const geolocate400Schema = z
    .lazy(() => errorResponseSchema)
    .describe(
        'In the case of an error, a standard format error response body will be returned and the HTTP status code will be set to an error status. The response contains an object with a single error object.'
    );

/**
 * @description 404 NOT FOUND
 */
export const geolocate404Schema = z
    .lazy(() => errorResponseSchema)
    .describe(
        'In the case of an error, a standard format error response body will be returned and the HTTP status code will be set to an error status. The response contains an object with a single error object.'
    );

/**
 * @description The request body must be formatted as JSON.
 */
export const geolocateMutationRequestSchema = z
    .lazy(() => geolocationRequestSchema)
    .describe(
        'The request body must be formatted as JSON. The following fields are supported, and all fields are optional.'
    );

/**
 * @description 200 OK
 */
export const geolocateMutationResponseSchema = z
    .lazy(() => geolocationResponseSchema)
    .describe('A successful geolocation request will return a JSON-formatted response defining a location and radius.');
