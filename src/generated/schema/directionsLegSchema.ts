import { z } from 'zod';
import { directionsStepSchema } from './directionsStepSchema';
import { directionsTrafficSpeedEntrySchema } from './directionsTrafficSpeedEntrySchema';
import { directionsViaWaypointSchema } from './directionsViaWaypointSchema';
import { latLngLiteralSchema } from './latLngLiteralSchema';
import { textValueObjectSchema } from './textValueObjectSchema';
import { timeZoneTextValueObjectSchema } from './timeZoneTextValueObjectSchema';

export const directionsLegSchema = z.object({
    arrival_time: z.lazy(() => timeZoneTextValueObjectSchema).optional(),
    departure_time: z.lazy(() => timeZoneTextValueObjectSchema).optional(),
    distance: z.lazy(() => textValueObjectSchema).optional(),
    duration: z.lazy(() => textValueObjectSchema).optional(),
    duration_in_traffic: z.lazy(() => textValueObjectSchema).optional(),
    end_address: z
        .string()
        .describe(
            'Contains the human-readable address (typically a street address) from reverse geocoding the `end_location` of this leg. This content is meant to be read as-is. Do not programmatically parse the formatted address.'
        ),
    end_location: z.lazy(() => latLngLiteralSchema),
    start_address: z
        .string()
        .describe(
            'Contains the human-readable address (typically a street address) resulting from reverse geocoding the `start_location` of this leg. This content is meant to be read as-is. Do not programmatically parse the formatted address.'
        ),
    start_location: z.lazy(() => latLngLiteralSchema),
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
