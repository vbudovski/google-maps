import { z } from 'zod';
import { placeOpeningHoursPeriodDetailSchema } from './placeOpeningHoursPeriodDetailSchema';

export const placeOpeningHoursPeriodSchema = z.object({
    open: z
        .lazy(() => placeOpeningHoursPeriodDetailSchema)
        .describe('Contains a pair of day and time objects describing when the place opens.'),
    close: z
        .lazy(() => placeOpeningHoursPeriodDetailSchema)
        .describe(
            'May contain a pair of day and time objects describing when the place closes. If a place is always open, the close section will be missing from the response. Clients can rely on always-open being represented as an open period containing day with value `0` and time with value `0000`, and no `close`.\n'
        )
        .optional(),
});
