import { z } from 'zod';

export const directionsTrafficSpeedEntrySchema = z.object({
    speed_category: z.string().describe('The current traffic/speed conditions on this portion of a path.'),
    offset_meters: z
        .number()
        .describe('The offset along the path (in meters) up to which this speed category is valid.'),
});
