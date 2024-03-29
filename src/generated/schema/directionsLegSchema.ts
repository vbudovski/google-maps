import { z } from 'zod';
import { directionsStepSchema } from './directionsStepSchema';
import { directionsTrafficSpeedEntrySchema } from './directionsTrafficSpeedEntrySchema';
import { directionsViaWaypointSchema } from './directionsViaWaypointSchema';
import { latLngLiteralSchema } from './latLngLiteralSchema';
import { textValueObjectSchema } from './textValueObjectSchema';
import { timeZoneTextValueObjectSchema } from './timeZoneTextValueObjectSchema';

export const directionsLegSchema = z.object({
    arrival_time: z
        .lazy(() => timeZoneTextValueObjectSchema)
        .describe(
            'Contains the estimated time of arrival for this leg. This property is only returned for transit directions.'
        )
        .optional(),
    departure_time: z
        .lazy(() => timeZoneTextValueObjectSchema)
        .describe(
            'Contains the estimated time of departure for this leg, specified as a Time object. The `departure_time` is only available for transit directions.'
        )
        .optional(),
    distance: z
        .lazy(() => textValueObjectSchema)
        .describe('The total distance covered by this leg.')
        .optional(),
    duration: z
        .lazy(() => textValueObjectSchema)
        .describe('The total duration of this leg.')
        .optional(),
    duration_in_traffic: z
        .lazy(() => textValueObjectSchema)
        .describe(
            'Indicates the total duration of this leg. This value is an estimate of the time in traffic based on current and historical traffic conditions. See the `traffic_model` request parameter for the options you can use to request that the returned value is optimistic, pessimistic, or a best-guess estimate. The duration in traffic is returned only if all of the following are true:\n\n* The request does not include stopover waypoints. If the request includes waypoints, they must be prefixed with `via:` to avoid stopovers.\n* The request is specifically for driving directions\u2014the mode parameter is set to `driving`.\n* The request includes a `departure_time` parameter.\n* Traffic conditions are available for the requested route.\n'
        )
        .optional(),
    end_address: z
        .string()
        .describe(
            'Contains the human-readable address (typically a street address) from reverse geocoding the `end_location` of this leg. This content is meant to be read as-is. Do not programmatically parse the formatted address.'
        ),
    end_location: z
        .lazy(() => latLngLiteralSchema)
        .describe(
            'The latitude/longitude coordinates of the given destination of this leg. Because the Directions API calculates directions between locations by using the nearest transportation option (usually a road) at the start and end points, `end_location` may be different than the provided destination of this leg if, for example, a road is not near the destination.'
        ),
    start_address: z
        .string()
        .describe(
            'Contains the human-readable address (typically a street address) resulting from reverse geocoding the `start_location` of this leg. This content is meant to be read as-is. Do not programmatically parse the formatted address.'
        ),
    start_location: z
        .lazy(() => latLngLiteralSchema)
        .describe(
            'The latitude/longitude coordinates of the origin of this leg. Because the Directions API calculates directions between locations by using the nearest transportation option (usually a road) at the start and end points, `start_location` may be different than the provided origin of this leg if, for example, a road is not near the origin.'
        ),
    steps: z
        .array(z.lazy(() => directionsStepSchema))
        .describe('An array of steps denoting information about each separate step of the leg of the journey.'),
    traffic_speed_entry: z
        .array(z.lazy(() => directionsTrafficSpeedEntrySchema))
        .describe('Information about traffic speed along the leg.'),
    via_waypoint: z
        .array(z.lazy(() => directionsViaWaypointSchema))
        .describe('The locations of via waypoints along this leg.'),
});
