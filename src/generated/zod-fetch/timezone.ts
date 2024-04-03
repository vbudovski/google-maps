import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { withKey } from '../../params';
import { timezoneQueryParamsSchema, timezoneQueryResponseSchema } from '../schema/timezoneSchema';

const queryParamsSchema = withKey(timezoneQueryParamsSchema);

/**
 * @description The Time Zone API provides a simple interface to request the time zone for locations on the surface of the earth, as well as the time offset from UTC for each of those locations. You request the time zone information for a specific latitude/longitude pair and date. The API returns the name of that time zone, the time offset from UTC, and the daylight savings offset.
 * @link /maps/api/timezone/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function timezone(params: z.output<typeof queryParamsSchema>, options?: Parameters<typeof fetcher>[2]) {
    const parsedParams = queryParamsSchema.parse(params);

    const url = new URL('/maps/api/timezone/json', 'https://maps.googleapis.com');

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
    return fetcher(timezoneQueryResponseSchema, url, { method: 'get', ...options });
}
