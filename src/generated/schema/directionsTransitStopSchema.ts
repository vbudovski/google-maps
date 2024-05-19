import { z } from 'zod';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const directionsTransitStopSchema = z.object({
    location: z.lazy(() => latLngLiteralSchema),
    name: z.string().describe('The name of the transit stop.'),
});
