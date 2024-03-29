import type { z } from 'zod';

import { PlaceOpeningHours } from './PlaceOpeningHours';

test('PlaceOpeningHours', () => {
    const data = {
        open_now: true,
        periods: [
            {
                open: { day: 0, time: '0000' },
                close: { day: 6, time: '2359', date: '2020-01-02', truncated: false },
            },
        ],
    } satisfies z.infer<typeof PlaceOpeningHours>;

    PlaceOpeningHours.parse(data);
});
