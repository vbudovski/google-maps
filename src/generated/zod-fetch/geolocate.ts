import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { geolocateMutationRequestSchema, geolocateMutationResponseSchema } from '../schema/geolocateSchema';

/**
 * @description Geolocation API returns a location and accuracy radius based on information about cell towers and WiFi nodes that the mobile client can detect. This document describes the protocol used to send this data to the server and to return a response to the client.Communication is done over HTTPS using POST. Both request and response are formatted as JSON, and the content type of both is `application/json`.You must specify a key in your request, included as the value of a`key` parameter. A `key` is your application's  API key. This key identifies your application for purposes of quota management. Learn how to [get a key](https://developers.google.com/maps/documentation/geolocation/get-api-key).
 * @link /geolocation/v1/geolocate
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function geolocate(
    data: z.output<typeof geolocateMutationRequestSchema>,
    options: Parameters<typeof fetcher>[2]
) {
    geolocateMutationRequestSchema.parse(data);

    const url = new URL('/geolocation/v1/geolocate', 'https://www.googleapis.com');

    return fetcher(geolocateMutationResponseSchema, url, { method: 'post', ...options });
}
