import { z } from 'zod';
import { latLngLiteralSchema } from './latLngLiteralSchema';

/**
 * @description A successful geolocation request will return a JSON-formatted response defining a location and radius.
 */
export const geolocationResponseSchema = z
    .object({
        location: z.lazy(() => latLngLiteralSchema),
        accuracy: z
            .number()
            .describe(
                "The accuracy of the estimated location, in meters. This represents the radius of a circle around the given `location`. If your Geolocation response shows a very high value in the `accuracy` field, the service may be geolocating based on the  request IP, instead of WiFi points or cell towers. This can happen if no cell towers or access points are valid or recognized. To confirm that this is the issue, set `considerIp` to `false` in your request. If the response is a `404`, you've confirmed that your `wifiAccessPoints` and `cellTowers` objects could not be geolocated."
            ),
    })
    .describe('A successful geolocation request will return a JSON-formatted response defining a location and radius.');
