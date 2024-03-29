import { z } from 'zod';
import { timeZoneStatusSchema } from './timeZoneStatusSchema';

export const timeZoneResponseSchema = z.object({
    dstOffset: z
        .number()
        .describe(
            'The offset for daylight-savings time in seconds. This will be zero if the time zone is not in Daylight Savings Time during the specified `timestamp`.'
        )
        .optional(),
    rawOffset: z
        .number()
        .describe(
            'The offset from UTC (in seconds) for the given location. This does not take into effect daylight savings.'
        )
        .optional(),
    timeZoneId: z
        .string()
        .describe(
            'a string containing the ID of the time zone, such as "America/Los_Angeles" or "Australia/Sydney". These IDs are defined by [Unicode Common Locale Data Repository (CLDR) project](http://cldr.unicode.org/), and currently available in file timezone.xml. When a timezone has several IDs, the canonical one is returned. In xml responses, this is the first alias of each timezone. For example, "Asia/Calcutta" is returned, not "Asia/Kolkata".'
        )
        .optional(),
    timeZoneName: z
        .string()
        .describe(
            'The long form name of the time zone. This field will be localized if the language parameter is set. eg. `Pacific Daylight Time` or `Australian Eastern Daylight Time`.'
        )
        .optional(),
    status: z.lazy(() => timeZoneStatusSchema),
    errorMessage: z
        .string()
        .describe(
            'Detailed information about the reasons behind the given status code. Included if status other than `Ok`.'
        )
        .optional(),
});
