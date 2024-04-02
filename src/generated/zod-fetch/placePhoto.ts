import type { z } from 'zod';
import { fetcher } from '../../fetcher';
import { withKey } from '../../params';
import { placePhotoQueryParamsSchema, placePhotoQueryResponseSchema } from '../schema/placePhotoSchema';

const queryParamsSchema = withKey(placePhotoQueryParamsSchema);

/**
 * @description The Place Photo service, part of the Places API, is a read- only API that allows you to add high quality photographic content to your application. The Place Photo service gives you access to the millions of photos stored in the Places database. When you get place information using a Place Details request, photo references will be returned for relevant photographic content. Find Place, Nearby Search, and Text Search requests also return a single photo reference per place, when relevant. Using the Photo service you can then access the referenced photos and resize the image to the optimal size for your application.Photos returned by the Photo service are sourced from a variety of locations, including business owners and user contributed photos. In most cases, these photos can be used without attribution, or will have the required attribution included as a part of the image. However, if the returned photo element includes a value in the html_attributions field, you will have to include the additional attribution in your application wherever you display the image.
 * @link /maps/api/place/photo
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function placePhoto(params: z.output<typeof queryParamsSchema>, options?: Parameters<typeof fetcher>[2]) {
    const parsedParams = queryParamsSchema.parse(params);

    const url = new URL('/maps/api/place/photo', 'https://maps.googleapis.com');

    for (const [name, value] of Object.entries(parsedParams || {})) {
        url.searchParams.set(name, value as unknown as string);
    }

    return fetcher(placePhotoQueryResponseSchema, url, { method: 'get', ...options });
}
