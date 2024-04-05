import type { z } from 'zod';
import { fetcher, urlWithParams, withKey } from '../../../utils';
import { autocompleteQueryParamsSchema, autocompleteQueryResponseSchema } from '../../schema/autocompleteSchema';

const queryParamsSchema = withKey(autocompleteQueryParamsSchema);

/**
 * @description The Place Autocomplete service is a web service that returns place predictions in response to an HTTP request. The request specifies a textual search string and optional geographic bounds. The service can be used to provide autocomplete functionality for text-based geographic searches, by returning places such as businesses, addresses and points of interest as a user types.<div class="note">Note: You can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the ['Powered by Google'](https://developers.google.com/maps/documentation/places/web-service/policies#logo_requirementshttps://developers.google.com/maps/documentation/places/web-service/policies#logo_requirements) logo.</div>The Place Autocomplete service can match on full words and substrings, resolving place names, addresses, and plus codes. Applications can therefore send queries as the user types, to provide on-the-fly place predictions.The returned predictions are designed to be presented to the user to aid them in selecting the desired place. You can send a [Place Details](https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests) request for more information about any of the places which are returned.
 * @link /maps/api/place/autocomplete/json
 * biome-ignore lint/suspicious/useAwait: FIXME: Biome cannot yet deduce that the return is a promise and therefore
 * needs to be async. See https://github.com/biomejs/biome/issues/1161.
 */
export async function autocomplete(
    params: z.output<typeof queryParamsSchema>,
    options?: Parameters<typeof fetcher>[2]
) {
    const parsedParams = queryParamsSchema.parse(params);
    const url = urlWithParams('/maps/api/place/autocomplete/json', 'https://maps.googleapis.com', parsedParams);

    return fetcher(autocompleteQueryResponseSchema, url, { method: 'get', ...options });
}
