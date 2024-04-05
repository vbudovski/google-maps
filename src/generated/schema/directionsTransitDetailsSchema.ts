import { z } from 'zod';
import { directionsTransitLineSchema } from './directionsTransitLineSchema';
import { directionsTransitStopSchema } from './directionsTransitStopSchema';
import { timeZoneTextValueObjectSchema } from './timeZoneTextValueObjectSchema';

export const directionsTransitDetailsSchema = z
    .object({
        arrival_stop: z
            .lazy(() => directionsTransitStopSchema)
            .describe('The arrival transit stop.')
            .optional(),
        arrival_time: z.lazy(() => timeZoneTextValueObjectSchema).optional(),
        departure_stop: z
            .lazy(() => directionsTransitStopSchema)
            .describe('The departure transit stop.')
            .optional(),
        departure_time: z.lazy(() => timeZoneTextValueObjectSchema).optional(),
        headsign: z
            .string()
            .describe(
                'Specifies the direction in which to travel on this line, as it is marked on the vehicle or at the departure stop. This will often be the terminus station.'
            )
            .optional(),
        headway: z
            .number()
            .describe(
                'Specifies the expected number of seconds between departures from the same stop at this time. For example, with a `headway` value of 600, you would expect a ten minute wait if you should miss your bus.'
            )
            .optional(),
        line: z
            .lazy(() => directionsTransitLineSchema)
            .describe('Contains information about the transit line used in this step.')
            .optional(),
        num_stops: z
            .number()
            .describe(
                'The number of stops from the departure to the arrival stop. This includes the arrival stop, but not the departure stop. For example, if your directions involve leaving from Stop A, passing through stops B and C, and arriving at stop D, `num_stops` will return 3.'
            )
            .optional(),
        trip_short_name: z
            .string()
            .describe(
                'The text that appears in schedules and sign boards to identify a transit trip to passengers. The text should uniquely identify a trip within a service day. For example, "538" is the `trip_short_name` of the Amtrak train that leaves San Jose, CA at 15:10 on weekdays to Sacramento, CA.'
            )
            .optional(),
    })
    .describe('Additional information that is not relevant for other modes of transportation.');
