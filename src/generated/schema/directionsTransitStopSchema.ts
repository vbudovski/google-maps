import { z } from 'zod';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const directionsTransitStopSchema = z.object({
    location: z.lazy(() => latLngLiteralSchema).describe('The location of the stop.'),
    name: z.string().describe('The name of the transit stop.'),
});
