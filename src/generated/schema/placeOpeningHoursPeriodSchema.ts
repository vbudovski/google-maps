import { z } from 'zod';
import { placeOpeningHoursPeriodDetailSchema } from './placeOpeningHoursPeriodDetailSchema';

export const placeOpeningHoursPeriodSchema = z.object({
    open: z.lazy(() => placeOpeningHoursPeriodDetailSchema),
    close: z.lazy(() => placeOpeningHoursPeriodDetailSchema).optional(),
});
