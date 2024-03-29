import { z } from 'zod';

export const placeOpeningHoursPeriodDetailSchema = z.object({
    date: z
        .string()
        .describe('A date expressed in RFC3339 format in the local timezone for the place, for example 2010-12-31.')
        .optional(),
    day: z
        .number()
        .describe(
            'A number from 0\u20136, corresponding to the days of the week, starting on Sunday. For example, 2 means Tuesday.'
        ),
    time: z
        .string()
        .describe(
            'May contain a time of day in 24-hour hhmm format. Values are in the range 0000\u20132359. The time will be reported in the place\u2019s time zone.'
        ),
    truncated: z
        .boolean()
        .describe(
            'True if a given period was truncated due to a seven-day cutoff, where the period starts before midnight on the date of the request and/or ends at or after  midnight on the last day. This property indicates that the period for open or close can extend past this seven-day cutoff.'
        )
        .optional(),
});
