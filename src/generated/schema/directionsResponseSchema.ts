import { z } from 'zod';
import { directionsGeocodedWaypointSchema } from './directionsGeocodedWaypointSchema';
import { directionsRouteSchema } from './directionsRouteSchema';
import { directionsStatusSchema } from './directionsStatusSchema';
import { travelModeSchema } from './travelModeSchema';

export const directionsResponseSchema = z.object({
    geocoded_waypoints: z
        .array(z.lazy(() => directionsGeocodedWaypointSchema))
        .describe(
            'Contains an array with details about the geocoding of origin, destination and waypoints. Elements in the geocoded_waypoints array correspond, by their zero-based position, to the origin, the waypoints in the order they are specified, and the destination.\n\nThese details will not be present for waypoints specified as textual latitude/longitude values if the service returns no results. This is because such waypoints are only reverse geocoded to obtain their representative address after a route has been found. An empty JSON object will occupy the corresponding places in the geocoded_waypoints array.\n'
        )
        .optional(),
    routes: z
        .array(z.lazy(() => directionsRouteSchema))
        .describe(
            'Contains an array of routes from the origin to the destination. Routes consist of nested Legs and Steps.'
        ),
    status: z.lazy(() => directionsStatusSchema),
    available_travel_modes: z
        .array(z.lazy(() => travelModeSchema))
        .describe(
            "Contains an array of available travel modes. This field is returned when a request specifies a travel mode and gets no results. The array contains the available travel modes in the countries of the given set of waypoints. This field is not returned if one or more of the waypoints are 'via waypoints'."
        )
        .optional(),
    error_message: z
        .string()
        .describe(
            'When the service returns a status code other than `OK`, there may be an additional `error_message` field within the response object. This field contains more detailed information about the reasons behind the given status code. This field is not always returned, and its content is subject to change.\n'
        )
        .optional(),
});
