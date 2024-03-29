import { z } from 'zod';
import { geocodingResultSchema } from './geocodingResultSchema';
import { geocodingStatusSchema } from './geocodingStatusSchema';
import { plusCodeSchema } from './plusCodeSchema';

export const geocodingResponseSchema = z.object({
    plus_code: z
        .lazy(() => plusCodeSchema)
        .describe(
            'An encoded location reference, derived from latitude and longitude coordinates, that represents an area: 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator) or smaller. Plus codes can be used as a replacement for street addresses in places where they do not exist (where buildings are not numbered or streets are not named). See [Open Location Code](https://en.wikipedia.org/wiki/Open_Location_Code) and [plus codes](https://plus.codes/).\n'
        )
        .optional(),
    results: z.array(z.lazy(() => geocodingResultSchema)),
    status: z.lazy(() => geocodingStatusSchema),
    error_message: z.string().describe('A short description of the error.').optional(),
});
