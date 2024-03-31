import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { streetViewQueryParamsSchema, streetViewQueryResponseSchema } from '../schema/streetViewSchema';

/**
 * @description The Street View Static API lets you embed a static (non-interactive) Street View panorama or thumbnail into your web page, without the use of JavaScript. The viewport is defined with URL parameters sent through a standard HTTP request, and is returned as a static image.
 * @link /maps/api/streetview
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function streetView(
    params: z.output<typeof streetViewQueryParamsSchema>,
    options: Parameters<typeof fetcher>[2]
) {
    const parsedParams = streetViewQueryParamsSchema.parse(params);

    const url = new URL('/maps/api/streetview', 'https://maps.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(streetViewQueryResponseSchema, url, { method: 'get', ...options });
}
