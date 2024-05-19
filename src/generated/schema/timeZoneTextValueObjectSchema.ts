import { z } from 'zod';

/**
 * @description An object containing Unix time, a time zone, and its formatted text representation.
 */
export const timeZoneTextValueObjectSchema = z
    .object({
        text: z.string().describe('The time specified as a string in the time zone.'),
        value: z.number().describe('The time specified as Unix time, or seconds since midnight, January 1, 1970 UTC.'),
        time_zone: z
            .string()
            .describe(
                'Contains the time zone. The value is the name of the time zone as defined in the [IANA Time Zone Database](http://www.iana.org/time-zones), e.g. "America/New_York".'
            ),
    })
    .describe('An object containing Unix time, a time zone, and its formatted text representation.');
