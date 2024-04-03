import { z } from 'zod';
import { fetcher } from '../../fetcher';
import { withKey } from '../../params';
import { geolocateMutationRequestSchema, geolocateMutationResponseSchema } from '../schema/geolocateSchema';

const queryParamsSchema = withKey(z.object({}));

/**
 * @description Geolocation API returns a location and accuracy radius based on information about cell towers and WiFi nodes that the mobile client can detect. This document describes the protocol used to send this data to the server and to return a response to the client.Communication is done over HTTPS using POST. Both request and response are formatted as JSON, and the content type of both is `application/json`.You must specify a key in your request, included as the value of a`key` parameter. A `key` is your application's  API key. This key identifies your application for purposes of quota management. Learn how to [get a key](https://developers.google.com/maps/documentation/geolocation/get-api-key).
 * @link /geolocation/v1/geolocate
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function geolocate(
    params: z.output<typeof queryParamsSchema>,
    data: z.output<typeof geolocateMutationRequestSchema>,
    options?: Parameters<typeof fetcher>[2]
) {
    const parsedParams = queryParamsSchema.parse(params);
    geolocateMutationRequestSchema.parse(data);

    const url = new URL('/geolocation/v1/geolocate', 'https://www.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        if (value === undefined) {
            continue;
        }
        if (Array.isArray(value)) {
            url.searchParams.set(name, value.join(','));
        } else {
            url.searchParams.set(name, String(value));
        }
    }
    return fetcher(geolocateMutationResponseSchema, url, { method: 'post', ...options });
}
