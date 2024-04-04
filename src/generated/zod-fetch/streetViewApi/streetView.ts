import type { z } from 'zod';
import { fetcher, urlWithParams, withKey } from '../../../utils';
import { streetViewQueryParamsSchema, streetViewQueryResponseSchema } from '../../schema/streetViewSchema';

const queryParamsSchema = withKey(streetViewQueryParamsSchema);

/**
 * @description The Street View Static API lets you embed a static (non-interactive) Street View panorama or thumbnail into your web page, without the use of JavaScript. The viewport is defined with URL parameters sent through a standard HTTP request, and is returned as a static image.
 * @link /maps/api/streetview
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function streetView(params: z.output<typeof queryParamsSchema>, options?: Parameters<typeof fetcher>[2]) {
    const parsedParams = queryParamsSchema.parse(params);
    const url = urlWithParams('/maps/api/streetview', 'https://maps.googleapis.com', parsedParams);

    return fetcher(streetViewQueryResponseSchema, url, { method: 'get', ...options });
}
