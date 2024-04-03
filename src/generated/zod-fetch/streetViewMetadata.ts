import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { withKey } from '../../params';
import {
    streetViewMetadataQueryParamsSchema,
    streetViewMetadataQueryResponseSchema,
} from '../schema/streetViewMetadataSchema';

const queryParamsSchema = withKey(streetViewMetadataQueryParamsSchema);

/**
 * @description The Street View Static API metadata requests provide data about Street View panoramas. Using the metadata, you can find out if a Street View image is available at a given location, as well as getting programmatic access to the latitude and longitude, the panorama ID, the date the photo was taken, and the copyright information for the image. Accessing this metadata allows you to customize error behavior in your application.
 * @link /maps/api/streetview/metadata
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function streetViewMetadata(
    params: z.output<typeof queryParamsSchema>,
    options?: Parameters<typeof fetcher>[2]
) {
    const parsedParams = queryParamsSchema.parse(params);

    const url = new URL('/maps/api/streetview/metadata', 'https://maps.googleapis.com');

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
    return fetcher(streetViewMetadataQueryResponseSchema, url, { method: 'get', ...options });
}
