import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { urlWithParams, withKey } from '../../params';
import { geocodeQueryParamsSchema, geocodeQueryResponseSchema } from '../schema/geocodeSchema';

const queryParamsSchema = withKey(geocodeQueryParamsSchema);

/**
 * @description The Geocoding API is a service that provides geocoding and reverse geocoding of addresses.**Geocoding** is the process of converting addresses (like a street address) into geographic coordinates (like latitude and longitude), which you can use to place markers on a map, or position the map.**Reverse geocoding** is the process of converting geographic coordinates into a human-readable address.You can also use the Geocoding API to find the address for a given place ID.To see countries currently supported by the Google Maps Platform Geocoding API, please consult the [Google Maps coverage data](https://developers.google.com/maps/coverage). The accuracy of geocoded locations may vary per country, so you should consider using the returned `location_type` field to determine if a good enough match has been found for the purposes of your application. Please note that the availability of geocoding data depends on our contracts with data providers, so it is subject to change.
 * @link /maps/api/geocode/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function geocode(params: z.output<typeof queryParamsSchema>, options?: Parameters<typeof fetcher>[2]) {
    const parsedParams = queryParamsSchema.parse(params);
    const url = urlWithParams('/maps/api/geocode/json', 'https://maps.googleapis.com', parsedParams);

    return fetcher(geocodeQueryResponseSchema, url, { method: 'get', ...options });
}
