import { z } from 'zod';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const boundsSchema = z
    .object({ northeast: z.lazy(() => latLngLiteralSchema), southwest: z.lazy(() => latLngLiteralSchema) })
    .describe('A rectangle in geographical coordinates from points at the southwest and northeast corners.');
