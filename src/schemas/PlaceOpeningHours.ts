import { z } from 'zod';

import { ISODate } from './Date';
import { HHMM } from './Time';

const PlaceOpeningHoursPeriodDetail = z.object({
    day: z.number().min(0).max(6),
    time: HHMM,
    date: ISODate.optional(),
    truncated: z.boolean().optional(),
});

const PlaceOpeningHoursPeriod = z.object({
    open: PlaceOpeningHoursPeriodDetail,
    close: PlaceOpeningHoursPeriodDetail.optional(),
});

const PlaceSpecialDay = z.object({
    date: ISODate.optional(),
    exceptional_hours: z.boolean().optional(),
});

const PlaceOpeningHours = z.object({
    open_now: z.boolean().optional(),
    periods: z.array(PlaceOpeningHoursPeriod).optional(),
    special_days: z.array(PlaceSpecialDay).optional(),
    type: z
        .enum([
            'DRIVE_THROUGH',
            'HAPPY_HOUR',
            'DELIVERY',
            'TAKEOUT',
            'KITCHEN',
            'BREAKFAST',
            'LUNCH',
            'DINNER',
            'BRUNCH',
            'PICKUP',
            'SENIOR_HOURS',
        ])
        .optional(),
    weekday_text: z.string().array().optional(),
});

export { PlaceOpeningHours };
