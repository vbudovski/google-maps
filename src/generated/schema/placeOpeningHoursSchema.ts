import { z } from 'zod';
import { placeOpeningHoursPeriodSchema } from './placeOpeningHoursPeriodSchema';
import { placeSpecialDaySchema } from './placeSpecialDaySchema';

export const placeOpeningHoursSchema = z
    .object({
        open_now: z
            .boolean()
            .describe('A boolean value indicating if the place is open at the current time.')
            .optional(),
        periods: z
            .array(z.lazy(() => placeOpeningHoursPeriodSchema))
            .describe(
                'An array of opening periods covering seven days, starting from Sunday, in chronological order.\n'
            )
            .optional(),
        special_days: z
            .array(z.lazy(() => placeSpecialDaySchema))
            .describe('An array of up to seven entries corresponding to the next seven days.\n')
            .optional(),
        type: z
            .string()
            .describe(
                'A type string used to identify the type of secondary hours (for example, `DRIVE_THROUGH`, `HAPPY_HOUR`, `DELIVERY`, `TAKEOUT`, `KITCHEN`, `BREAKFAST`, `LUNCH`, `DINNER`, `BRUNCH`, `PICKUP`, `SENIOR_HOURS`). Set for `secondary_opening_hours` only.'
            )
            .optional(),
        weekday_text: z
            .array(z.string())
            .describe('An array of strings describing in human-readable text the hours of the place.')
            .optional(),
    })
    .describe('An object describing the opening hours of a place.');
